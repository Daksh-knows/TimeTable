import React, { useState } from "react";
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import HoverButton from "./HoverButton";
const AttendanceTracking = ({course_id}) => {
  // State to hold form data
  const [lecNo, setLecNo] = useState("");
  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const [csvData, setCsvData] = useState([]);

    const handleFileUpload = (e) => {
        e.preventDefault()

        console.log("started handling..")
        if (file) {
            const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Get the first sheet name
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert the first sheet to CSV
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      // Use PapaParse to parse the CSV data
      Papa.parse(csv, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true, // Skip empty lines
        complete: (result) => {
          // Set the parsed data to state
          setCsvData(result.data);
          console.log('Parsed CSV Data:', result.data);
          sendDataToBackend(result.data);
        },
        error: (error) => {
          console.error('Error parsing CSV data:', error);
        }
      });
    };

    reader.onerror = (error) => {
      console.error('Error reading Excel file:', error);
    };

    reader.readAsArrayBuffer(file);
  

        }
        setLecNo("");
        setFile(null);
        
    };

    const sendDataToBackend = (data) => {
        // setCourse(course_id)
        console.log("started sending..")
        fetch('http://localhost:5000/update-attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                attendanceData: data,
                lecture_no: lecNo, // Replace with the actual lecture_id
                course_id: course_id   // Replace with the actual course_id
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Successfully sent data to backend:', data);
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        });
    };

  // Handler for form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Create form data to send to the backend
//     const formData = new FormData();
//     formData.append("lecNo", lecNo);
//     // formData.append("date", date);
//     // formData.append("course", course);
//     formData.append("file", file);

//     // Display form data for now
//     console.log("Lecture Number:", lecNo);
//     console.log("Date:", date);
//     console.log("Course:", course);
//     console.log("File:", file);

//     alert("Attendance data submitted successfully!");

//     // Clear form fields after submission
//     setLecNo("");
//     // setDate("");
//     setCourse("");
//     setFile(null);
//     document.getElementById("fileInput").value = ""; // Clear file input
//   };

  // Handler for file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container">
      {/* <h2>Attendance Tracking</h2> */}
      <form onSubmit={handleFileUpload}>
        <div className="form-group">
          <label>Lecture Number:</label>
          <input
            type="text"
            value={lecNo}
            onChange={(e) => setLecNo(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div> */}
        {/* <div className="form-group">
          <label>Course:</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select Course</option>
            <option value="math101">Math 101</option>
            <option value="cs201">Computer Science 201</option>
            <option value="eng301">English 301</option>
          </select>
        </div> */}
        <div className="form-group">
          <label>Upload Attendance CSV:</label>
          <input
            type="file"
            id="fileInput"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
            <HoverButton type={"submit"} text={"Submit Attendance"} color={"#2c3e50"}/>
          {/* <button type="submit" className="btn">
            Submit Attendance
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AttendanceTracking;
