from django.contrib import admin
from Labo_app.models import Employe, Equipement, Laboratoire, Unite,Matrice,Document,Demande

admin.site.register(Employe)
admin.site.register(Equipement)
admin.site.register(Document)
admin.site.register(Laboratoire)
admin.site.register(Unite)
admin.site.register(Matrice)
admin.site.register(Demande)