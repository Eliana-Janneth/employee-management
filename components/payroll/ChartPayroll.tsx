import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Hour } from '@/interface/Payroll';

interface ChartPayrollProps {
    hours: Hour[];
}
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

export const ChartPayroll = ({ hours }: ChartPayrollProps) => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nameMonth = months[new Date().getMonth()];

    const data = {
        labels: hours?.map((date) => date.date.split('-')[2]),
        datasets: [
            {
                label: 'Horas',
                data: hours?.map((hour) => hour.hours),
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
        <>
            {
                hours && hours.length ? (
                    <div>
                        <Bar data={data} options={options} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-72">
                        <h2 className="text-lg text-gray-500">No hay datos para mostrar</h2>
                    </div>
                )
            }
        </>
    );
}