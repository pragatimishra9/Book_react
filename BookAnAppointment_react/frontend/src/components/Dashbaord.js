import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Request from '../Actions/Request';
import { updateDoctorInfo, filterAppointmentData, updateAppointment } from '../Services/DashboardServices';

function Dashbaord() {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [period, setPeriod] = useState("15 Min");
    const [currentDate, setCurrentDate] = useState("");
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        async function getDoctorData() {

            const data = {
                user: localStorage.getItem('userEmail'),
                type: 'info'
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify(data);
            const res = await axios.post(Request.doctorInfo, body, config);
            const st = res.data.doctor.day_start_time;

            if (st !== null) {

                setStartTime(res.data.doctor.day_start_time);
                setEndTime(res.data.doctor.day_end_time);
                setPeriod(res.data.doctor.appointment_slot_time);
            }



        }
        let today = new Date();
        let date = today.getDate();
        if (date < 10) {
            date = `0${date}`
        }
        let month = today.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`
        }
        let year = today.getFullYear();
        setCurrentDate(`${year}-${month}-${date}`)
        getDoctorData();


    }, []);


    return (
        <div>
            <Navbar />
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-3'>
                        <div class="input-group mb-3  border border-info border-1 rounded">
                            <span class="input-group-text" >Start Time</span>
                            <input type="time" class="form-control" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} />
                        </div>
                    </div>
                    <div className='col-3'>
                        <div class="input-group mb-3 border border-warning border-1 rounded">
                            <span class="input-group-text" >End Time</span>
                            <input type="time" class="form-control" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} />
                        </div>
                    </div>
                    <div className='col-3'>

                        <select class="form-select mb-3 border border-danger border-1 rounded" onChange={(e) => { setPeriod(e.target.value) }}>

                            <option value="15 Min">15 Min</option>
                            <option value="30 Min">30 Min</option>
                            <option value="45 Min">45 Min</option>
                            <option value="60 Min">60 Min</option>
                        </select>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-sm btn-warning' onClick={() => updateDoctorInfo(startTime, endTime, period)}> Update</button>
                    </div>
                </div>

                <div className='row mt-5'>
                    <div className='col-4'>
                        <input type="date" class="form-control" value={currentDate} onChange={(e) => { setCurrentDate(e.target.value) }} />
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-outline-primary btn-sm' onClick={(e) => filterAppointmentData(currentDate, setAppointments)}>Filter</button>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Time Slot</th>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => {
                                return (
                                    <tr>
                                        <th scope="row">{appointment.id}</th>
                                        <td>{appointment.patient_name}</td>
                                        <td>{appointment.patient_email}</td>
                                        <td>{appointment.patient_contact}</td>
                                        <td>{appointment.appointment_time}</td>
                                        <td>{appointment.appointment_status}</td>
                                        {appointment.appointment_status === 'Open' ? <td><button className='btn btn-outline-warning m-1' onClick={() => updateAppointment(appointment.id, "Closed", appointments, setAppointments)}>Closed</button><button className='btn btn-outline-danger m-1' onClick={() => updateAppointment(appointment.id, "Canceled", appointments, setAppointments)}>Cancel</button></td> : ""}
                                        {appointment.appointment_status === 'Closed' | appointment.appointment_status === 'Canceled' ? <td><button className='btn btn-outline-primary m-1' onClick={() => updateAppointment(appointment.id, "Open", appointments, setAppointments)}>Open</button></td> : ""}

                                    </tr>
                                );
                            })}


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Dashbaord;
