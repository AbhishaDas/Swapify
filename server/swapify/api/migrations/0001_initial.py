# Generated by Django 5.1.1 on 2024-10-12 07:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(default='', max_length=50)),
                ('password', models.CharField(max_length=200)),
                ('last_login', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'userinfo',
            },
        ),
    ]
