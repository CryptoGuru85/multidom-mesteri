from django.db.models import fields
from rest_framework import serializers
from accounts.models import User, Profile, Service, Role, Project
from django.contrib.auth import authenticate

User._meta.get_field('email')._unique = True

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, min_length=5)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'password')

    def create(self, validated_data):

        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


class UserLoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        user = authenticate(email=email, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

class ProfileSerializer(serializers.ModelSerializer):
    is_owner = serializers.SerializerMethodField(read_only=True)
    services = serializers.SerializerMethodField(read_only=True)
    role = serializers.SerializerMethodField(read_only=True)
    projects = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['is_owner', 'services', 'role', 'projects']

    def get_is_owner(self, obj):
        owner = self.context['is_owner']
        return owner
    
    def get_services(self, obj):
        return ServiceSerializer(obj.services, many=True).data

    def get_role(self, obj):
        return RoleSerializer(obj.role).data

    def get_projects(self, obj):
        qs = Project.objects.filter(profile=obj)
        return ProjectSerializer(qs, many=True).data

class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Role
        fields = '__all__'

class ProfileLinkSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    user_id = serializers.SerializerMethodField(read_only=True)
    services = serializers.SerializerMethodField(read_only=True)
    role = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['user_id', 'url', 'services', 'role']


    def get_url(self, obj):
        return "/account/profile/{id}/".format(id=obj.user.id)
    
    def get_services(self, obj):
        return ServiceSerializer(obj.services, many=True).data

    def get_role(self, obj):
        return RoleSerializer(obj.role).data

    def get_user_id(self, obj):
        return obj.user.id