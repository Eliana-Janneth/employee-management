export interface HourReportBody {
    initialHour: string;
    finalHour: string;
    date: string;
    userId: string | null;
    employeeId: string | null;
}

export interface Hour{
    id: string;
    hours: string;
    date: string;
    createdBy: {
            name:string;
        }
}