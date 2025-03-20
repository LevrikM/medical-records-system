"use client";

const PatientCard = ({ name, age, diagnosis, status }) => {
  return (
    <div className="patient-card">
      <h2>{name}</h2>
      <p>Вік: {age}</p>
      {diagnosis ? <p>Діагноз: {diagnosis}</p> : null}
      <p>Статус: {status}</p>
    </div>
  );
};

export default PatientCard;
