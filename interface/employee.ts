interface Employee {
    address: string;
    baseSalary: number;
    createdAt: string; 
    createdBy: {
        id: string;
        name: string;
        email: string;
    };
    email: string;
    id: string;
    name: string;
    phone: string;
    updatedAt: string; 
    userId: string;
}

interface EmployeeData {
    data: {
        employees: Employee[];
    };
}
