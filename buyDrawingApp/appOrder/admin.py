from django.contrib import admin
from .models import Users
from .models import Products
from .models import Orders

# Register your models here.
admin.site.register(Users)
admin.site.register(Products)
admin.site.register(Orders)