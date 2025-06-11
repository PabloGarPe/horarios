import { ScheduleView } from "../components/ScheduleView";

export const MatesFisPage = () => {
  const cursos = [
    { label: "Primero", value: "matfisprimero" },
    { label: "Segundo", value: "matfissegundo" },
    { label: "Tercero", value: "matfistercero" },
    { label: "Cuarto", value: "matfiscuarto" },
    { label: "Quinto", value: "matfisquinto" }
  ];

  return (
    <div className="min-h-screen">
      <ScheduleView
        defaultTitulacion="matesfis"
        titulacion="Doble Grado en Matemáticas y Física"
        cursos={cursos}
      />
    </div>
  );
};