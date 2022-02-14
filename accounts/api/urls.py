from django.urls import path
from .views import (UserRegistrationAPIView,
                    UserAPIView,
                    UserLoginAPIView,
                    ProfileListAPIView,
                    ProfileAPIView)

app_name='accounts'
urlpatterns = [
    path('user/', UserAPIView.as_view(), name="user"),

    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('profile/<int:id>/', ProfileAPIView.as_view(), name="profile"),
    path('profiles/', ProfileListAPIView.as_view(), name="profiles"),
]