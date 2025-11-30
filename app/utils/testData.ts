export function generateRandomTestData(count: number = 60): DayStatusData[] {
  const comments = [
    "All systems operational",
    "Partial outage in region <a href='/#222'>#222</a>",
    "Major service disruption",
    "Recovered",
    "Minor latency issues",
    "Intermittent connectivity",
    "Scheduled maintenance",
    "Unexpected downtime detected",
    "Resolved earlier issue",
    "Monitoring ongoing incident"
  ];

  const data: DayStatusData[] = [];
  const today = new Date();

  const weightedStatuses: Status[] = [
    Status.OPERATIONAL, Status.OPERATIONAL, Status.OPERATIONAL, Status.OPERATIONAL,
    Status.OPERATIONAL, Status.OPERATIONAL, Status.OPERATIONAL,

    Status.PARTIALLY_OUT, Status.PARTIALLY_OUT,

    Status.COMPLETELY_OUT,
    Status.MAINTENANCE,
  ];

  for (let i = 0; i < count; i++) {
    const randomStatus =
      weightedStatuses[Math.floor(Math.random() * weightedStatuses.length)] as Status;

    const randomComment =
      comments[Math.floor(Math.random() * comments.length)] as string;

    const date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date,
      status: randomStatus,
      comment: randomComment
    });
  }

  return data;
}
