from rest_framework import serializers
from dango.contrib.auth import get_user_model
from dango.contrib.auth import authenticate

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class meta:
        model = Users
        fields = ('id', 'username', 'email')


class ResgisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only: True'}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data
        ['username'], validated_data['email'],
        validated_data['password'])

        return user
