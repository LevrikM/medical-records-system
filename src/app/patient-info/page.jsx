"use client";

import PatientCard from "../components/PatientCard";

const patientData = {
  name: "Іван Іванов",
  age: 33,
  diagnosis: "Гіпертонія",
  status: "Здоровий",
};

const PatientInfoPage = () => {
  return (
    <div className="patient-info-page">
      <h1>Інформація про пацієнта</h1>
      <PatientCard {...patientData} />
    </div>
  );
};

export default PatientInfoPage;
