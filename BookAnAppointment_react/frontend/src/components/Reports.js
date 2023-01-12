import React, { useState } from 'react';
import Navbar from './Navbar';
import { getFilterData, generatePDF } from '../Services/ReportServices';

function Reports() {
    const [summaryReport, setSummaryReport] = useState([]);
    const [detailedReport, setDetailedReport] = useState([]);
    const [currentFilterDate, setCurrentFilterDate] = useState("");


    return (
        <div>
            <Navbar />
            <div className='container mt-5'>

                <div className='row'>
                    <div className='col-3'>
                        <input type="month" className='form-control' value={currentFilterDate} onChange={(e) => setCurrentFilterDate(e.target.value)} />
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-outline-warning' onClick={() => getFilterData(currentFilterDate, setDetailedReport, setSummaryReport)}>Filter</button>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-outline-primary' onClick={() => generatePDF(detailedReport, summaryReport)}>Export Report</button>
                    </div>
                </div>

                <div className='row mt-5'>
                    <h5>Summary Report</h5>
                    <table class="table">

                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col"># Appointments</th>
                                <th scope="col"># Closed</th>
                                <th scope="col"># Canceled</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryReport.map((sreport) => {
                                return (
                                    <tr>
                                        <th scope="row">{sreport.date}</th>
                                        <td>{sreport.total}</td>
                                        <td>{sreport.closed}</td>
                                        <td>{sreport.canceled}</td>
                                    </tr>
                                );
                            })}


                        </tbody>
                    </table>
                </div>

            </div>

            <div className='container mt-5'>
                <h5>Detailed Report</h5>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Patient Name</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {detailedReport.map((dreport) => {
                            return (
                                <tr>
                                    <th scope="row">{dreport.appointment_date}</th>
                                    <td>{dreport.patient_name}</td>
                                    <td>{dreport.appointment_status}</td>

                                </tr>
                            );
                        })}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Reports;
