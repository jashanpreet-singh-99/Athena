# Generated by Django 4.2.2 on 2023-06-26 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
