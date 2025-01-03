# Generated by Django 4.2.7 on 2025-01-03 07:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user_management', '0004_employee_company_employee_date_of_joining_and_more'),
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('slug', models.SlugField(max_length=40)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('slug', models.SlugField(max_length=40)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('desk', models.CharField(max_length=30)),
                ('floor_no', models.CharField(blank=True, max_length=50, null=True)),
                ('line_no', models.CharField(blank=True, max_length=50, null=True)),
                ('room', models.CharField(max_length=50)),
                ('slug', models.SlugField(max_length=40)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
        migrations.CreateModel(
            name='Mechanic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('designation', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('slug', models.SlugField(max_length=40)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('slug', models.SlugField(max_length=40)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company')),
            ],
        ),
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('machine_id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('model_number', models.CharField(blank=True, max_length=255, null=True)),
                ('serial_no', models.CharField(blank=True, max_length=255, null=True)),
                ('purchase_date', models.DateField(blank=True, null=True)),
                ('last_breakdown_start', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(choices=[('active', 'Active'), ('inactive', 'Inactive'), ('maintenance', 'Under Maintenance'), ('broken', 'Broken')], default='active', max_length=50)),
                ('brand', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='maintenance.brand')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='maintenance.category')),
                ('location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='maintenance.location')),
                ('supplier', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='maintenance.supplier')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='maintenance.type')),
            ],
        ),
        migrations.CreateModel(
            name='BreakdownLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_category', models.CharField(max_length=255)),
                ('breakdown_start', models.DateTimeField()),
                ('lost_time', models.DurationField()),
                ('comments', models.TextField(blank=True, null=True)),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='machine_breakdowns', to='maintenance.machine')),
                ('mechanic', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='mechanic_breakdowns', to='user_management.employee')),
                ('operator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='operator_breakdowns', to='user_management.employee')),
            ],
            options={
                'verbose_name': 'Breakdown Log',
                'verbose_name_plural': 'Breakdown Logs',
                'ordering': ['-breakdown_start'],
            },
        ),
    ]
