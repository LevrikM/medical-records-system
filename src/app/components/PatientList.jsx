import { useRef } from 'react';
import VirtualPatientList from './VirtualPatientList';
import useFetchData from '../hooks/useFetchData';

export default function PatientList() {
  const inputRef = useRef(null); 

  const { data, loading, error } = useFetchData('/patients.json'); 


  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Список пацієнтів</h1>
      <input ref={inputRef} type="text" placeholder="Пошук пацієнта" />
      <VirtualPatientList patients={data} />
    </div>
  );
}
