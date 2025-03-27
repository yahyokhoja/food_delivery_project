from django.shortcuts import render, get_object_or_404
from .models import Order
from .serializers import FoodItemSerializer
from .models import FoodItem
from rest_framework.generics import ListAPIView
from .models import Order
from django.shortcuts import render, redirect
from .forms import OrderForm

def create_order(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('order_list')  # Перенаправление на список заказов
    else:
        form = OrderForm()
    return render(request, 'orders/create_order.html', {'form': form})

def order_list(request):
    orders = Order.objects.all()
    return render(request, 'orders/order_list.html', {'orders': orders})

class FoodItemListView(ListAPIView):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer



def order_detail(request, id):
    order = get_object_or_404(Order, id=id)
    return render(request, 'orders/order_detail.html', {'order': order})


