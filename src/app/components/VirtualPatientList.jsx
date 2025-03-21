"use client";

import { useState, useEffect, useCallback } from "react";
import { Grid } from "react-virtualized";
import PatientCard from "./PatientCard";

const COLUMN_COUNT = 4; // patients count in a row
const COLUMN_WIDTH = 280;
const ROW_HEIGHT = 220;
const GRID_WIDTH = COLUMN_WIDTH * COLUMN_COUNT + 20;
const GAP = 20; // ??????????????

const VirtualPatientList = ({ patients, onUpdateStatus, gridRef }) => {
  const [visiblePatients, setVisiblePatients] = useState([]); // mass for patients
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (patients.length > 0) {
      setVisiblePatients(patients.slice(0, 12)); // first 12  : 20g
    }
  }, [patients]); 

  const loadMorePatients = useCallback(() => {
    if (isLoading || visiblePatients.length >= patients.length) return;

    setIsLoading(true);

    setTimeout(() => {
      const nextBatch = patients.slice(visiblePatients.length, visiblePatients.length + 12); 
      setVisiblePatients((prev) => [...prev, ...nextBatch]);

    //   setVisiblePatients((prev) => []);
      
      setIsLoading(false);
    }, 500); 
  }, [patients, visiblePatients, isLoading]);

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    if (scrollHeight - scrollTop === clientHeight) {
      loadMorePatients();
    }
  };

  return (
    <Grid
      ref={gridRef} 
      cellRenderer={({ columnIndex, key, rowIndex, style }) => {
        const patientIndex = rowIndex * COLUMN_COUNT + columnIndex;
        if (patientIndex >= visiblePatients.length) return null;

        const patient = visiblePatients[patientIndex];

        return (
          <div
            key={key}
            style={{
              ...style,
              marginBottom: GAP, 
              marginRight: columnIndex === COLUMN_COUNT - 1 ? 0 : GAP,
              boxSizing: "border-box",
            }}
          >
            Пацієнт: 
            <PatientCard
              id={patient.id}
              name={patient.name}
              age={patient.age}
              diagnosis={patient.diagnosis}
              status={patient.status}
              onUpdateStatus={onUpdateStatus}
            />
          </div>
        );
      }}
      columnCount={COLUMN_COUNT}
      columnWidth={COLUMN_WIDTH}
      height={600}
      rowCount={Math.ceil(visiblePatients.length / COLUMN_COUNT)}
      rowHeight={ROW_HEIGHT} 
      width={GRID_WIDTH}
      onScroll={handleScroll} 
    />
  );
};

export default VirtualPatientList;
