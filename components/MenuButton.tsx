interface MenuButtonProps {
    icon: React.ElementType;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const MenuButton = ({ icon: Icon, label, selected, onClick }: MenuButtonProps) => {
    return(
        <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 border ${selected ? 'bg-gray-200' : 'bg-transparent'} border-b-0 border-gray-300 sm:px-4 rounded-t-md whitespace-nowrap focus:outline-none hover:border-gray-400`}
            onClick={onClick}
        >
            <Icon size={30} />
            <span className="mx-1 text-sm sm:text-base">{label}</span>
        </button>
    );
}