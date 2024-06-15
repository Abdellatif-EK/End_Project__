from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
# from django.db import models this is a test
# another test
# test from my desktop

def upload_to(instance,filename):
    return 'equipement_images/{filename}'.format(filename=filename)



class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class Employe(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [
        ('administrateur', 'Administrateur'),
        ('analyst', 'Analyst'),
        ('Technicien', 'Technicien'),
    ]

    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='analyst')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)  # Add this field for user activation


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username

class Equipement(models.Model):
    appareil = models.CharField(max_length=100, null=False)
    laboratoire = models.ForeignKey('Laboratoire', on_delete=models.CASCADE)
    Etat = models.fields.CharField(max_length=100,null=True)
    modele = models.fields.CharField(max_length=100, null=True)
    Code_machine = models.fields.CharField(max_length=20, null=True)
    Password = models.fields.CharField(max_length=20, null=True)
    Sauvegarde = models.fields.CharField(max_length=100, null=True)
    Connecte_reseau = models.fields.CharField(max_length=100, null=True)
    Connecte_AD = models.fields.CharField(max_length=100, null=True)
    connecté_imprimante = models.fields.CharField(max_length=10, null=True)
    planning_sauvegarde = models.fields.CharField(max_length=100, null=True)
    Logiciel = models.fields.CharField(max_length=100, null=True)
    version_logiciel = models.fields.CharField(max_length=100, null=True)
    date_installation = models.fields.CharField(max_length=100, null=True)
    Version_windows= models.fields.CharField(max_length=100, null=True)
    Situation = models.fields.CharField(max_length=100, null=True)
    Fournisseur = models.fields.CharField(max_length=100, null=True)
    Etat_materiel_informatique= models.fields.CharField(max_length=100, null=True)
    numero_serie= models.fields.CharField(max_length=40, null=True)
    image = models.ImageField(_("Image"),upload_to=upload_to, null=True, blank=True,default='equipement_images/default.png')
    def __str__(self):
        return f'{self.Code_machine}'
    
        
class Document(models.Model):
    equipement = models.ForeignKey(Equipement, on_delete=models.CASCADE, related_name='documents')
    image = models.ImageField(upload_to='images/')
    pdf = models.FileField(upload_to='documents/', blank=True, null=True)

    def __str__(self):
        return f'Document {self.id} for Equipement: {self.equipement.appareil}'


class Laboratoire(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.name

class Categorie(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.name


class Unite(models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)
    laboratoire = models.ForeignKey('Laboratoire', on_delete=models.CASCADE)
    responsable = models.ForeignKey('Employe',on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Matrice(models.Model):
    class Status(models.TextChoices):
        ACTIF = 'actif', 'Actif'
        INACTIF = 'inactif', 'Inactif'

    date_acces = models.DateField(auto_now=True)
    equipement = models.ForeignKey('Equipement', on_delete=models.CASCADE)
    employe = models.ForeignKey('Employe', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIF)

    def __str__(self):
        return f'Matrice for  {self.equipement.appareil} - {self.employe.username}'


# class Demande_intervention(models.Model):
#     class Etat(models.TextChoices):
#         # EN_ATTENTE = 'en_attente', 'En attente'
#         EN_COURS = 'en_cours', 'En cours'
#         VERIFIE = 'verifie','Vérifie'
#         REOUVERTURE = 'reouverture','reouverture'
#         CLOTURE = 'cloture','cloture'
#     class Type(models.TextChoices):
#         INCIDENT = 'incident', 'Incident'
#         MAINTENANCE = 'maintenance', 'Maintenance'
#     class Priorite(models.TextChoices):
#         HAUTE = 'haute', 'Haute'
#         MOYENNE = 'moyenne', 'Moyenne'
#         BASSE = 'basse', 'Basse'
#     date_demande = models.DateField(auto_now=True)
#     type = models.CharField(max_length=10, choices=Type.choices, default=Type.INCIDENT)


class Demande(models.Model):
    Etat_CHOICES = [
        ('nouvelle', 'nouvelle'),
        ('en_cours', 'en_cours'),
        ('verifie','verifie'),
        ('reouverture','reouverture'),
        ('traite','traite'),
        ('non_faisable','non_faisable'),
    ]
    date_demande = models.DateField(auto_now=True)
    date_debut = models.DateField(null=True)
    date_fin = models.DateField(null=True)
    etat = models.CharField(max_length=30, choices=Etat_CHOICES, default=Etat_CHOICES[0][0])
    description = models.CharField(max_length=500, null=False)
    action = models.CharField(max_length=500,null=True)
    equipement = models.ForeignKey('Equipement', on_delete=models.CASCADE)
    analyste = models.ForeignKey('Employe', on_delete=models.CASCADE,related_name='analyste')
    technicien = models.ForeignKey('Employe', on_delete=models.CASCADE, null=True, blank=True,related_name='technicien')
    
    def __str__(self):
        return f'Demande {self.id} - {self.date_demande} - {self.equipement.appareil} - {self.etat}'


