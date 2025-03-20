import PatientInfo from './PatientInfo';

const PatientCard = ({ name, age, diagnosis, status }) => {
  return (
    <div className="patient-card">
      <h2>Пацієнт: {name}</h2>
      <PatientInfo age={age} diagnosis={diagnosis} status={status} />
    </div>
  );
};

export default PatientCard;
