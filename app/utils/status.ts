export enum Status {
  UNKNOWN,
  OPERATIONAL,
  PARTIALLY_OUT,
  COMPLETELY_OUT,
  MAINTENANCE
}

export interface DayStatusData {
  date: Date | string;
  status: Status;
  comment: string;
}

export const mapStatus = (s: Status) => {
  switch (s) {
    case Status.OPERATIONAL: return "operational";
    case Status.PARTIALLY_OUT: return "partially-out";
    case Status.COMPLETELY_OUT: return "completely-out";
    case Status.MAINTENANCE: return "maintenance";
    default: return "unknown";
  }
};