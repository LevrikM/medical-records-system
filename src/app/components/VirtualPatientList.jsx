import { Grid } from "react-virtualized";

const COLUMN_COUNT = 5; // count of patients in a row
const COLUMN_WIDTH = 280; 
const ROW_HEIGHT = 180; 
const GRID_WIDTH = COLUMN_WIDTH * COLUMN_COUNT + 20; // totall width

export default function VirtualPatientList({ patients }) {
  return (
    <Grid
      cellRenderer={({ columnIndex, key, rowIndex, style }) => {
        const patientIndex = rowIndex * COLUMN_COUNT + columnIndex;
        if (patientIndex >= patients.length) return null;

        const patient = patients[patientIndex];

        return (
          <div key={key} style={{ ...style, padding: "10px" }}>
            <div className="patient-card">
              <h3>{patient.name}</h3>
              <p>Вік: {patient.age}</p>
              {patient.diagnosis && <p>Діагноз: {patient.diagnosis}</p>}
              <p>Статус: {patient.status}</p>
            </div>
          </div>
        );
      }}
      columnCount={COLUMN_COUNT}
      columnWidth={COLUMN_WIDTH}
      height={600}
      rowCount={Math.ceil(patients.length / COLUMN_COUNT)}
      rowHeight={ROW_HEIGHT}
      width={GRID_WIDTH}
    />
  );
}
