import { ScheduleView } from "../components/ScheduleView";

export const InfomatesPage = () => {
  const cursos = [
    { label: "Primero", value: "infmatprimero" },
    { label: "Segundo", value: "infmatsegundo" },
    { label: "Tercero", value: "infmattercero" },
    { label: "Cuarto", value: "infmatcuarto" },
    { label: "Quinto", value: "infmatquinto" }
  ];

  return (
    <div className="min-h-screen">
      <ScheduleView
        defaultTitulacion="infomates"
        titulacion="Doble Grado en Informática y Matemáticas"
        cursos={cursos} // Asegúrate de que esto esté presente
      />
    </div>
  );
};