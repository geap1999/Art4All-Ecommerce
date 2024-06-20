from django.urls import path
from . import views

urlpatterns = [
    path('', views.homepage, name='home'),
    path('users', views.users, name='users'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('users/<int:id>', views.user, name='user'),
    path('users/<int:id>', views.user, name='updateUser'),
    path('users/<int:id>', views.user, name='deleteUser'),
    path('products', views.products, name='products'),
    path('products', views.products, name='createProduct'),
    path('products/<int:id>', views.product, name='product'),
    path('products/<int:id>', views.product, name='updateProduct'),
    path('products/<int:id>', views.product, name='deleteProduct'),
    path('cart/<int:id>', views.cart, name="cart"),
    path('cart/<int:id>/add-product', views.add_product_to_cart, name='add_product_to_cart'),
    path('cart/<int:id>/remove-product', views.remove_product_from_cart, name='remove_product_from_cart'),
    path('orders/<int:id>', views.orders, name="orders"),
    path('order-cancel/<int:id>', views.cancel_order, name="cancel_order"),
]
