import json

from accounts.models import City, Profile, Role, Service
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.shortcuts import Http404, get_object_or_404
from rest_framework import generics, permissions, response, status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from .permissions import AnonPermissionOnly, IsOwnerOrReadOnly
from .serializers import (
    CitySerializer,
    ProfileListSerializer,
    ProfileSerializer,
    RoleSerializer,
    ServiceSerializer,
    UserLoginSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)

User = get_user_model()


class UsersApiView(generics.ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserRegistrationAPIView(generics.CreateAPIView):
    permission_classes = [AnonPermissionOnly]
    serializer_class = UserRegistrationSerializer
    queryset = User.objects.all()


class UserLoginAPIView(generics.GenericAPIView):

    permission_classes = [AnonPermissionOnly]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        access_token = RefreshToken.for_user(user).access_token
        refresh_token = RefreshToken.for_user(user)

        return response.Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "tokens": {"access": str(access_token), "refresh": str(refresh_token)},
            }
        )


class ProfileListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProfileListSerializer
    search_fields = ["user_type", "role__name", "services__name", "city"]

    def get_queryset(self):
        qs = Profile.objects.filter(
            user__is_admin=False, first_name__isnull=False
        ).exclude(first_name="", last_name="")
        return qs


class ProfileAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = ProfileSerializer

    def get_object(self, *args, **kwargs):
        id = self.kwargs.get("id")
        if id is not None:
            user = get_object_or_404(User, id=id)
            obj = get_object_or_404(Profile, user=user)
            if obj == None:
                raise Http404
        self.check_object_permissions(self.request, obj)
        return obj

    def get_serializer_context(self, *args, **kwargs):
        user = self.request.user
        profile = self.get_object()

        print(user.pk, profile.owner.pk)

        is_owner = False  # the idea is. If owner=false, show a follow button

        if profile.owner.pk == user.pk:
            is_owner = True

        return {"is_owner": is_owner, **super().get_serializer_context(*args, **kwargs)}

    def perform_update(self, serializer):
        instance = serializer.save()

        _services = self.request.data.get("services", [])
        services = [
            (
                Service.objects.get(pk=service.get("id"))
                if service.get("id", None)
                else Service.objects.create(
                    **{**service, "role": Role(pk=service.get("role"))}
                )
            )
            for service in _services
        ]

        instance.services.set(services, clear=True)

        return instance


class RoleListApiView(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


class RoleApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


class ServiceListApiView(generics.ListCreateAPIView):

    serializer_class = ServiceSerializer
    queryset = Service.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get("role")
        if role is None:
            return queryset
        return queryset.filter(role=role)


class ServiceApiView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()


class CityListApiView(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CitySerializer
    queryset = City.objects.all()


class CityApiView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CitySerializer
    queryset = City.objects.all()
