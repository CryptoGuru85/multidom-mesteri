# Generated by Django 4.0 on 2022-02-24 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_profile_unique_together'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.role'),
        ),
    ]