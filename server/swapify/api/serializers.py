from rest_framework import serializers
from .models import UserInfo
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ['username', 'email', 'phone', 'password']

    # Hash the password when saving the user
    def create(self, validated_data):
        user = UserInfo(
            username=validated_data['username'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            password=make_password(validated_data['password'])
        )
        user.save()
        return user
