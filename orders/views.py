from django.shortcuts import render

# Create your views here.
# orders/views.py
from rest_framework import viewsets
from .models import FoodItem, Order
from .serializers import FoodItemSerializer, OrderSerializer

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer