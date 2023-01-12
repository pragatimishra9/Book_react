from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User, auth
from django.views import View
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime, timedelta, date
from .task import send_appointment_mail
from rest_framework.views import APIView
from .serializer import *
from rest_framework.response import Response


class DoctorAPIView(APIView):
    def get(self, request):
        try:
            doctors = Doctor.objects.all()
            serializer = DoctorSerializer(doctors, many=True)
            return Response(serializer.data)
        except Exception as e:
            res = {"status": 500, "error": str(e)}
            return Response(res)

    def post(self, request):
        try:

            request_type = request.data["type"]

            if request_type == "info":
                user = request.data["user"]
                try:
                    td = request.data["currentDate"]
                except:
                    td = date.today()

                doctor = Doctor.objects.filter(user=User.objects.get(username=user))
                appointments = Appointment.objects.all().filter(
                    doctor=doctor[0], appointment_date=td
                )
                serializer = AppointmentSerializer(appointments, many=True)
                doctor_serializer = DoctorSerializer(doctor, many=True)
                res = {
                    "status": 200,
                    "doctor": doctor_serializer.data[0],
                    "appointments": serializer.data,
                }
            if request_type == "infoUpdate":
                user = request.data["user"]
                starttime = request.data["startTime"]
                endtime = request.data["endTime"]
                slot = request.data["period"]
                doctor = Doctor.objects.filter(user=User.objects.get(username=user))[0]
                doctor.day_start_time = starttime
                doctor.day_end_time = endtime
                doctor.appointment_slot_time = slot
                doctor.save()
                res = {"status": 200, "message": "Doctor Info Updated Successfully"}

        except Exception as e:
            res = {"status": 500, "error": str(e)}
        return Response(res)


class BookAppointment(APIView):
    def post(self, request):
        try:
            data = request.data
            doctor_id = data["doctor_id"]
            date = data["date"]
            time_slot = data["time_slot"]
            patient_name = data["patient_name"]
            patient_email = data["patient_email"]
            patient_contact = data["patient_contact"]

            doctor = Doctor.objects.get(pk=doctor_id)

            appointment = Appointment(
                doctor=doctor,
                patient_name=patient_name,
                patient_email=patient_email,
                patient_contact=patient_contact,
                appointment_date=date,
                appointment_time=time_slot,
                appointment_status="Open",
            )
            appointment.save()

            subject = "Appointment Booked For - " + str(date) + " - " + str(time_slot)
            body = (
                "Hi "
                + str(patient_name)
                + "\n\n"
                + "your appointent has been booked successfully...."
            )
            send_appointment_mail(subject, body, patient_email)

            subject = "Appointment Booked For - " + str(date) + " - " + str(time_slot)
            body = (
                "Hi Dr."
                + str(doctor.name)
                + "\n\n"
                + "A Patient have booked an appointment for you, patient details are below \n"
                + "Patient Name: "
                + str(patient_name)
                + "\n"
                + "Patient Contact: "
                + str(patient_contact)
                + "\n"
                + "Date and time: "
                + str(date)
                + " "
                + str(time_slot)
                + "\n\n"
                + "Thank You, \n BookAnAppointment"
            )
            send_appointment_mail(subject, body, doctor.email)
            res = {"status": 200, "message": "Appointment Book Successfully"}
        except Exception as e:
            res = {"status": 500, "error": str(e)}
        return Response(res)


class UpdateAnAppointment(APIView):
    def post(self, request):
        try:
            data = request.data
            id = data["id"]
            status = data["status"]

            appointment = Appointment.objects.get(pk=id)
            appointment.appointment_status = status
            appointment.save()
            res = {"status": 200, "message": "Status Updated Successfully"}
        except Exception as e:
            res = {"status": 500, "error": str(e)}
        return Response(res)


class Reports(APIView):
    def post(self, request):
        try:
            data = request.data
            user = User.objects.get(username=data["user"])
            doctor = Doctor.objects.all().filter(user=user)[0]
            filterdate = data["filterDate"]

            year, month = filterdate.split("-")
            filter_appoint = (
                Appointment.objects.all()
                .order_by("-id")
                .filter(
                    appointment_date__year=int(year),
                    appointment_date__month=int(month),
                    doctor=doctor,
                )
            )
            serializer = AppointmentSerializer(filter_appoint, many=True)
            res = {"status": 200, "appointments": serializer.data}
        except Exception as e:
            res = {"status": 500, "error": str(e)}
        return Response(res)
