from django.urls import path

from .views import (
    CityApiView,
    CityListApiView,
    ProfileAPIView,
    ProfileListAPIView,
    RoleApiView,
    RoleListApiView,
    ServiceApiView,
    ServiceListApiView,
    UserAPIView,
    UserLoginAPIView,
    UserRegistrationAPIView,
    UsersApiView,
)

app_name = "accounts"

urlpatterns = [
    path("user/", UserAPIView.as_view(), name="user"),
    path("users/", UsersApiView.as_view(), name="users"),
    path("register/", UserRegistrationAPIView.as_view(), name="register"),
    path("login/", UserLoginAPIView.as_view(), name="login"),
    path("profile/<int:id>/", ProfileAPIView.as_view()),
    path("profiles/", ProfileListAPIView.as_view()),
    path("roles/", RoleListApiView.as_view()),
    path("roles/<int:pk>/", RoleApiView.as_view()),
    path("services/", ServiceListApiView.as_view()),
    path("services/<int:pk>/", ServiceApiView.as_view()),
    path("cities/", CityListApiView.as_view()),
    path("cities/<int:pk>/", CityApiView.as_view()),
]
