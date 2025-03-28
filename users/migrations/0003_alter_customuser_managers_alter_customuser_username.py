# Generated by Django 5.1.7 on 2025-03-28 12:37

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username'),
        ),
    ]
