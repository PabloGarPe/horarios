import { ScheduleView } from "../components/ScheduleView";

export const FisimatesPage = () => {
  const cursos = [
    { label: "Primero", value: "fismatprimero" },
    { label: "Segundo", value: "fismatsegundo" },
    { label: "Tercero", value: "fismattercero" },
    { label: "Cuarto", value: "fismatcuarto" },
    { label: "Quinto", value: "fismatquinto" }
  ];

  return (
    <div className="min-h-screen">
      <ScheduleView
        defaultTitulacion="fisimates"
        titulacion="Doble Grado en Física y Matemáticas"
        cursos={cursos}
      />
    </div>
  );
};