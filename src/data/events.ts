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
      { title: "Artists + Communities Meet", isChecked: true },
      { title: "Start Card Design", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "August",
    periodType: "Q",
    periodNumber: 3,
    isChecked: true,
    events: [
      { title: "Army Recruit", isChecked: true },
      { title: "Squad Formation", isChecked: true },
      { title: "Send Emergency Kit", isChecked: true },
    ],
  },
  {
    year: 2025,
    month: "September",
    periodType: "Q",
    periodNumber: 3,
    isChecked: false,
    events: [
      { title: "Deploy Nodes", isChecked: false },
      { title: "Community Milestones Stream", isChecked: false },
      { title: "Art Contest (Exhibition)", isChecked: false },
    ],
  },
  {
    year: 2025,
    month: "October",
    periodType: "Q",
    periodNumber: 4,
    isChecked: false,
    events: [
      { title: "Cards Shipment", isChecked: false },
      { title: "Halloween Community Stream", isChecked: false },
    ],
  },
  {
    year: 2025,
    month: "November",
    periodType: "Q",
    periodNumber: 4,
    isChecked: false,
    events: [
      { title: "SatsConf (Sao Paulo)", isChecked: false },
      { title: "Adopting Bitcoin (San Salvador)", isChecked: false },
      { title: "Economía Bitcoin (Berlín)", isChecked: false },
    ],
  },
  {
    year: 2025,
    month: "December",
    periodType: "Q",
    periodNumber: 4,
    isChecked: false,
    events: [
      { title: "Mayan Conference*", isChecked: false },
      { title: "Final Shipment", isChecked: false },
      { title: "End of Year Stream", isChecked: false },
    ],
  },
];
