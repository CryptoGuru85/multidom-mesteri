from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models.deletion import SET_NULL


def upload_profile_picture(instance, filename):
    return "profile/{user}/{filename}".format(user=instance.user, filename=filename)


def upload_project_picture(instance, filename):
    return "project/{profile}/{filename}".format(
        profile=instance.profile, filename=filename
    )


USER_TYPE = (
    ("INDIVIDUAL", ("INDIVIDUAL")),
    ("COMPANY", ("COMPANY")),
)

TEAM = (
    ("1-3", ("1-3")),
    ("3-5", ("3-5")),
    ("5-10", ("5-10")),
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("The given email must be set")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None):

        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)

        return user


class Email(models.EmailField):
    def __init__(self, *args, **kwargs):
        super(Email, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        return str(value).lower()


class User(AbstractBaseUser):
    email = Email(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Role(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Service(models.Model):
    name = models.TextField(max_length=255, null=False, blank=False)
    is_suggested = models.BooleanField(default=False)
    role = models.ForeignKey(Role, models.CASCADE, blank=False, null=False)


class City(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)


class Profile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(choices=USER_TYPE, max_length=25, default="INDIVIDUAL")
    team = models.CharField(choices=TEAM, max_length=25, default="1-3")
    experience = models.IntegerField(null=True)
    first_name = models.CharField(max_length=64, blank=True, null=False)
    last_name = models.CharField(max_length=64, blank=True, null=False)
    company_name = models.CharField(max_length=64, blank=True, null=False)
    about = models.TextField(max_length=265, blank=True, null=False)
    address = models.TextField(max_length=265, blank=True, null=False)
    city = models.ForeignKey(City, models.CASCADE, blank=True, null=True)
    mobile = models.CharField(max_length=64, blank=True, null=False)
    profile_picture = models.ImageField(
        upload_to=upload_profile_picture, blank=True, null=False
    )

    role = models.ForeignKey(Role, on_delete=SET_NULL, null=True)
    services = models.ManyToManyField(Service)

    price_estimate = models.BooleanField(default=False)
    cleaning = models.BooleanField(default=False)

    def __str__(self):
        return "{email} - Profile".format(email=self.user.email)

    @property
    def owner(self):
        return self.user

    # class Meta:
    # unique_together = ("city", "role", "user")


class Project(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    profile_picture = models.ImageField(
        upload_to=upload_project_picture, blank=True, null=False
    )

    def __str__(self):
        return "{email} - Project".format(email=self.profile.user.email)
