from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import CreateEmplacementView, Demande_Analyste, EquipementViewSet,UniteViewSet,LaboratoireViewSet,EmployeViewSet,DemandeViewSet,CategorieViewSet
from django.conf import settings
from django.conf.urls.static import static
from .views import Admin_Add_Equipement , csrf_token_view , Admin_Modify_Equipement,Demande_API,Demande_api
from .views import DemandeByEquipementView, DemandeByAnalysteView,DemandeByTechnicienView,DemandesPasTraiteeView,DemandesTraiteesView,DemandesNonFaisableView,DemandesEnCoursView,DemandesEnAttenteView,DemandeVerifieView
from .views import DemandePDFView,GetEmplacementByEquipement

router = DefaultRouter()
router.register(r'Equipement', EquipementViewSet)
router.register(r'Unite',UniteViewSet)
router.register(r'Laboratoire',LaboratoireViewSet)
router.register(r'Employe',EmployeViewSet)  
router.register(r'Demande',DemandeViewSet)
router.register(r'Categorie',CategorieViewSet)
name_app = 'Labo_app'

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('users', views.UserList.as_view(), name='user-list'),  # List all users
    path('users/<int:pk>', views.UserDetail.as_view(), name='user-detail'),
    re_path(r'^Employe$', views.Employe_api),
    path('Employe/<int:id>', views.employe_detail, name='employe-detail'),
    re_path(r'^Employe/([0-9]+)$', views.Employe_api),
    re_path(r'^Equipement$', views.Equipement_api),
    re_path(r'^Equipement/([0-9]+)$', views.Equipement_api),
    re_path(r'^Laboratoire$', views.Laboratoire_api),
    re_path(r'^Laboratoire/([0-9]+)$', views.Laboratoire_api),
    re_path(r'^Unite$', views.Unite_api),
    re_path(r'^Unite/([0-9]+)$', views.Unite_api),
    re_path(r'^Demande$', views.Demande_api),
    re_path(r'^Demande/([0-9]+)$', views.Demande_api),
    re_path(r'^Demande$', views.Demande_api),
    re_path(r'^Demande/([0-9]+)$', views.Demande_api),
    
    path('create-matrice', views.create_matrice, name='create-matrice'),
    path('matrices-of-equipement/<int:equipement_id>', views.matrices_of_equipement, name='matrices-of-equipement'),
    path('matrices-of-employe/<int:employe_id>', views.matrices_of_employe, name='matrices-of-employe'),
    path('Employe/<int:employe_id>/matrices', views.employe_matrices, name='employe-matrices'),
    path('matrices', views.all_matrices, name='matrice-list'),
    path('matrices/<int:employe_id>/equipements', views.employe_equipements, name='employe-equipements'),
    path('matrices/<int:equipement_id>/employes', views.equipement_employes, name='equipement-employes'),
    path('ajouter/equipement', Admin_Add_Equipement.as_view(), name='admin-ajouter-equipement'), 
    path('modifier/equipement/<int:pk>',Admin_Modify_Equipement.as_view(),name='admin-modifier-equipement'),
    path('matrice_delete/<int:employe_id>',views.matrice_delete,name='matrice-delete'),
    
    
    path('demande/pas/traitee', DemandesPasTraiteeView.as_view(), name='demande-pas-traitee'),
    path('demande/traitee', DemandesTraiteesView.as_view(), name='demande-traitee'),
    path('demande/non-faisable', DemandesNonFaisableView.as_view(), name='demande-non-faisable'),
    path('demande/en-cours', DemandesEnCoursView.as_view(), name='demande-en-cours'),
    path('demande/en-attente', DemandesEnAttenteView.as_view(), name='demande-en-attente'),
    path('demande/verifie', DemandeVerifieView.as_view(), name='verifier-demande'),
    
    # path('demande/turn-to-en-cours/<int:pk>/', Demande_API.as_view(), name='turn-to-en-cours'),
    # path('demande/turn-to-nouvelle/<int:pk>/', Demande_API.as_view(), name='turn-to-en-attente'),
    # path('demande/turn-to-reouverture/<int:pk>/', Demande_API.as_view(), name='turn-to-reouverture'),
    # path('demande/turn-to-traite/<int:pk>/', Demande_API.as_view(), name='turn-to-traite'),
    # path('demande/turn-to-non-faisable/<int:pk>/',  Demande_API.as_view(), name='turn-to-non-faisable'),
    # path('demande/turn-to-verifie/<int:pk>/', Demande_API.as_view(), name='turn-to-verifie'),
    
    
    path('demande/definir', Demande_API.as_view(), name='definir-demande'),
    path('demande/update/<int:pk>/', Demande_API.as_view(), name='update-demande'),
    
    path('demandes/equipement/<int:equipement_id>/', DemandeByEquipementView.as_view(), name='demandes-by-equipement'),
    path('demandes/technicien/<int:technicien_id>/', DemandeByTechnicienView.as_view(), name='demandes-by-technicien'),
    
    
    path('demandes/analyste/<int:analyste_id>/', DemandeByAnalysteView.as_view(), name='demandes-by-analyste'),
    path('demande/analyste/update/<int:pk>/', Demande_Analyste.as_view(), name='update-demande-analyste'),
    path('demande/analyste/delete/<int:pk>/', Demande_Analyste.as_view(), name='delete-demande-analyste'),
    path('demande/analyste/traite/<int:pk>/',Demande_Analyste.as_view(),name='demande-analyste-traite'),
    
    path('demande/<int:demande_id>/pdf/', DemandePDFView.as_view(), name='demande_pdf'),
    
    path('emplacement/creer/<int:equipement_id>/', CreateEmplacementView.as_view(), name="emplacement_creer"),
    
    path('csrf-token/', csrf_token_view, name='csrf-token'),
    path('', include(router.urls)),  # Include the router's URLs
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)