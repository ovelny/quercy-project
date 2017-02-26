from rest_framework import serializers
from API.models import *

class Property_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Type
        fields = ('id', 'label')

class Heating_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Heating_Type
        fields = ('id', 'label')

class Kitchen_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Kitchen_Type
        fields = ('id', 'label')

class Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type')

class Property_Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Room
        fields = ('prop', 'room', 'nb')

class Property_Serializer(serializers.ModelSerializer):
    # property_type = Property_Type_Serializer()
    # SlugRelatedField : permet d'afficher le label de l'objet nested dans l'objet Property récupéré
    # (au lieu de la foreign key ou de l'objet complet)
    # paramètre queryset : "used for model instance lookups when validating the field input"
    property_type = serializers.SlugRelatedField(slug_field='label', queryset=Property_Type.objects.all()) 
    heating_type = serializers.SlugRelatedField(slug_field='label', queryset=Heating_Type.objects.all())
    kitchen_type = serializers.SlugRelatedField(slug_field='label', queryset=Kitchen_Type.objects.all())
    # rooms : cas particulier, many-to-many avec un champ en plus sur l'association (nb)
    # on traitera la table de liaison à part, sans s'embêter.
    class Meta:
        model = Property
        fields = ('id', 'advert_type', 'state', 'description', 'nb_rooms', 'price',
        'address','postal_code','city','living_surface','total_surface','construction_year',
        'nb_floors','energy_consumption','gas_emission','is_favorite',
        'property_type','heating_type','kitchen_type')#, 'rooms')
    

#------------------------------

class Company_Info_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Company_Info
        fields = ('company_presentation')
    