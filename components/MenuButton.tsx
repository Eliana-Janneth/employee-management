interface MenuButtonProps {
    icon: React.ElementType;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export const MenuButton = ({ icon: Icon, label, selected, onClick }: MenuButtonProps) => {
    return(
        <button
            className={`inline-flex items-center h-12 px-2 py-2 text-center text-[#b22323] border ${selected ? 'bg-[#b22323] text-red-200' : 'bg-transparent'} hover:text-[#f27777] border-b-0 border-[#b22323] sm:px-4 rounded-t-md whitespace-nowrap focus:outline-none hover:border-[#f27777]`}
            onClick={onClick}
        >
            <Icon size={30} />
            <span className="mx-1 text-sm sm:text-base">{label}</span>
        </button>
    );
}