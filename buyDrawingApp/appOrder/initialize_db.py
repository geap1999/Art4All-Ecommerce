from .models import Users
from .models import Products
from .models import Cart
from .models import Orders

Users.objects.create(firstname='Kentucky', lastname='Kentucky', email='ken@gmail.com', username='Kami', password='$2a$12$hDf5TN0GCsjo/KPTAz1AUuev7551qpH4CyJiOEJ45.TnOiEA0X3jK', address='Sky', admin=True)
Users.objects.create(firstname='John', lastname='Doe', email='john@gmail.com', username='johndoe', password='$2a$12$DGIFpjxsQ272fRX26LV7iOzRsaF4UOFzXAu8jVjozGy8lfH95wM8m', address='Paris', admin=False)
Users.objects.create(firstname='Jane', lastname='Doe', email='jane@gmail.com', username='janedoe', password='$2a$12$QDzrBfmYcsSMg/Tyx//DreGgJ0h3Hw2RqJuuNOYyGEhv4.dwHa6z.', address='Paris', admin=False)


