import axios from 'axios';
import Request from '../Actions/Request';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { config } from '../Services/Constants';

export async function getFilterData(currentFilterDate, setDetailedReport, setSummaryReport) {
    const data = {
        user: localStorage.getItem('userEmail'),
        filterDate: currentFilterDate
    }
    const body = JSON.stringify(data);
    const res = await axios.post(Request.filterAppointment, body, config);
    if (res.data.status === 200) {
        setDetailedReport(res.data.appointments)
        let uniqueDates = []
        for (let index = 0; index < res.data.appointments.length; index++) {
            if (uniqueDates.includes(res.data.appointments[index].appointment_date)) {

            } else {
                uniqueDates.push(res.data.appointments[index].appointment_date);
            }
        }
        let tempReport = []
        for (let index = 0; index < uniqueDates.length; index++) {
            let total = 0;
            let closed = 0;
            let canceled = 0;
            for (let index1 = 0; index1 < res.data.appointments.length; index1++) {
                if (res.data.appointments[index1].appointment_date === uniqueDates[index]) {
                    total++;
                    if (res.data.appointments[index1].appointment_status === "Closed") {
                        closed++;
                    }
                    if (res.data.appointments[index1].appointment_status === "Canceled") {
                        canceled++;
                    }

                }
            }
            let temp = {
                date: uniqueDates[index],
                total: total,
                closed: closed,
                canceled: canceled,
            }
            tempReport.push(temp)
        }
        setSummaryReport(tempReport);
    }
    else {
        alert(res.data.error);
    }
}

export function generatePDF(detailedReport, summaryReport) {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Detailed Report";
    const headers = [["Date", "Patient Name", "Status"]];

    const data = detailedReport.map(elt => [elt.appointment_date, elt.patient_name, elt.appointment_status]);

    let content = {
        startY: 50,
        head: headers,
        body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Detailed_report.pdf")

    const doc2 = new jsPDF(orientation, unit, size);
    doc2.setFontSize(15);
    const stitle = "Summary Report";
    const sheaders = [["Date", "# Appointments", "# Closed", "# Canceled"]];

    const sdata = summaryReport.map(elt => [elt.date, elt.total, elt.closed, elt.canceled]);

    let scontent = {
        startY: 50,
        head: sheaders,
        body: sdata
    };

    doc2.text(stitle, marginLeft, 40);
    doc2.autoTable(scontent);
    doc2.save("Summary_report.pdf")
}
