import LazyPatientInfo from "../components/LazyPatientInfo";

export default function LazyPatientPage() {
  return (
    <div className="lazy-patient-page">
      <h1>Ліниве завантаження пацієнта</h1>
      <LazyPatientInfo age={30} diagnosis="Грип" status="Хворий" />
    </div>
  );
}
