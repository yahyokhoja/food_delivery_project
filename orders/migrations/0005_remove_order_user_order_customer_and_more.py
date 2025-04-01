# Generated by Django 5.1.7 on 2025-04-01 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_remove_fooditem_image_fooditem_photo_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='user',
        ),
        migrations.AddField(
            model_name='order',
            name='customer',
            field=models.CharField(default='Неизвестный клиент', max_length=255),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_address',
            field=models.TextField(default='Не указан'),
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Ожидание'), ('completed', 'Завершён'), ('canceled', 'Отменён')], default='pending', max_length=20),
        ),
    ]
