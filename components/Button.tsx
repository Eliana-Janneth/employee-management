interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    type?: "button" | "submit" | "reset";

}

export const Button = ({ onClick, children, type }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-[#e74c4c] rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80"
        >
            {children}
        </button>
    )
}