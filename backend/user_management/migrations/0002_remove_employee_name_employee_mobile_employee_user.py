# Generated by Django 4.2.7 on 2024-12-10 12:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_management', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='name',
        ),
        migrations.AddField(
            model_name='employee',
            name='mobile',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
        migrations.AddField(
            model_name='employee',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
