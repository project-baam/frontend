export type Agenda = {
  id: string;
  color: string;
  date: string;
  memo: string;
  dayOfWeek: string;
  duration: string;
  hour: string;
  key: "school_event" | "class_schedule" | "personal_event";
  title: string;
};
