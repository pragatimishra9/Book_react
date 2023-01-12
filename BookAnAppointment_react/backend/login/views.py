from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth.models import User, auth
from django.contrib.auth import authenticate
from dashbaord.models import *
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# handle sign up page requests
class Accounts(APIView):
    def get(self, request):
        accounts = User.objects.all()
        serializer = UserSerializer(accounts, many=True)
        return Response(serializer.data)

    def post(self, request):

        email = request.data["email"]
        password = request.data["password"]

        auth_type = request.data["type"]

        if auth_type == "signup":
            name = request.data["name"]
            re_password = request.data["repassword"]
            if password == re_password:
                if not User.objects.filter(username=email).exists():
                    if not User.objects.filter(email=email).exists():
                        try:
                            user = User.objects.create_user(
                                username=email,
                                password=password,
                                email=email,
                                first_name=name,
                            )
                            user.save()
                            doctor = Doctor(name=name, user=user, email=email)
                            doctor.save()
                            res = {
                                "status": 200,
                                "message": "Doctor Registration successfully completed",
                            }
                            return JsonResponse(res)
                        except Exception as e:
                            res = {"status": 500, "error": str(e)}
                            return JsonResponse(res)
                    else:
                        res = {"status": 403, "error": "Email is already registered"}
                        return redirect("/signup")
                else:
                    res = {
                        "status": 403,
                        "error": "User is already present with the given data",
                    }
                    return JsonResponse(res)
            else:
                res = {"status": 403, "error": "Confirm password not matched"}
                return JsonResponse(res)
        elif auth_type == "signin":
            user = authenticate(username=email, password=password)
            if user is not None:
                res = {
                    "status": 200,
                    "name": user.first_name,
                    "username": user.username,
                    "message": "user logged in",
                }
            else:
                res = {
                    "status": 404,
                    "error": "user not found with given credentials",
                }
            return JsonResponse(res)
        else:
            res = {"status": 403, "error": "Invalid type parameter given"}
            return JsonResponse(res)

    def delete(self, request):
        try:
            userid = request.POST["id"]
            user = User.objects.filter(id=userid).get()
            user.delete()
            res = {"status": 200, "message": "Doctor account removed"}
        except Exception as e:
            res = {"status": 500, "error": str(e)}

        return JsonResponse(res)
