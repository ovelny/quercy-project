from django.conf.urls import url, include
# from django.contrib import admin

from rest_framework import routers

from . import views

# router.register crée automatiquement l'adresse items/{id}/ en plus de items/

router = routers.DefaultRouter()
router.register(r'properties', views.Property_Viewset) 
router.register(r'property_types', views.Property_Type_Viewset)
router.register(r'heating_types', views.Heating_Type_Viewset)
router.register(r'kitchen_types', views.Kitchen_Type_Viewset)
router.register(r'rooms', views.Room_Viewset)
router.register(r'property_room', views.Property_Room_Viewset)

urlpatterns = [
    url(r'^', include(router.urls)),
]
