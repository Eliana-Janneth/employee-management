export interface HourReportBody {
    initialHour: string;
    finalHour: string;
    date: string;
    userId: string | null;
    employeeId: string | null;
}