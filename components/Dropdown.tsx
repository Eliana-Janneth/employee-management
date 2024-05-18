import Spinner from "./Spinner";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface DropdownProps {
    placeholder?: string;
    options?: any[];
    loading?: boolean;
    action?: (value: any, alternativeParam?: any) => void;
    styles?: string;
}

const Dropdown = ({ placeholder, options, action, loading, styles }: DropdownProps) => {
    const [selected, setSelected] = useState<string>(
        placeholder ?? "Selecciona una opción"
    );
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSelection = (option: any) => {
        setSelected(option.name ?? "");
        setOpen(false);
        action?.(option);
    };

    const filteredOptions = options?.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full relative">
            <div
                className={`${styles ?? 'bg-gray-100 p-2 rounded-lg'} flex justify-between items-center cursor-pointer h-full`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 text-xs text-gray-500 bg-gray-100 font-medium border-none outline-none focus:ring-0"
                />
                <MdOutlineArrowBackIosNew
                    className={`transition-all ${open ? "-rotate-[270deg]" : "-rotate-90"}`}
                />
            </div>
            <div
                className={`absolute top-[100%] bg-white p-1 rounded-lg z-10 shadow-md w-full space-y-2 overflow-y-auto max-h-52 ${open ? "block" : "hidden"}`}
            >
                {loading ? (
                    <Spinner />
                ) : (
                    filteredOptions && filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                                onClick={() => handleSelection(option)}
                            >
                                <span className="block font-semibold text-xs">{option.name}</span>
                                {option.subName && (
                                    <span className="block text-[0.7rem]">( {option.subName} )</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-xs text-gray-500 px-2 py-1">No se encontraron resultados</div>
                    )
                )}
            </div>
        </div>
    );
};

export default Dropdown;
