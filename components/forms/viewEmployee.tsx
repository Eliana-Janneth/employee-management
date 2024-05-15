import { GET_EMPLOYEE } from "@/hooks/react-query/employee/query/employee";
import { useQuery } from "@apollo/client";

interface ViewEmployeeProps {
    idEmployee: any;
}

export const ViewEmployee = ({ idEmployee }: ViewEmployeeProps) => {
    const { data, loading, error } = useQuery(GET_EMPLOYEE, {
        variables: { id: idEmployee }
    });
    console.log(data);

    return (
        <div className=" space-y-8">
            <p className="flex items-start -mx-2">
            <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-400 w-min">
                {data?.employee.createdAt}
              </span>
          </p>
            <p className="flex items-start -mx-2">
              
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    {data?.employee.name}
                </span>
                <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-green-400 w-min">
                   $ {data?.employee.baseSalary}
                </span>
            </p>
            <p className="flex items-start -mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">
                    {data?.employee.address}
                </span>
            </p>

            <p className="flex items-start -mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>

                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">{data?.employee.phone}</span>
            </p>

            <p className="flex items-start -mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>

                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">{data?.employee.email}</span>
            </p>
            <p className="flex flex-col items-start -mx-2">
             
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">Registrado Por: {data?.employee.createdBy.name}</span>
                <span className="mx-2 text-gray-700 truncate w-72 dark:text-gray-400">{data?.employee.createdBy.email}</span>

            </p>
        </div>
    )
}