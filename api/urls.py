from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, MeView, RestaurantViewSet, MealViewSet, OrderViewSet, ContactMessageViewSet

router = DefaultRouter()
router.register(r'restaurants', RestaurantViewSet)
router.register(r'meals', MealViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'contact', ContactMessageViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
