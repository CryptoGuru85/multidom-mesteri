from accounts.models import City, Profile, Project, Role, Service, User
from accounts.utils import base64_file
from django.contrib.auth import authenticate
from rest_framework import serializers

User._meta.get_field("email")._unique = True


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email"]


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True, min_length=5
    )

    class Meta:
        model = User
        fields = ("id", "email", "password")

    def create(self, validated_data):

        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

    def to_internal_value(self, data):
        if str(data).isdigit():
            return Role.objects.get(id=data)
        return super().to_internal_value(data)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "name", "is_suggested"]

    def to_internal_value(self, data):
        if str(data).isdigit():
            return Service.objects.get(id=data)
        return super().to_internal_value(data)


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = "__all__"

    def to_internal_value(self, data):
        if str(data).isdigit():
            return City.objects.get(id=data)
        return super().to_internal_value(data)


class ProfileSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField(read_only=True)
    services = ServiceSerializer(many=True)
    role = RoleSerializer()
    city = CitySerializer()
    projects = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["is_owner", "projects"]

    def to_internal_value(self, data):
        profile_picture = data.pop("profile_picture", None)
        initial = super().to_internal_value(data)

        if profile_picture is not None:
            image = base64_file(profile_picture)
            if image:
                initial["profile_picture"] = image

        return initial

    def to_representation(self, instance):

        initial = super().to_representation(instance)

        profile_picture = initial.pop("profile_picture", None)

        url = (
            self.context["request"].build_absolute_uri(profile_picture)
            if profile_picture
            else None
        )
        initial["profile_picture"] = url
        print(url)
        return initial

    def get_is_owner(self, _):
        owner = self.context["is_owner"]
        return owner

    def get_projects(self, obj):
        qs = Project.objects.filter(profile=obj)
        return ProjectSerializer(qs, many=True).data

    def update(self, instance, validated_data):
        role = validated_data.get("role")
        services = validated_data.pop("services", [])

        instance = super().update(instance, validated_data)

        if role != None:
            instance.services.set(services, clear=True)

        return instance


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class ProfileListSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)
    services = ServiceSerializer(many=True)
    role = RoleSerializer()
    city = CitySerializer()

    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ["user_id", "url", "services", "role"]

    def get_url(self, obj):
        return "/account/profile/{id}/".format(id=obj.user.id)

    def get_user_id(self, obj):
        return obj.user.id
