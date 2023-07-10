# Generated by Django 4.2.2 on 2023-07-07 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0008_alter_coursecategories_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_difficulty',
            field=models.CharField(choices=[('A', 'Advanced'), ('I', 'Intermediate'), ('B', 'Beginner')], default='B', max_length=1),
        ),
        migrations.AddField(
            model_name='course',
            name='course_type',
            field=models.CharField(choices=[('V', 'Virtual'), ('I', 'In-Person')], default='I', max_length=1, null=True),
        ),
    ]