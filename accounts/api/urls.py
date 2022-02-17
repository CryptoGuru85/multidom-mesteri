from django.urls import path

from .views import (ProfileAPIView, ProfileListAPIView, UserAPIView,
                    UserLoginAPIView, UserRegistrationAPIView, UsersApiView)

app_name='accounts'
urlpatterns = [
    path('user/', UserAPIView.as_view(), name="user"),
    path('users/', UsersApiView.as_view(), name="users"),
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('profile/<int:id>/', ProfileAPIView.as_view(), name="profile"),
    path('profiles/', ProfileListAPIView.as_view(), name="profiles"),
]
