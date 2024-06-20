from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json
from django.core.serializers import serialize
import bcrypt
from django.shortcuts import get_object_or_404
from .models import Users
from .models import Products
from .models import Orders
from .models import OrderProducts
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
import jwt
from django.utils import timezone
import datetime
import os
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

#CRUD for users

def homepage(request):
    print("hi")
    return HttpResponse("Hello world!")

def users(request):
    try:
        user_id = getUserIdFromToken(request)
        user = Users.objects.get(id=user_id)
        if user.admin == True:
            if request.method == "GET":
                users = json.loads(serialize('json', Users.objects.all()))
                data = []
                for i in range(0, len(users)):
                    user = {
                        'id': users[i]['pk'], 
                        'firstname': users[i]['fields']['firstname'], 
                        'lastname': users[i]['fields']['lastname'], 
                        'email': users[i]['fields']['email'], 
                        'username': users[i]['fields']['username'], 
                        'password': users[i]['fields']['password'], 
                        'address': users[i]['fields']['address'], 
                        'admin': users[i]['fields']['admin'],
                        'created_at': users[i]['fields']['created_at'],
                        'updated_at': users[i]['fields']['updated_at'],
                    }
                    data.append(user)
                return JsonResponse(data, safe=False)
        else:
            return JsonResponse("Not admin", safe=False, status=404)
    except:
        return JsonResponse("Time out.", safe=False, status=404)

@csrf_exempt
def user(request, id):
    try:
        user_id = getUserIdFromToken(request)
        user = Users.objects.get(id=user_id)
        #get user
        if user_id == id or user.admin == True:
            if request.method == "GET":
                user = json.loads(serialize('json', [Users.objects.get(id=id)]))
                data = {
                    'id': user[0]['pk'], 
                    'firstname': user[0]['fields']['firstname'], 
                    'lastname': user[0]['fields']['lastname'], 
                    'email': user[0]['fields']['email'], 
                    'username': user[0]['fields']['username'],
                    'password': user[0]['fields']['password'],
                    'address': user[0]['fields']['address'], 
                    'admin': user[0]['fields']['admin']
                }
                return JsonResponse(data, safe=False)
            #update user
            elif request.method == "POST":
                update_user_data = json.loads(request.body)
                firstname = update_user_data['firstname']
                lastname = update_user_data['lastname']
                email = update_user_data['email']
                username = update_user_data['username']
                address = update_user_data['address']  
                print(address, flush=True)
                if update_user_data["password"] == "":
                    print('hi', flush=True)
                    Users.objects.filter(id=id).update(firstname=firstname, lastname=lastname, email=email, username=username, address=address)
                else:
                    print('hii', flush=True)
                    password = update_user_data["password"]
                    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                    password=hashed_password.decode('utf-8')
                    Users.objects.filter(id=id).update(firstname=firstname, lastname=lastname, email=email, username=username, password=hashed_password.decode('utf-8'), address=address)
                return JsonResponse("User modification successful", safe=False)
            #delete user
            elif request.method == 'DELETE':
                try: 
                    Users.objects.get(id=id).delete()
                    return JsonResponse("User deletion successful", safe=False)
                except:
                    return JsonResponse("User does not exist.", safe=False)
        else:
            return JsonResponse("Not allowed.", safe=False, status=404)
    except:
        return JsonResponse("Time out.", safe=False, status=404)

@csrf_exempt
def register(request):
    if request.method == "POST":
        register_data = json.loads(request.body)
        firstname = register_data['firstname']
        lastname = register_data['lastname']
        email = register_data['email']
        username = register_data['username']
        password = register_data['password']
        address = register_data['address']
        admin = False
        try:
            validate_email(email)
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            try:
                Users.objects.get(email=email)
                return JsonResponse("User already exists.", safe=False, status=404)
            except:
                user = Users.objects.create(firstname=firstname, lastname=lastname, email=email, username=username, password=hashed_password.decode('utf-8'), address=address, admin=admin)
                Orders.objects.create(user=user, valid=False, quantity=0, total_price=0, status="Cart")
                return JsonResponse("Registration successful", safe=False)
        except ValidationError as e:
            return JsonResponse("Bad email", safe=False, status=404)

@csrf_exempt
def login(request):
    if request.method == "POST":
        login_data = json.loads(request.body)
        email = login_data['email']
        password = login_data['password']
        try:
            user = Users.objects.get(email=email)
            if bcrypt.checkpw(bytes(password.encode('utf-8')), bytes(user.password.encode('utf-8'))):
                jwt_obj= {
                    'user_id': user.id,
                    'admin': user.admin,
                    'exp': timezone.now() + datetime.timedelta(days=1),
                }
                token = jwt.encode(jwt_obj, 'secret', algorithm='HS256')
                return JsonResponse(token, safe=False, status=200)
            else:
                return JsonResponse("Wrong password or user!", safe=False, status=404)
        except:
            return JsonResponse("User does not exist", safe=False, status=404)

