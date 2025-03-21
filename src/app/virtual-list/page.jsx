"use client";

import { useEffect, useRef, useState } from "react";  
import { useFetchData } from "../hooks/useFetchData";
import dynamic from "next/dynamic";

const VirtualPatientList = dynamic(() => import("../components/VirtualPatientList"), {
  ssr: false,
});

export default function VirtualListPage() {
  const { data: patients, loading, error, refetch } = useFetchData("/patients.json");

  const gridRef = useRef(null); 
  const [patientList, setPatientList] = useState([]); 

  const handleUpdateStatus = (id, newStatus) => {
    setPatientList(prevList =>
      prevList.map(patient =>
        patient.id === id ? { ...patient, status: newStatus } : patient
      )
    );
  };

  useEffect(() => {
    if (patients) {
      setPatientList(patients);
    }
  }, [patients]);

  useEffect(() => {
    if (gridRef.current && gridRef.current.scrollToRow) {
      gridRef.current.scrollToRow(0);  
    }
  }, [patientList]);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>Помилка: {error}</div>;

  const handleRefetch = async () => {
    await refetch(); 
  };

  return (
    <div className="virtual-list-page">
      <h1>Список пацієнтів (к-сть: {patientList.length})</h1>
      <div>
        <VirtualPatientList 
          ref={gridRef} 
          patients={patientList} 
          onUpdateStatus={handleUpdateStatus} 
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleRefetch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
        Оновити список
        </button>
      </div>
    </div>
  );
}
