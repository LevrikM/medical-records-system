"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { useFetchData } from "../hooks/useFetchData"; 

const PatientInfo = ({ id, name, age, diagnosis, status, onUpdateStatus }) => {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(diagnosis);
  const [patientStatus, setPatientStatus] = useState(status);
  const [isSaving, setIsSaving] = useState(false);  
  const router = useRouter();

  const handlePatientClick = () => {
    router.push(`/patient-info/${id}`); 
  };

  const handleStatusChange = (newStatus) => {
    setPatientStatus(newStatus);
    if (onUpdateStatus) onUpdateStatus(id, newStatus); 
  };

  const handleDiagnosisChange = (event) => {
    setSelectedDiagnosis(event.target.value); 
  };


  const { data, loading, error } = useFetchData(`/patients.json`);


  const handleSave = async () => {
    setIsSaving(true);

    const updatedPatient = {
      id,
      name,
      age,
      diagnosis: selectedDiagnosis,
      status: patientStatus,
    };

    const { data: savedData, error: saveError } = useFetchData("/patients.json", "POST", updatedPatient);

    if (saveError) {
      alert("Помилка при збереженні даних");
    } else {
      alert("Дані успішно збережено");
    }

    setIsSaving(false);
  };

  return (
    <div className="patient-card" style={styles.card}>
      <h2>{name}</h2>
      <p><strong>Вік:</strong> {age}</p>
      <p><strong>Діагноз:</strong> 
        <select
          value={selectedDiagnosis}
          onChange={handleDiagnosisChange}
          style={styles.select}
        >
          <option value="Грип">Грип</option>
          <option value="Захворювання серця">Захворювання серця</option>
          <option value="Без діагнозу">Без діагнозу</option>
        </select>
      </p>
      <p><strong>Статус:</strong> {patientStatus}</p>
      <div style={styles.buttonsContainer}>
        <button 
          style={styles.button}
          onClick={() => handleStatusChange("Хворий")}
        >
        Хворий
        </button>
        <button 
          style={styles.button}
          onClick={() => handleStatusChange("Здоровий")}
        >
        Здоровий
        </button>
      </div>
      <button 
        style={styles.saveButton}
        onClick={handleSave}
        disabled //</div>={isSaving} 
      >
       {isSaving ? "Зберігається..." : "Зберегти(disabled now)"}
      </button>
    </div>
  );
};


const styles = {
  card: {
    padding: "20px",
    maxWidth: "280px",
    margin: "10px auto",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  select: {
    width: "100%",
    padding: "5px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttonsContainer: {
    marginTop: "10px",
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "5px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  viewButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  saveButton: {
    marginTop: "10px",
    padding: "10px 20px",
    //backgroundColor: "#28a745",
    backgroundColor: "black",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    
  },
};

export default PatientInfo;
