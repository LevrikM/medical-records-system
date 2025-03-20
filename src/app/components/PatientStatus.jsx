"use client";
import { useState } from "react";

const PatientStatus = ({ status, lastVisit, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = () => {
    const newStatus = currentStatus === "Здоровий" ? "Хворий" : "Здоровий";
    setCurrentStatus(newStatus);
    onUpdateStatus(newStatus);
  };

  return (
    <div className="patient-status">
      <p>Статус: {currentStatus}</p>
      <p>Останній візит: {lastVisit}</p>
      <button onClick={handleChange}>Оновити статус</button>
    </div>
  );
};

export default PatientStatus;
