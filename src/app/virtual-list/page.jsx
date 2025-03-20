"use client";

import dynamic from "next/dynamic";

const VirtualPatientList = dynamic(() => import("../components/VirtualPatientList"), {
  ssr: false, 
});

const largePatientsData = new Array(200).fill(null).map((_, index) => ({
  id: index,
  name: `Пацієнт ${index + 1}`,
  age: Math.floor(Math.random() * (80 - 18 + 1)) + 18,
  diagnosis: index % 2 === 0 ? "Грип" : "",
  status: index % 3 === 0 ? "Хворий" : "Здоровий",
}));

export default function VirtualListPage() {
  return (
    <div className="virtual-list-page">
      <h1>Віртуальний список пацієнтів</h1>
      <VirtualPatientList patients={largePatientsData} />
    </div>
  );
}
