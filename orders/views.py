from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Dish, FoodItem, Order
from .serializers import DishSerializer, FoodItemSerializer, OrderSerializer









# ViewSet для работы с FoodItem (Товары)
class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

# ViewSet для работы с Order (Заказы)
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class DishListView(APIView):
    def get(self, request):
        dishes = Dish.objects.all()  # Получаем все блюда
        serializer = DishSerializer(dishes, many=True)  # Сериализуем данные
        return Response(serializer.data)  # Отправляем данные в ответ
