# Generated by Django 4.2.2 on 2023-07-09 05:52

import Athena.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0010_course_course_banner_alter_course_categories_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_banner',
            field=models.ImageField(upload_to=Athena.models.user_directory_path),
        ),
    ]