#function that gets user id with their token
def getUserIdFromToken(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return JsonResponse({'error': 'Token missing'}, status=404)
    token = auth_header.split(' ')[1]
    decode_token = jwt.decode(token, 'secret', algorithms=["HS256"])
    return decode_token['user_id']

#------------------------------------------------------------------

#CRUD for products
@csrf_exempt
def products(request):
    #get products
    if request.method == 'GET':
        products = json.loads(serialize('json', Products.objects.all()))
        data = []
        for i in range(0, len(products)):
            product = {
                'id': products[i]['pk'], 
                'name': products[i]['fields']['name'], 
                'image': products[i]['fields']['image'],
                'description': products[i]['fields']['description'], 
                'price': products[i]['fields']['price']
            }
            data.append(product)
        return JsonResponse(data, safe=False)
    #add products
    elif request.method == "POST":
        try:
            user_id = getUserIdFromToken(request)
            if Users.objects.get(id=user_id).admin == True:
                product_data = json.loads(request.body)
                name = product_data['name']
                description = product_data['description']
                image = product_data['image']
                price = product_data['price']
                if image == "":
                    Products.objects.create(name=name, description=description, image="https://res.cloudinary.com/dafiqfkwf/image/upload/v1718200954/NA_image_ea8q33.png", price=price)
                else:
                    Products.objects.create(name=name, description=description, image=image, price=price)
                return JsonResponse("Add product successful", safe=False)
            else:
                return JsonResponse("Not admin", safe=False, status=404)
        except:
            return JsonResponse("Time out.", safe=False, status=404)
        
@csrf_exempt
def product(request, id):
    product = Products.objects.get(id=id)
    #get product
    if request.method == 'GET':
        product = json.loads(serialize('json', [product]))
        data = {
            'id': product[0]['pk'], 
            'name': product[0]['fields']['name'], 
            'description': product[0]['fields']['description'], 
            'price': product[0]['fields']['price']
        }
        return JsonResponse(data, safe=False)
    #update product
    elif request.method == 'POST':
        try:
            user_id = getUserIdFromToken(request)
            print(user_id, flush=True)
            if Users.objects.get(id=user_id).admin == True:
                product_data = json.loads(request.body)
                name = product_data['name']
                description = product_data['description']
                image = product_data['image']
                print(image, flush=True)
                price = product_data['price']
                if image == "":
                    Products.objects.filter(id=id).update(name=name, description=description, price=price)
                else:
                    Products.objects.filter(id=id).update(name=name, description=description, image=image, price=price)
                return JsonResponse("Modified product successful", safe=False)
            else:
                return JsonResponse("Not admin", safe=False, status=404)
        except Exception as e:
            print(e, flush=True)
            return JsonResponse("Time out.", safe=False, status=404)
    #delete product
    elif request.method == 'DELETE':
        try:
            user_id = getUserIdFromToken(request)
            if Users.objects.get(id=user_id).admin == True:
                try:
                    Products.objects.get(id=id).delete()
                    return JsonResponse("Product deletion successful", safe=False)
                except:
                    return JsonResponse("Product does not exist.", safe=False, status=404)
            else:
                return JsonResponse("Not admin", safe=False, status=404)
        except:
            return JsonResponse("Time out.", safe=False, status=404)

#------------------------------------------------------------------

@csrf_exempt
def cart(request, id):
    try:
        user_id = getUserIdFromToken(request)
        user = Users.objects.get(id=user_id)
        if user_id == id or user.admin == True:
            if request.method == 'GET':
                cart = getPresentCart(user)
                cart_serialized = json.loads(serialize('json', [cart]))
                cart_data = {
                    'id': cart_serialized[0]['pk'], 
                    'user': cart_serialized[0]['fields']['user'], 
                    'valid': cart_serialized[0]['fields']['valid'], 
                    'total_price': cart_serialized[0]['fields']['total_price'],
                    'status': cart_serialized[0]['fields']['status'],
                    'created_at': cart_serialized[0]['fields']['created_at'],
                    'updated_at': cart_serialized[0]['fields']['updated_at'],
                }
                cart_products = OrderProducts.objects.filter(order=cart)
                products_data = []
                for cart_product in cart_products:
                    product = cart_product.product
                    product_data = {
                        'id': product.id,
                        'name': product.name,
                        'image': product.image,
                        'description': product.description,
                        'price': product.price,
                        'quantity': cart_product.quantity
                    }
                    products_data.append(product_data)
                cart_data['products'] = products_data
                return JsonResponse(cart_data, safe=False)
            elif request.method == 'POST':
                cart = getPresentCart(user)
                cart.valid = True
                cart.status = "To be shipped"
                cart.save()
                Orders.objects.create(user=user, valid=False, quantity=0, total_price=0, status='Cart')
                return JsonResponse('Cart valid and order created.', safe=False)  
        else:
            return JsonResponse("Not allowed.", safe=False, status=404)
    except Exception as e:
        print(e, flush=True)
        return JsonResponse("An error occurred", safe=False, status=404)

def getPresentCart(user):
    return Orders.objects.filter(user=user).order_by('-created_at').first()

@csrf_exempt
def add_product_to_cart(request, id):
    if request.method == 'POST':
        data = json.loads(request.body)
        product_id = data['product_id']
        user_id = getUserIdFromToken(request)
        if user_id == id or user.admin == True:
            user = Users.objects.get(id=user_id)
            try:
                product = Products.objects.get(id=product_id)
                cart = getPresentCart(user)
                cart_product = get_object_or_404(OrderProducts, order=cart, product=product)
                cart_product.quantity += 1
                cart.quantity += 1
                cart.total_price += product.price
                cart.save()
                cart_product.save()
                return JsonResponse('Product added to cart successfully', safe=False)
            except:
                cart_product = OrderProducts.objects.create(order=cart, product=product, quantity=1)
                cart.total_price += product.price
                cart.save()
                return JsonResponse('Product added to cart successfully', safe=False)
        else:
            return JsonResponse("Not allowed.", safe=False, status=404)

@csrf_exempt
def remove_product_from_cart(request, id):
    if request.method == 'DELETE':
        product_id = json.loads(request.body)
        user_id = getUserIdFromToken(request)
        if user_id == id or user.admin == True :
            user = Users.objects.get(id=user_id)
            product = Products.objects.get(id=product_id)
            cart = getPresentCart(user)
            cart_product = get_object_or_404(OrderProducts, order=cart, product=product)
            cart_product.quantity -= 1
            cart_product.save()
            cart.total_price -= product.price
            if cart.total_price < 0:
                cart.total_price = 0
            cart.save()
            if cart_product.quantity == 0:
                cart_product.delete()
            return JsonResponse('Product removed successfully', safe=False)
        else:
            return JsonResponse("Not allowed.", safe=False, status=404)

#------------------------------------------------------------------

#orders
@csrf_exempt
def orders(request, id):
    if request.method == 'GET':
        try:
            user_id = getUserIdFromToken(request)
            user = Users.objects.get(id=user_id)
            orders = Orders.objects.filter(valid=True, user_id=user_id).order_by('-updated_at')
            if user_id == id or user.admin:
                orders_serialized = json.loads(serialize('json', orders))
                orders_data = []
                
                for order_serialized in orders_serialized:
                    order_data = {
                        'id': order_serialized['pk'],
                        'user': order_serialized['fields']['user'],
                        'valid': order_serialized['fields']['valid'],
                        'total_price': order_serialized['fields']['total_price'],
                        'status': order_serialized['fields']['status'],
                        'created_at': order_serialized['fields']['created_at'],
                        'updated_at': order_serialized['fields']['updated_at'],
                        'products': []
                    }
                    
                    order_products = OrderProducts.objects.filter(order_id=order_data['id'])
                    products_data = []
                    
                    for order_product in order_products:
                        product_data = {
                            'id': order_product.product.id,
                            'name': order_product.product.name,
                            'image': order_product.product.image,
                            'description': order_product.product.description,
                            'price': order_product.product.price,
                            'quantity': order_product.quantity
                        }
                        products_data.append(product_data)
                    
                    order_data['products'] = products_data
                    orders_data.append(order_data)
                return JsonResponse(orders_data, safe=False)
            else:
                return JsonResponse("Not allowed.", safe=False, status=404)
        except Exception as e:
            print(e, flush=True)
            return JsonResponse("No orders", safe=False)

#cancel order
@csrf_exempt
def cancel_order(request, id):
    if request.method == 'POST':
        try:
            user_id = getUserIdFromToken(request)
            user = Users.objects.get(id=user_id)
            order_id = json.loads(request.body)
            order = Orders.objects.get(id=order_id)
            if user_id == id or user.admin:
                order.status = "Canceled"
                order.save()
                Orders.objects.create(user=user, valid=False, quantity=0, total_price=0, status='Cart')
                return JsonResponse('Order canceled', status=200)
            else:
                return JsonResponse('Not allowed.', status=403)
        except Exception as e:
            print(e, flush=True)
            return JsonResponse(e, status=500)

