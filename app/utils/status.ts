export enum Status {
  UNKNOWN,
  OPERATIONAL,
  PARTIALLY_OUT,
  COMPLETELY_OUT
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
    default: return "unknown";
  }
};