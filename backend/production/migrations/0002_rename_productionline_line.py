# Generated by Django 5.1.3 on 2025-01-13 17:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('production', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductionLine',
            new_name='Line',
        ),
    ]
