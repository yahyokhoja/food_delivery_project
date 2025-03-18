from django.db import models

# Create your models here.
# orders/models.py
from django.db import models

class FoodItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class Order(models.Model):
    food_items = models.ManyToManyField(FoodItem)
    customer_name = models.CharField(max_length=255)
    delivery_address = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='Pending')

    def __str__(self):
        return f"Order #{self.id} for {self.customer_name}"
    
from django.db import models

class Dish(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100, choices=[
        ('Итальянская', 'Итальянская'),
        ('Японская', 'Японская'),
        ('Фастфуд', 'Фастфуд'),
    ])
    is_popular = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)  # Добавляем поле description

    def __str__(self):
        return self.name