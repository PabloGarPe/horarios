export interface ScheduleEntry {
    Day: string;
    Start: string;
    End: string;
    Subject: string;
    Room: string;
  }

export interface ProcessedEntry extends ScheduleEntry {
    Week: string;
}