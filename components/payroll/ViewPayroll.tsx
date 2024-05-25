import { GET_EMPLOYEES_BY_ID } from "@/hooks/react-query/query/employee";
import { useQuery } from "@apollo/client";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

interface ViewPayrollProps {
    idEmployee: string | null;
}

export const ViewPayroll = ({ idEmployee }: ViewPayrollProps) => {

   
    


    
    return (
        <div>
            hOLA
        </div>
    );

}