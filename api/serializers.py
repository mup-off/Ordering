from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Restaurant, Category, Meal, Order, OrderItem, ContactMessage

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class MealSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer(read_only=True)
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Meal
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    meal_id = serializers.PrimaryKeyRelatedField(queryset=Meal.objects.all(), source='meal', write_only=True)
    meal = MealSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'meal', 'meal_id', 'quantity', 'price')
        read_only_fields = ('price',)

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    restaurant = RestaurantSerializer(read_only=True)
    restaurant_id = serializers.PrimaryKeyRelatedField(queryset=Restaurant.objects.all(), source='restaurant', write_only=True)

    class Meta:
        model = Order
        fields = ('id', 'user', 'restaurant', 'restaurant_id', 'status', 'total_price', 'created_at', 'items')
        read_only_fields = ('user', 'status', 'total_price', 'created_at')

    def validate_items(self, value):
        if not value:
            raise serializers.ValidationError("Order must contain at least one item.")
        return value

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        restaurant = validated_data.pop('restaurant')
        
        total_price = sum(item_data['meal'].price * item_data['quantity'] for item_data in items_data)
        
        order = Order.objects.create(total_price=total_price, restaurant=restaurant, **validated_data)
        
        for item_data in items_data:
            OrderItem.objects.create(order=order, meal=item_data['meal'], quantity=item_data['quantity'], price=item_data['meal'].price)
            
        return order

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
