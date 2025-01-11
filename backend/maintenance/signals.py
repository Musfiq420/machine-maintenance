from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Machine
from .utils import send_push_notification

@receiver(pre_save, sender=Machine)
def detect_status_change(sender, instance, **kwargs):
    if not instance.pk:
        # New machine being created; no status change
        instance._status_changed = False
        return

    try:
        previous = Machine.objects.get(pk=instance.pk)
        instance._status_changed = previous.status != instance.status
        instance._old_status = previous.status
        instance._new_status = instance.status
    except Machine.DoesNotExist:
        instance._status_changed = False

@receiver(post_save, sender=Machine)
def send_status_change_notification(sender, instance, created, **kwargs):
    if not created and getattr(instance, '_status_changed', False):
        old_status = instance._old_status
        new_status = instance._new_status
        machine_id = instance.machine_id
        model_number = instance.model_number
        location = instance.location 
        
        # Retrieve location details
        room = location.room if location else 'Unknown Room'
        line_no = location.line_no if location else 'Unknown Line'
        floor_no = location.floor_no if location else 'Unknown Floor'

        if old_status == "active" and new_status == "broken":
            topic_name = "mechanics"
            title = f"A machine is {new_status} in Floor No: {floor_no}, Room No: {room}, Line No: {line_no}"
            body = (
                f"Machine {machine_id} ({model_number}) is now broken.\n"
                f"Status was 'Active' and has now changed to 'Broken'. Immediate attention is required.\n\n"
                f"Location details:\n"
                f"  - Room: {room}\n"
                f"  - Line: {line_no}\n"
                f"  - Floor: {floor_no}\n\n"
                "Please inspect the machine and take appropriate action."
            )
        else:
            title = f"Machine {machine_id} Status Updated"
            topic_name = None
            body = (
                f"Machine {machine_id} ({model_number}) status changed from {old_status} to {new_status}.\n"
                f"Location details:\n"
                f"  - Room: {room}\n"
                f"  - Line: {line_no}\n"
                f"  - Floor: {floor_no}\n\n"
                "Please check the machine's current condition and ensure it's functioning as expected."
            )
        send_push_notification(title=title, body=body, topic=topic_name)