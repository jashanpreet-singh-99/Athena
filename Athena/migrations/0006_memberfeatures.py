# Generated by Django 4.2.2 on 2023-07-03 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Athena', '0005_rename_username_userprofiles_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberFeatures',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('details', models.TextField(max_length=1024)),
                ('min', models.PositiveIntegerField()),
            ],
        ),
    ]
