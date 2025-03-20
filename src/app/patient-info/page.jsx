"use client";

import PatientCard from "../components/PatientCard";

const PatientInfoPage = () => {
  return (
    <div className="patient-info-page">
      <h1>Інформація про пацієнта</h1>
      <PatientCard
        name="Іван Іванов"
        age={45}
        diagnosis="Гіпертонія"
        status="Здоровий"
      />
    </div>
  );
};

export default PatientInfoPage;
