import Request from "../Actions/Request";
import axios from 'axios';
import { config } from "./Constants";

export async function updateDoctorInfo(startTime, endTime, period) {
    const data = {
        user: localStorage.getItem('userEmail'),
        type: 'infoUpdate',
        startTime: startTime,
        endTime: endTime,
        period: period
    }

    const body = JSON.stringify(data);
    const res = await axios.post(Request.doctorInfo, body, config);
    if (res.data.status === 200) {
        alert(res.data.message)
    }
    else {
        alert(res.data.error)
    }

}

export async function filterAppointmentData(currentDate, setAppointments) {
    const data = {
        user: localStorage.getItem('userEmail'),
        type: 'info',
        currentDate: currentDate
    }

    const body = JSON.stringify(data);
    const res = await axios.post(Request.doctorInfo, body, config);
    if (res.data.status === 200) {
        setAppointments(res.data.appointments);
    }
    else {
        alert(res.data.error)
    }
}

export async function updateAppointment(appId, status, appointments, setAppointments) {
    const data = {
        id: appId,
        status: status
    }

    const body = JSON.stringify(data);
    const res = await axios.post(Request.updateAppointment, body, config);
    if (res.data.status === 200) {
        let apps = []
        appointments.map((appointment) => {
            if (appointment.id === appId) {
                appointment.appointment_status = status;
                apps.push(appointment);
            }
            else {
                apps.push(appointment);
            }
            return "";
        });
        setAppointments(apps);
    }
    else {
        alert(res.data.error)
    }
}