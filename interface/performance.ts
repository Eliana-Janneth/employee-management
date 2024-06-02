    export interface PerformanceBody {
        initialDate: string;
        finalDate: string;
        description: string;
        improvementOpportunities: string;
        calification: number;
        employeeId: string;
        userId: string | null;
    }

    export interface Performance {
        id: string;
        initialDate: string;
        finalDate: string;
        calification: number;
        improvementOpportunities: string;
        createdBy: {
            name: string;
            
        };
    }