# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from .models import CustomUser

# @admin.register(CustomUser)
# class CustomUserAdmin(UserAdmin):
#     model = CustomUser
#     list_display = ("id", "username", "email", "phone", "is_verified", "is_staff", "date_joined")
#     list_filter = ("is_verified", "is_staff", "is_superuser", "is_active")
#     search_fields = ("username", "email", "phone")
#     ordering = ("-date_joined",)

#     fieldsets = (
#         (None, {"fields": ("username", "email", "phone", "password", "image")}),
#         ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
#         ("Important dates", {"fields": ("last_login", "date_joined")}),
#         ("Verification", {"fields": ("is_verified", "otp")}),
#     )

#     add_fieldsets = (
#         (None, {
#             "classes": ("wide",),
#             "fields": ("username", "email", "phone", "password1", "password2", "is_verified", "is_staff"),
#         }),
#     )
