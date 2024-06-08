import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Spinner } from '@/components/Spinner';

/*
    Interfaz para las opciones del dropdown.
    name: Nombre de la opción.
    subName: Subnombre de la opción.
*/
interface Option {
    name: string;
    subName?: string;
}

/*
    Props para el componente de dropdown.
    placeholder: Texto que se muestra en el input.
    options: Lista de opciones.
    loading: Estado de carga.
    action: Función que se ejecuta al seleccionar una opción.
    styles: Estilos personalizados.
*/
interface DropdownProps {
    placeholder?: string;
    options?: Option[];
    loading?: boolean;
    action?: (value: Option, alternativeParam?: unknown) => void;
    styles?: string;
}

/*
    Componente de dropdown que se usa para seleccionar una opción de una lista.
*/
export const Dropdown: React.FC<DropdownProps> = ({ placeholder, options, action, loading, styles }: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSelection = (option: Option) => {
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
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setOpen((prev) => !prev);
                    }
                }}
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
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelection(option);
                                    }
                                }}
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
