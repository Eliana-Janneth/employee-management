
interface InputFieldProps {
    label: string;
    id: string;
    type: string;
    [key: string]: any;
}



export const InputField = ({ label, id, type, ...rest }: InputFieldProps) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-[#f27777] focus:ring-[#f8a9a9] focus:ring-opacity-40 focus:outline-none focus:ring"
                {...rest}
            />
        </div>
    )
}