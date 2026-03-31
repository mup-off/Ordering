from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Restaurant, Category, Meal, Order, ContactMessage
from .serializers import (
    UserSerializer, RestaurantSerializer, CategorySerializer, 
    MealSerializer, OrderSerializer, ContactMessageSerializer
)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RestaurantViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.AllowAny]

class MealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Meal.objects.filter(is_available=True)
    serializer_class = MealSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        restaurant_id = self.request.query_params.get('restaurant', None)
        if restaurant_id is not None:
            queryset = queryset.filter(restaurant_id=restaurant_id)
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        # Mock Notification Service
        print(f"NOTIFICATION: Order #{order.id} placed successfully for {self.request.user.username} (Total: ${order.total_price})")

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.AllowAny]
