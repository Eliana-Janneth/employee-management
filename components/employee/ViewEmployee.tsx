import { GET_EMPLOYEE } from "@/hooks/react-query/employee/query/employee";
import { useQuery } from "@apollo/client";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

interface ViewEmployeeProps {
    idEmployee: any;
}

export const ViewEmployee = ({ idEmployee }: ViewEmployeeProps) => {
    const { data } = useQuery(GET_EMPLOYEE, {
        variables: { id: idEmployee }
    });

    const date = new Date(data?.employee.createdAt);

    return (
        <div className=" space-y-8">
            <p className="flex items-start -mx-2">
                <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-400 w-min">
                    {date.toLocaleDateString()}
                </span>
            </p>
            <p className="flex items-start -mx-2">
                <span className="mx-2 text-gray-700 truncate w-72 ">
                    {data?.employee.name}
                </span>
                <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-green-400 w-min font-semibold">
                    $ {data?.employee.baseSalary}
                </span>
            </p>
            <p className="flex items-start -mx-2">
                <IoLocationOutline className="text-blue-400 w-7 h-7" />
                <span className="mx-2 text-gray-900 truncate w-72 ">
                    {data?.employee.address}
                </span>
            </p>

            <p className="flex items-start -mx-2">
                <FiPhone className="text-blue-400 w-7 h-7" />
                <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.phone}</span>
            </p>

            <p className="flex items-start -mx-2">
                <MdOutlineMail className="text-blue-400 w-7 h-7" />
                <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.email}</span>
            </p>
            <p className="flex flex-col items-start -mx-2">
                <span className="mx-2 text-gray-700 truncate w-72 "><strong>Registrado Por:</strong> {data?.employee.createdBy.name}</span>
                <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.createdBy.email}</span>
            </p>
        </div>
    )
}