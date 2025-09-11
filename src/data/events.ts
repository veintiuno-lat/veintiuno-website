import { MonthEvent } from "../types/events";

export const events: MonthEvent[] = [
  {
    month: "Julio",
    year: 2025,
    events: [
      { title: "Artists + Communities Meet", isChecked: true },
      { title: "Start Card Design", isChecked: true },
    ],
  },
  {
    month: "Agosto",
    year: 2025,
    events: [
      { title: "Army Recruit", isChecked: true },
      { title: "Squad Formation", isChecked: true },
      { title: "Send Emergency Kit", isChecked: true },
    ],
  },
  {
    month: "Septiembre",
    year: 2025,
    events: [
      { title: "Deploy Nodes", isChecked: false },
      { title: "Community Milestones Stream", isChecked: false },
      { title: "Art Contest (Exhibition)", isChecked: false },
    ],
  },
  {
    month: "Octubre",
    year: 2025,
    events: [
      { title: "Cards Shipment", isChecked: false },
      { title: "Halloween Community Stream", isChecked: false },
    ],
  },
  {
    month: "Noviembre",
    year: 2025,
    events: [
      { title: "SatsConf (Sao Paulo)", isChecked: false },
      { title: "Adopting Bitcoin (San Salvador)", isChecked: false },
      { title: "Economía Bitcoin (Berlín)", isChecked: false },
    ],
  },
  {
    month: "Diciembre",
    year: 2025,
    events: [
      { title: "Mayan Conference*", isChecked: false },
      { title: "Final Shipment", isChecked: false },
      { title: "End of Year Stream", isChecked: false },
    ],
  },
];
