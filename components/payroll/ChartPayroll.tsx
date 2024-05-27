import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

interface ChartPayrollProps {
    hours: any;
}
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

export const ChartPayroll = ({ hours }: ChartPayrollProps) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nameMonth = months[new Date().getMonth()];

    const data = {
        labels: hours?.map((date: any) => date.date.split('-')[2]),
        datasets: [
            {
                label: 'Horas',
                data: hours?.map((hour: any) => hour.hours),
                fill: false,
                backgroundColor: 'rgb(177,30, 20)',
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
                text: `Horas tabajadas en el mes de ${nameMonth}`,
            },

        },
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );

}