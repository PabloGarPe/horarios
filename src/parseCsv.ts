import Papa from "papaparse";
import { parse, format, startOfWeek } from "date-fns";
import { ProcessedEntry, ScheduleEntry } from "./interface";

export const parseAndSortCSV = (csvString: string): { [key: string]: ProcessedEntry[] } => {
    // Parsear el CSV
      const parsedData = Papa.parse<ScheduleEntry>(csvString, {
        header: true,
        skipEmptyLines: true,
      });
    
      // Convertir y ordenar los datos
      const processedData = parsedData.data
        .filter(entry => entry.Day && entry.Start && entry.End) // Filtra registros incompletos
        .map((entry) => {
          try {
            const parsedDate = parse(entry.Day.trim(), "dd/MM/yyyy", new Date());
            if (isNaN(parsedDate.getTime())) {
              console.warn("Fecha inválida:", entry.Day);
              return null;
            }
            const weekStart = startOfWeek(parsedDate, { weekStartsOn: 1 }); // Lunes como inicio de semana
    
            return {
              ...entry,
              Day: format(parsedDate, "yyyy-MM-dd"), // Formato ISO para comparación correcta
              Week: format(weekStart, "yyyy-MM-dd"),
            };
          } catch (error) {
            console.error("Error al procesar entrada:", entry, error);
            return null;
          }
        })
        .filter((entry): entry is ProcessedEntry => entry !== null); // Eliminar entradas nulas
    
      // Ordenar por día y hora de inicio
      processedData.sort((a, b) => {
        const dateComparison = new Date(a.Day).getTime() - new Date(b.Day).getTime();
        if (dateComparison !== 0) {
          return dateComparison;
        }
        return a.Start.localeCompare(b.Start);
      });
    
      // Agrupar los datos por semana
      const groupedData: { [key: string]: ProcessedEntry[] } = {};
      processedData.forEach(entry => {
        if (!groupedData[entry.Week]) {
          groupedData[entry.Week] = [];
        }
        groupedData[entry.Week].push(entry);
      });
    
      return groupedData;
    }