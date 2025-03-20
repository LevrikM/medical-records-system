"use client";
import { lazy, Suspense } from "react";

const PatientInfo = lazy(() => import("./PatientCard"));

const LazyPatientInfo = ({ age, diagnosis, status }) => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <PatientInfo age={age} diagnosis={diagnosis} status={status} />
    </Suspense>
  );
};

export default LazyPatientInfo;
