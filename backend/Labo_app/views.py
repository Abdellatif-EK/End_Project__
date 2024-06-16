from django.shortcuts import render
from django.http.response import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from Labo_app.serializers import EmployeSerializer, EquipementSerializer, LaboratoireSerializer,UniteSerializer
from Labo_app.models import Employe, Equipement, Laboratoire,Unite,Categorie
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EmployeSerializer, MatriceSerializer
from rest_framework.exceptions import AuthenticationFailed 
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer,DemandeSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authtoken.models import Token  # Import Token model
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Matrice
from .serializers import MatriceSerializer,CategorieSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser , FormParser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Equipement,Demande
from .serializers import EquipementSerializer
from rest_framework.generics import ListAPIView
import smtplib
import random
import array

def generate_password():
    MAX_LEN = 8
    DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    LOCASE_CHARACTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    UPCASE_CHARACTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    SYMBOLS = ['@', '#', '$', '%', '=', ':', '?', '.', '/', '|', '~', '>', '*', '(', ')', '<']
    COMBINED_LIST = DIGITS + UPCASE_CHARACTERS + LOCASE_CHARACTERS + SYMBOLS

    rand_digit = random.choice(DIGITS)
    rand_upper = random.choice(UPCASE_CHARACTERS)
    rand_lower = random.choice(LOCASE_CHARACTERS)
    rand_symbol = random.choice(SYMBOLS)

    temp_pass = rand_digit + rand_upper + rand_lower + rand_symbol

    for x in range(MAX_LEN - 4):
        temp_pass = temp_pass + random.choice(COMBINED_LIST)

    temp_pass_list = array.array('u', temp_pass)
    random.shuffle(temp_pass_list)

    password = ""
    for x in temp_pass_list:
        password = password + x

    return password

def send_email(email_receiver, password):
    email_sender = "elkerbaniabdellatif@gmail.com"
    email_password = "bewm brgk snog fndo"
    subject = "Votre Mot de passe"
    message = f"Votre mot de passe est: {password}"

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(email_sender, email_password)
    server.sendmail(email_sender, email_receiver, f"Subject: {subject}\n\n{message}")
    server.quit()
    

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

class EquipementViewSet(viewsets.ModelViewSet):
    queryset = Equipement.objects.all()
    serializer_class = EquipementSerializer
    
class EmployeViewSet(viewsets.ModelViewSet):
    queryset = Employe.objects.all()
    serializer_class = EmployeSerializer

class UniteViewSet(viewsets.ModelViewSet):
    queryset = Unite.objects.all()
    serializer_class = UniteSerializer

class LaboratoireViewSet(viewsets.ModelViewSet):
    queryset = Laboratoire.objects.all()
    serializer_class = LaboratoireSerializer
    
class DemandeViewSet(viewsets.ModelViewSet):
    queryset = Demande.objects.all()
    serializer_class = DemandeSerializer

