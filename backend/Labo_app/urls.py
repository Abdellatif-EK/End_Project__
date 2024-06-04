from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import EquipementViewSet,UniteViewSet,LaboratoireViewSet
from django.conf import settings
from django.conf.urls.static import static
from .views import Admin_Add_Equipement , csrf_token_view , Admin_Modify_Equipement


router = DefaultRouter()
router.register(r'Equipement', EquipementViewSet)
router.register(r'Unite',UniteViewSet)
router.register(r'Laboratoire',LaboratoireViewSet)
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
    path('csrf-token/', csrf_token_view, name='csrf-token'),
    path('', include(router.urls)),  # Include the router's URLs
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)