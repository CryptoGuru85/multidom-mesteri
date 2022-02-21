from django.contrib import admin

from .models import Profile, Project, Role, Service, User


class ProfileTabAdmin(admin.TabularInline):
    model = Profile


class RoleAdmin(admin.TabularInline):
    model = Role


class UserAdmin(admin.ModelAdmin):
    inlines = [ProfileTabAdmin]
    list_display = ["__str__", "profile"]

    class Meta:
        model = User


class ProfileAdmin(admin.ModelAdmin):
    inlines = [RoleAdmin]
    list_display = ["__str__", "role"]

    class Meta:
        model = User


admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Role)
admin.site.register(Service)
admin.site.register(Project)
