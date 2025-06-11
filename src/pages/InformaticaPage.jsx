import { ScheduleView } from "../components/ScheduleView";

export const InformaticaPage = () => {
  const cursos = [
    { label: "Primero", value: "infprimero" },
    { label: "Segundo", value: "infsegundo" },
    { label: "Tercero", value: "inftercero" },
    { label: "Cuarto", value: "infcuarto" }
  ];

  return (
    <div className="min-h-screen">
      <ScheduleView
        defaultTitulacion="inform"
        titulacion="Grado en Ingeniería Informática"
        cursos={cursos}
      />
    </div>
  );
};