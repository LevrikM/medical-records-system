"use client";

import { useRouter } from "next/navigation"; // router

const PatientCard = ({ id, name, age, diagnosis, status, onUpdateStatus }) => {
  const router = useRouter();

  const handlePatientClick = () => {
    router.push(`/patient-info/${id}`); 
  };

  return (
    <div className="patient-card">
      <h2>{name}</h2>
      <button onClick={handlePatientClick}>Переглянути інформацію</button>
    </div>
  );
};

export default PatientCard;
