export interface Event {
  title: string;
  isChecked: boolean;
}

export interface TimelineEvent {
  year: number;
  month: string;
  periodType: "Q" | "H" | "Y";
  periodNumber: number;
  isChecked: boolean;
  events: Event[];
}

export const events: TimelineEvent[] = [
  {
    year: 2025,
    month: "July",
    periodType: "Q",
    periodNumber: 3,
    isChecked: true,
    events: [
      { title: "Reunión con artistas y comunidades", isChecked: true },
      { title: "Diseño de tarjetas", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "August",
    periodType: "Q",
    periodNumber: 3,
    isChecked: true,
    events: [
      { title: "Reclutamiento de ejército", isChecked: true },
      { title: "Formación de escuadrones", isChecked: true },
      { title: "Envío de kit de emergencia", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "September",
    periodType: "Q",
    periodNumber: 3,
    isChecked: true,
    events: [
      { title: "Nodos recibidos", isChecked: true },
      { title: "Stream de hitos de la comunidad", isChecked: true },
      { title: "Exposición de diseños", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "October",
    periodType: "Q",
    periodNumber: 4,
    isChecked: true,
    events: [
      { title: "Envío de tarjetas", isChecked: true },
      { title: "Exhibición en Halloween", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "November",
    periodType: "Q",
    periodNumber: 4,
    isChecked: true,
    events: [
      { title: "LABITCONF (Buenos Aires)", isChecked: true },
      { title: "Adopting Bitcoin (San Salvador)", isChecked: true },
      { title: "Economía Bitcoin (Berlín)", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "December",
    periodType: "Q",
    periodNumber: 4,
    isChecked: true,
    events: [
      { title: "Shipment final", isChecked: true },
      { title: "Stream de fin de año", isChecked: true },
    ],
  },
];
