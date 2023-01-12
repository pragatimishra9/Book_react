import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Request from '../Actions/Request';
import Navbar from './Navbar';
import { config } from '../Services/Constants';
import { fillDoctorBookingDetails, handleSelectedTimeSlot, bookAppointment } from '../Services/HomeServices';


function Home() {
    const [doctors, setDoctors] = useState([]);
    const [currentDoctorId, setCurrentDoctorId] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientEmail, setPatientEmail] = useState("");
    const [patientContact, setPatientContact] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

    useEffect(() => {
        async function getAllDoctors() {
            const res = await axios.get(Request.doctorInfo, config);
            setDoctors(res.data);
        }

        getAllDoctors();

    }, []);



    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <div className='row'>
                    {doctors.map((doctor) => {
                        return (
                            <div className='col-3 mt-3'>
                                <div className='card border border-4'>
                                    <img class="card-img-top w-75 h-50" src="https://i.pinimg.com/originals/9f/32/20/9f3220f4535dd9cd9743b995fdfdeaa1.jpg" />
                                    <div className='card-body'>
                                        <h5 class="card-title">{doctor.name}</h5>
                                        <p class="card-text">Start Time : {doctor.day_start_time} <br /> End Time : {doctor.day_end_time} <br /> Slot Period : {doctor.appointment_slot_time}</p>
                                        <button className='btn btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => fillDoctorBookingDetails(doctor.id, setCurrentDoctorId, setTimeSlots, doctors)}>Book Appointment</button>

                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Enter Your Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Select Date</span>
                                <input type="date" class="form-control" value={bookingDate} onChange={(e) => { setBookingDate(e.target.value) }} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Enter Name</span>
                                <input type="text" class="form-control" value={patientName} onChange={(e) => { setPatientName(e.target.value) }} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Email</span>
                                <input type="email" class="form-control" value={patientEmail} onChange={(e) => { setPatientEmail(e.target.value) }} />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Contact</span>
                                <input type="text" class="form-control" value={patientContact} onChange={(e) => { setPatientContact(e.target.value) }} />
                            </div>
                            <div className='container'>
                                <h5>Selected Time Slot : {selectedTimeSlot}</h5>
                                <div className='row'>

                                    {timeSlots.map((timeslt) => {
                                        return (
                                            <div className='col-4 m-2 border border-3 rounded-pill border-warning'>
                                                <div class="input-group mx-auto">

                                                    <input class="m-2" type="checkbox" value={timeslt} onChange={e => handleSelectedTimeSlot(e, setSelectedTimeSlot)} />
                                                    <span class="input-group-text-4 m-1">{timeslt}</span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-info" onClick={() => bookAppointment(currentDoctorId, bookingDate, selectedTimeSlot, patientName, patientEmail, patientContact)}>Book</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
