"use client"; 

import { useParams } from 'next/navigation';  
import { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData"; 
import PatientInfo from "../../components/PatientInfo";  

const PatientInfoPage = () => {
  const [isClient, setIsClient] = useState(false);  
  const [patient, setPatient] = useState(null);
  const { data: patients, loading, error } = useFetchData("/patients.json"); 


  useEffect(() => {
    setIsClient(true);
  }, []);

  const { id } = useParams();
  useEffect(() => {
    console.log('ID з useParams:', id); 
  }, [id]);

  useEffect(() => {
    if (!id || loading || error) return; 

    const numericId = Number(id);

    const selectedPatient = patients?.find(patient => patient.id === numericId);
    if (selectedPatient) {
      setPatient(selectedPatient);
    }
  }, [id, patients, loading, error]);

  if (!isClient) return null; 
  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;
  if (!patient) return <div>Пацієнта не знайдено</div>;

  return (
    <div className="patient-info-page" style={{ padding: "50px", maxWidth: "800px", margin: "0 auto", backgroundColor: "white", borderRadius: "11px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2>Інформація про пацієнта:</h2>
      <PatientInfo 
        id={patient.id} 
        name={patient.name} 
        age={patient.age} 
        diagnosis={patient.diagnosis} 
        status={patient.status} 
      />
      <h5>( збереження данних поки не допрацьовано )</h5>
    </div>
  );
};

export default PatientInfoPage;
