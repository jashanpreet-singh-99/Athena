# Generated by Django 4.2.2 on 2023-07-22 20:39

import Athena.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0026_assignmentsubmission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignmentsubmission',
            name='file',
            field=models.FileField(upload_to=Athena.models.course_submission_directory_path),
        ),
    ]