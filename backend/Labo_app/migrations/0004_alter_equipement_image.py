# Generated by Django 4.2.13 on 2024-05-30 14:34

import Labo_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Labo_app', '0003_equipement_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipement',
            name='image',
            field=models.ImageField(blank=True, default='equipement_images/default.png', null=True, upload_to=Labo_app.models.upload_to, verbose_name='Image'),
        ),
    ]
