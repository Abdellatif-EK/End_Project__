from django.forms import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from Labo_app.models import Emplacement, Employe, Equipement, Laboratoire,Matrice,Unite,Demande,Categorie
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserModel.ROLE_CHOICES, default='analyst')

    class Meta:
        model = UserModel
        fields = ['email', 'username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data.get('role', 'analyst')  # Set default role to analyst
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, data):
        email = data.get('email')
        password = data.get('password')

        # Perform authentication
        user = authenticate(username=email, password=password)
        if not user:
            raise ValidationError('Invalid email or password')

        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'username', 'role'] 

class EquipementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipement
        fields = '__all__'  # adjust fields as needed

class EmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = '__all__'

class LaboratoireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratoire
        fields = '__all__'

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = "__all__"


class UniteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unite
        fields = '__all__'

class MatriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matrice
        fields = '__all__'
        
class DemandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande
        fields = '__all__'
        
class EmplacementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emplacement
        fields = '__all__'
