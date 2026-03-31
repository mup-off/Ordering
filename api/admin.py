from django.contrib import admin
from .models import Restaurant, Category, Meal, Order, OrderItem, ContactMessage

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username',)
    exclude = ('restaurant',)
    inlines = [OrderItemInline]
    actions = ['approve_orders']

    @admin.action(description='Approve selected orders (mark as Accepted)')
    def approve_orders(self, request, queryset):
        updated = queryset.update(status='Accepted')
        self.message_user(request, f'Successfully approved {updated} order(s).')

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        
        # After saving the related items, calculate the total price of the order
        order = form.instance
        total = 0
        for item in order.items.all():
            # If the admin didn't specify a price, fetch from actual meal
            if not item.price:
                item.price = item.meal.price
                item.save(update_fields=['price'])
            total += item.price * item.quantity
        
        order.total_price = total
        order.save(update_fields=['total_price'])

    def save_model(self, request, obj, form, change):
        if not getattr(obj, 'restaurant_id', None):
            restaurant, _ = Restaurant.objects.get_or_create(name="Default Restaurant", defaults={'address': 'Unknown', 'phone': '0000'})
            obj.restaurant = restaurant
        super().save_model(request, obj, form, change)

@admin.register(Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_available')
    list_filter = ('category', 'is_available')
    search_fields = ('name',)
    exclude = ('restaurant',)

    def save_model(self, request, obj, form, change):
        if not getattr(obj, 'restaurant_id', None):
            restaurant, _ = Restaurant.objects.get_or_create(name="Default Restaurant", defaults={'address': 'Unknown', 'phone': '0000'})
            obj.restaurant = restaurant
        super().save_model(request, obj, form, change)

admin.site.register(Category)
admin.site.register(OrderItem)
admin.site.register(ContactMessage)