import { FaWindowClose } from "react-icons/fa";
interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    closeModalTable?: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, closeModal, children, closeModalTable }: ModalProps) => {
    return (
        <div>
            {isOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-2 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="hidden sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button type="button"
                                    onClick={() => {
                                        closeModal();
                                        if (closeModalTable) {
                                            closeModalTable();
                                        }
                                    }}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-[#e74c4c] focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm">
                                    <FaWindowClose />

                                </button>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                {children}
                            </div>

                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
};
