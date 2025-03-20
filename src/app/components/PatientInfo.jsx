"use client";
import { useState } from "react";
import PatientStatus from "./PatientStatus";

const PatientInfo = ({ age, diagnosis, status }) => {
  const [patientStatus, setPatientStatus] = useState(status);

  return (
    <div className="patient-info">
      <p>Вік: {age}</p>
      <p>Діагноз: {diagnosis}</p>
      <PatientStatus status={patientStatus} lastVisit="10.03.2025" onUpdateStatus={setPatientStatus} />
    </div>
  );
};

export default PatientInfo;
