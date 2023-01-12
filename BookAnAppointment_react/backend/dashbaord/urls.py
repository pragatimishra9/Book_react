from django.urls import path
from . import views

urlpatterns = [
    path("info", views.DoctorAPIView.as_view(), name="doctor"),
    path(
        "bookAppointment",
        views.BookAppointment.as_view(),
        name="book_an_appointment",
    ),
    path(
        "update_an_appointment",
        views.UpdateAnAppointment.as_view(),
        name="update_an_appointment",
    ),
    path("reports", views.Reports.as_view(), name="reports"),
]