class CategorieViewSet(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer

@csrf_exempt
def Demande_api(request, id=0):
    if request.method == 'GET':
        Demandes = Demande.objects.all()
        Demandes_serializer = DemandeSerializer(Demandes, many=True)
        return JsonResponse(Demandes_serializer.data, safe=False)
    elif request.method == 'POST':
        Demande_data = JSONParser().parse(request)
        Demande_serializer = DemandeSerializer(data=Demande_data)
        if Demande_serializer.is_valid():
            Demande_serializer.save()
            return JsonResponse(Demande_serializer.data, status=201)
        return JsonResponse(Demande_serializer.errors, status=400)
    elif request.method == 'PUT':
        Demande_data = JSONParser().parse(request)
        Demande_obj = Demande.objects.get(id=id)
        Demande_serializer = DemandeSerializer(Demande_obj, data=Demande_data)
        if DemandeSerializer.is_valid():
            DemandeSerializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        Demande_obj = Demande.objects.get(id=id)
        Demande_obj.delete()
        return JsonResponse("Deleted successful", safe=False)

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
def Categorie_api(request, id=0):
    if request.method == 'GET':
        Categories = Categorie.objects.all()
        Categories_serializer = CategorieSerializer(Categories, many=True)
        return JsonResponse(Categories_serializer.data, safe=False)
    elif request.method == 'POST':
        Categorie_data = JSONParser().parse(request)
        Categories_serializer = CategorieSerializer(data=Categorie_data)
        if Categories_serializer.is_valid():
            Categories_serializer.save()
            return JsonResponse(Categories_serializer.data, status=201)
        return JsonResponse(Categories_serializer.errors, status=400)
    elif request.method == 'PUT':
        Categorie_data = JSONParser().parse(request)
        Categorie_obj = Categorie.objects.get(id=id)
        Categories_serializer = CategorieSerializer(Categorie_obj, data=Categorie_data)
        if Categories_serializer.is_valid():
            Categories_serializer.save()
            return JsonResponse("Update successful", safe=False)
        return JsonResponse("Update failed", safe=False)
    elif request.method == 'DELETE':
        Categorie_obj = Categorie.objects.get(id=id)
        Categorie_obj.delete()
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


# class UserRegister(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	def post(self, request):
# 		clean_data = custom_validation(request.data)
# 		serializer = UserRegisterSerializer(data=clean_data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.create(clean_data)
# 			if user:
# 				return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        #clean_data = custom_validation(request.data)
        password = generate_password()
        request.data['password'] = password
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                send_email(request.data['email'], password)
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

class Demande_API(APIView):
    
    def post(self, request, format=None):
        # Extracting pk_equipement and pk_analyste from the request data
        pk_equipement = request.data.get('equipement')
        pk_analyste = request.data.get('analyste')

        try:
            equipement = Equipement.objects.get(pk=pk_equipement)
            analyste = Employe.objects.get(pk=pk_analyste)
        except Equipement.DoesNotExist:
            return Response({'error': 'Equipement not found'}, status=status.HTTP_404_NOT_FOUND)
        except Employe.DoesNotExist:
            return Response({'error': 'Analyste not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Ensure the request data is appropriate for the serializer
        request.data['equipement'] = equipement.id
        request.data['analyste'] = analyste.id

        serializer = DemandeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log the errors to the console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            demande = Demande.objects.get(pk=pk)
            technicien_id = request.data.get('technicien')
            technicien = Employe.objects.get(pk=technicien_id)
        except Demande.DoesNotExist:
            return Response({'error': 'Demande not found'}, status=status.HTTP_404_NOT_FOUND)
        except Employe.DoesNotExist:
            return Response({'error': 'Technicien not found'}, status=status.HTTP_404_NOT_FOUND)

        # Update the request data before passing to serializer
        update_data = request.data.copy()
        update_data['etat'] = 'en_cours'  # Automatically set the state to "en_cours"
        update_data['technicien'] = technicien.id

        serializer = DemandeSerializer(demande, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)



class Demande_Analyste(APIView):
    
    def put(self, request, pk):
        try:
            demande = Demande.objects.get(pk=pk)
        except Demande.DoesNotExist:
            return Response({'error': 'Demande not found'}, status=status.HTTP_404_NOT_FOUND)
        # Update the request data before passing to serializer
        update_data = request.data.copy() # Automatically set the state to "en_cours"
        serializer = DemandeSerializer(demande, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            demande = Demande.objects.get(pk=pk)
            demande.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Demande.DoesNotExist:
            return Response({'error': 'Demande not found'}, status=status.HTTP_404_NOT_FOUND)
    model = Demande

    def get_queryset(self):
        analyste_id = self.kwargs.get('analyste_id')
        return Demande.objects.filter(etat='traite', analyste_id=analyste_id)

    def render_to_response(self, context, **response_kwargs):
        demandes = self.get_queryset()
        demandes_data = [
            {
                'id': demande.id,
                'date_demande': demande.date_demande,
                'date_debut': demande.date_debut,
                'date_fin': demande.date_fin,
                'etat': demande.etat,
                'description': demande.description,
                'equipement': demande.equipement.appareil,
                'analyste': demande.analyste.username if demande.analyste else None,
                'technicien': demande.technicien.username if demande.technicien else None,
            }
            for demande in demandes
        ]
        return JsonResponse(demandes_data, safe=False)


class DemandeByEquipementView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes for
        an equipement as determined by the equipement_id portion of the URL.
        """
        equipement_id = self.kwargs['equipement_id']
        return Demande.objects.filter(equipement__id=equipement_id)
    
class DemandeByAnalysteView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes created by
        an analyste as determined by the analyste_id portion of the URL.
        """
        analyste_id = self.kwargs['analyste_id']
        return Demande.objects.filter(analyste__id=analyste_id)
    
    
class DemandeByTechnicienView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes treated by
        a technicien as determined by the technicien_id portion of the URL.
        """
        technicien_id = self.kwargs['technicien_id']
        return Demande.objects.filter(technicien__id=technicien_id)
    
class DemandesPasTraiteeView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that do not have the attribute 'etat' set to 'traite'.
        """
        return Demande.objects.exclude(etat='traite')
    
    
class DemandesTraiteesView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that have the attribute 'etat' set to 'traite'.
        """
        return Demande.objects.filter(etat='traite')

class DemandesNonFaisableView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that have the attribute 'etat' set to 'non_faisable'.
        """
        return Demande.objects.filter(etat='non_faisable')

class DemandesEnCoursView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that have the attribute 'etat' set to 'en_cours'.
        """
        return Demande.objects.filter(etat='en_cours')

class DemandesEnAttenteView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that have the attribute 'etat' set to 'reouverture' or 'nouvelle'.
        """
        return Demande.objects.filter(etat__in=['invalide', 'nouvelle'])
    
class DemandeVerifieView(ListAPIView):
    serializer_class = DemandeSerializer

    def get_queryset(self):
        """
        This view returns a list of all the demandes that have the attribute 'etat' set to 'verifie'.
        """
        return Demande.objects.filter(etat='verifie')
    
from django.views import View
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

class DemandePDFView(View):
    def get(self, request, demande_id):
        try:
            demande = Demande.objects.get(id=demande_id)
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="Demande_d_intervention_{demande_id}.pdf"'

            doc = SimpleDocTemplate(response, pagesize=letter)
            elements = []

            data = [
                ["Demande ID", demande.id],
                ["Date de la demande", demande.date_demande.strftime("%Y-%m-%d")],
                ["État", demande.etat],
                ["Description", demande.description],
                ["Date de debut de traitement", demande.date_debut],
                ["Date de fin de traitement", demande.date_fin],
                ["Équipement", demande.equipement.Code_machine],
                ["Analyste", demande.analyste.username]
            ]

            if demande.technicien:
                data.append(["Technicien", demande.technicien.username])
            if demande.verifiant:
                data.append(["Vérifié par", demande.verifiant.username])

            table = Table(data, colWidths=[150, 350], spaceBefore=20, spaceAfter=20)
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.lightblue),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ]))

            elements.append(table)
            doc.build(elements)
            return response
        except Demande.DoesNotExist:
            return HttpResponse("Demande not found", status=404)

