
from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from Labo_app.serializers import EmployeSerializer, EquipementSerializer, LaboratoireSerializer,UniteSerializer
from Labo_app.models import Employe, Equipement, Laboratoire,Unite
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EmployeSerializer, MatriceSerializer
from rest_framework.exceptions import AuthenticationFailed 
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authtoken.models import Token  # Import Token model
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Matrice
from .serializers import MatriceSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser , FormParser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Equipement
from .serializers import EquipementSerializer


def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

class EquipementViewSet(viewsets.ModelViewSet):
    queryset = Equipement.objects.all()
    serializer_class = EquipementSerializer

class UniteViewSet(viewsets.ModelViewSet):
    queryset = Unite.objects.all()
    serializer_class = UniteSerializer


class LaboratoireViewSet(viewsets.ModelViewSet):
    queryset = Laboratoire.objects.all()
    serializer_class = LaboratoireSerializer

@csrf_exempt
def Laboratoire_api(request, id=0):
    if request.method == 'GET':
        laboratoires = Laboratoire.objects.all()
        laboratoires_serializer = LaboratoireSerializer(laboratoires, many=True)
        return JsonResponse(laboratoires_serializer.data, safe=False)
    elif request.method == 'POST':
        laboratoire_data = JSONParser().parse(request)
        laboratoire_serializer = LaboratoireSerializer(data=laboratoire_data)
        if laboratoire_serializer.is_valid():
            laboratoire_serializer.save()
            return JsonResponse(laboratoire_serializer.data, status=201)
        return JsonResponse(laboratoire_serializer.errors, status=400)
    elif request.method == 'PUT':
        laboratoire_data = JSONParser().parse(request)
        laboratoire_obj = Laboratoire.objects.get(id=id)
        laboratoire_serializer = LaboratoireSerializer(laboratoire_obj, data=laboratoire_data)
        if laboratoire_serializer.is_valid():
            laboratoire_serializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        laboratoire_obj = Laboratoire.objects.get(id=id)
        laboratoire_obj.delete()
        return JsonResponse("Deleted successful", safe=False)


@csrf_exempt
def Unite_api(request, id=0):
    if request.method == 'GET':
        Unites = Unite.objects.all()
        Unites_serializer = UniteSerializer(Unites, many=True)
        return JsonResponse(Unites_serializer.data, safe=False)
    elif request.method == 'POST':
        Unite_data = JSONParser().parse(request)
        Unite_serializer = UniteSerializer(data=Unite_data)
        if Unite_serializer.is_valid():
            Unite_serializer.save()
            return JsonResponse(Unite_serializer.data, status=201)
        return JsonResponse(Unite_serializer.errors, status=400)
    elif request.method == 'PUT':
        Unite_data = JSONParser().parse(request)
        Unite_obj = Unite.objects.get(id=id)
        Unite_serializer = UniteSerializer(Unite_obj, data=Unite_data)
        if Unite_serializer.is_valid():
            Unite_serializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        Unite_obj = Unite.objects.get(id=id)
        Unite_obj.delete()
        return JsonResponse("Deleted successful", safe=False)



@csrf_exempt
def Equipement_api(request, id=0):
    try:
        id = int(id)
    except ValueError:
        return JsonResponse({"error": "Invalid ID"}, status=400)

    if request.method == 'GET':
        if id > 0:
            try:
                equipement = Equipement.objects.get(id=id)
                equipement_serializer = EquipementSerializer(equipement)
                return JsonResponse(equipement_serializer.data, safe=False)
            except Equipement.DoesNotExist:
                return JsonResponse({"error": "Equipement not found"}, status=404)
        else:
            equipements = Equipement.objects.all()
            equipements_serializer = EquipementSerializer(equipements, many=True)
            return JsonResponse(equipements_serializer.data, safe=False)
    elif request.method == 'POST':
        equipement_data = JSONParser().parse(request)
        equipement_serializer = EquipementSerializer(data=equipement_data)
        if equipement_serializer.is_valid():
            equipement_serializer.save()
            return JsonResponse(equipement_serializer.data, status=201)
        return JsonResponse(equipement_serializer.errors, status=400)
    elif request.method == 'PUT':
        equipement_data = JSONParser().parse(request)
        try:
            equipement_obj = Equipement.objects.get(id=id)
        except Equipement.DoesNotExist:
            return JsonResponse({"error": "Equipement not found"}, status=404)
        equipement_serializer = EquipementSerializer(equipement_obj, data=equipement_data)
        if equipement_serializer.is_valid():
            equipement_serializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        try:
            equipement_obj = Equipement.objects.get(id=id)
        except Equipement.DoesNotExist:
            return JsonResponse({"error": "Equipement not found"}, status=404)
        equipement_obj.delete()
        return JsonResponse("Deleted successfully", safe=False)



