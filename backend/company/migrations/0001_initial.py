# Generated by Django 5.1.3 on 2025-01-07 18:21

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=50, null=True)),
                ('industry_type', models.CharField(choices=[('RMG', 'Ready-Made Garments'), ('Textiles', 'Textiles'), ('Other', 'Other')], default='RMG', max_length=100)),
                ('about', models.TextField(blank=True, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('contacts', models.TextField(blank=True, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, unique=True)),
                ('website', models.URLField(blank=True, null=True)),
                ('created_at', models.DateField(default=datetime.date.today)),
                ('notes', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('desk', models.CharField(blank=True, max_length=30, null=True)),
                ('floor_no', models.CharField(blank=True, max_length=50, null=True)),
                ('line_no', models.CharField(blank=True, max_length=50, null=True)),
                ('room', models.CharField(max_length=50)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
    ]
