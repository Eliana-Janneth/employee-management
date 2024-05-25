import { GET_EMPLOYEES_BY_ID } from "@/hooks/react-query/query/employee";
import { useQuery } from "@apollo/client";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

interface ChartPayrollProps {
    idEmployee: string | null;
}
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

export const ChartPayroll = ({ idEmployee }: ChartPayrollProps) => {

    // const { data: employees, loading } = useQuery(GET_EMPLOYEES_BY_ID, {
    //     variables: { id: idEmployee }
    // });
    const generateDayLabels = (month: number, year: number): string[] => {
        const numberOfDaysInMonth = new Date(year, month, 0).getDate();
        const labels: string[] = [];

        for (let day = 1; day <= numberOfDaysInMonth; day++) {
            const date = new Date(year, month - 1, day); 
            const formattedDate = format(date, 'dd/MM');
            labels.push(formattedDate);
        }

        return labels;
    };

    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear(); 

    const labels = generateDayLabels(currentMonth, currentYear);

    const data = {
        labels: labels, // Utiliza las etiquetas generadas dinámicamente
        datasets: [
            {
                label: 'Horas',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Horas trabajadas por mes',
            },

        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );

}