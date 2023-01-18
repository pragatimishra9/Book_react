import axios from 'axios';
import Request from '../Actions/Request';
import { config } from './Constants';
import moment from 'moment';


export const fillDoctorBookingDetails = (doctorId, setCurrentDoctorId, setTimeSlots, doctors) => {
    setCurrentDoctorId(doctorId);
    let currentDoctor = {};
    doctors.map((doctor) => {
        if (doctor.id === doctorId) {
            currentDoctor = doctor;
        }
        return "";
    });
    let day_start_time = moment(currentDoctor.day_start_time, "hh:mm");
    let day_end_time = moment(currentDoctor.day_end_time, "hh:mm");
    const timeJump = currentDoctor.appointment_slot_time.split(" ")[0];
    let now = moment();
    let currentTime = moment(`${now.hour()}:${now.minute()}`, "hh:mm");
    let timeStamps = [];
    //console.log(timeJump);
    while (day_start_time < day_end_time) {
        if (day_start_time >= currentTime) {
            let temp = `${day_start_time.hour()}:${day_start_time.minute()}`
            day_start_time = day_start_time.add(parseInt(timeJump), 'm');
            temp = `${temp}-${day_start_time.hour()}:${day_start_time.minute()}`;
            timeStamps.push(temp);
        } else {
            day_start_time = day_start_time.add(parseInt(timeJump), 'm');
        }
    }
    setTimeSlots(timeStamps);
}

export function handleSelectedTimeSlot(e, setSelectedTimeSlot) {
    if (e.target.checked) {
        setSelectedTimeSlot(e.target.value);
    }
    else {
        setSelectedTimeSlot("");
    }
}

export async function bookAppointment(currentDoctorId, bookingDate, selectedTimeSlot, patientName, patientEmail, patientContact) {

    if (bookingDate === "") {
        alert("Please Select a Date");
    } else if (selectedTimeSlot === "") {
        alert("please select a timeslot");
    } else if (patientName === "") {
        alert("Please enter your name")
    } else if (patientEmail === "" | patientEmail.split('@').length != 2) {
        alert("please enter correct email")
    } else if (patientContact === "" | patientContact.match(/^[0-9]+$/) === null | patientContact.length < 10) {
        alert(" please Enter correct contact")
    } else {
        let data = {
            doctor_id: currentDoctorId,
            date: bookingDate,
            time_slot: selectedTimeSlot,
            patient_name: patientName,
            patient_email: patientEmail,
            patient_contact: patientContact,
        };
        const body = JSON.stringify(data);
        const res = await axios.post(Request.bookAppointment, body, config);
        alert(res.data.message);
    }

}


export function getToday() {
    let today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate();
    if (parseInt(dd) < 10) {
        dd = "0" + dd;
    }
    mm = today.getMonth() + 1;
    if (parseInt(mm) < 10) {
        mm = "0" + mm;
    }
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}