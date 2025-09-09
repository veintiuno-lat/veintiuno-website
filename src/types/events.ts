export interface Event {
  title: string;
  isChecked: boolean;
}

export interface MonthEvent {
  month: string;
  year: number;
  events: Event[];
}

