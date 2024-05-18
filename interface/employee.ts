export interface Employee {
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

export interface EmployeeData {
    data: {
        employees: Employee[];
    };
}

export interface EmployeeBody {
    id: string,
    name: string,
    baseSalary: number,
    phone: string,
    email: string,
    address: string,
    userId: string
}

export interface EmployeeUpdate {
    id: string,
    baseSalary: number,
    phone: string,
    email: string,
    address: string,
}