@csrf_exempt
def Employe_api(request, id=0):
    if request.method == 'GET':
        Employes = Employe.objects.all()
        Employes_serializer = EmployeSerializer(Employes, many=True)
        return JsonResponse(Employes_serializer.data, safe=False)
    elif request.method == 'POST':
        Employe_data = JSONParser().parse(request)
        Employe_serializer = EmployeSerializer(data=Employe_data)
        if Employe_serializer.is_valid():
            Employe_serializer.save()
            return JsonResponse(Employe_serializer.data, status=201)
        return JsonResponse(Employe_serializer.errors, status=400)
    elif request.method == 'PUT':
        Employe_data = JSONParser().parse(request)
        Employe_obj = Employe.objects.get(id=id)  # Renamed variable to Employe_obj
        Employe_serializer = EmployeSerializer(Employe_obj, data=Employe_data)
        if Employe_serializer.is_valid():
            Employe_serializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        Employe_obj = Employe.objects.get(id=id)  # Renamed variable to Employe_obj
        Employe_obj.delete()
        return JsonResponse("Deleted successful", safe=False)

@csrf_exempt
def employe_detail(request, id):    
    if request.method == 'GET':
        employe = Employe.objects.get(id=id)
        employe_serializer = EmployeSerializer(employe)
        return JsonResponse(employe_serializer.data, safe=False)


@csrf_exempt
def employe_matrices(request, employe_id):
    if request.method == 'GET':
        try:
            employe = Employe.objects.get(id=employe_id)
            matrices = Matrice.objects.filter(employe=employe)
            matrices_serializer = MatriceSerializer(matrices, many=True)
            return JsonResponse(matrices_serializer.data, safe=False)
        except Employe.DoesNotExist:
            return HttpResponse(status=404)

@csrf_exempt
def MatriceList(request):
     if request.method == 'GET':
        matrices = Matrice.objects.all()
        matrices_serializer = MatriceSerializer(matrices, many=True)
        return JsonResponse(matrices_serializer.data, safe=False)
     


class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


# class UserLogin(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def post(self, request):
# 		data = request.data
# 		assert validate_email(data)
# 		assert validate_password(data)
# 		serializer = UserLoginSerializer(data=data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.check_user(data)
# 			login(request, user)
# 			return Response(serializer.data, status=status.HTTP_200_OK)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            # Use the EmployeSerializer to return the user data without the password
            user_data = EmployeSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)



UserModel = get_user_model()

class UserList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        users = UserModel.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class UserDetail(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        user = get_object_or_404(UserModel, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(UserModel, pk=pk)
        data = JSONParser().parse(request)
        serializer = UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(UserModel, pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def create_matrice(request):
    serializer = MatriceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def matrices_of_equipement(request, equipement_id):
    if request.method == 'GET':
        matrices = Matrice.objects.filter(equipement_id=equipement_id)
        serializer = MatriceSerializer(matrices, many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# def get_matrice(request,equipement_id):
#     if request.method == 'GET':
#         equipement = Equipement.objects.get(id=equipement_id)
#         matrices = Matrice.objects.filter(equipement=equipement)
#         serializer=MatriceSerializer(matrices,many=True)
#         return Response(serializer.data)

@api_view(['DELETE'])
def matrice_delete(request, employe_id):
    if request.method == 'DELETE':
        try:
            matrice = Matrice.objects.filter(employe_id=employe_id)
            matrice.delete()
            return JsonResponse({"message": "Deleted successfully"}, safe=False)
        except Matrice.DoesNotExist:
            return JsonResponse({"error": "Matrice not found"}, status=404)



@api_view(['GET'])
def matrices_of_employe(request, employe_id):
    if request.method == 'GET':
        employe = Employe.objects.get(id=employe_id)
        matrices = Matrice.objects.filter(employe=employe)
        matrices_serializer = MatriceSerializer(matrices, many=True)
        return JsonResponse(matrices_serializer.data, safe=False)

@api_view(['GET'])
def matrices_of_user(request, user_id):
    matrices = Matrice.objects.filter(user_id=user_id)
    serializer = MatriceSerializer(matrices, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def all_matrices(request):
    if request.method == 'GET':
        matrices = Matrice.objects.all()
        matrices_serializer = MatriceSerializer(matrices, many=True)
        return Response(matrices_serializer.data)




@api_view(['GET'])
def employe_equipements(request, employe_id):
    if request.method == 'GET':
        employe = Employe.objects.get(id=employe_id)
        matrices = Matrice.objects.filter(employe=employe)
        equipements = [mat.equipement for mat in matrices]
        serializer = EquipementSerializer(equipements, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def equipement_employes(request, equipement_id):
    if request.method == 'GET':
        equipement = Equipement.objects.get(id=equipement_id)
        matrices = Matrice.objects.filter(equipement=equipement)
        employes = [mat.employe for mat in matrices]
        serializer = EmployeSerializer(employes, many=True)
        return Response(serializer.data)
    

@method_decorator(csrf_exempt, name='dispatch')
class Admin_Add_Equipement(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = EquipementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class Admin_Modify_Equipement(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, pk, format=None):
        try:
            equipement = Equipement.objects.get(pk=pk)
        except Equipement.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = EquipementSerializer(equipement, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

      