# Generated by Django 4.2.2 on 2023-07-18 06:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0019_studentquizsubmission'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentquizsubmission',
            name='course',
        ),
    ]
