import { FaWindowClose } from "react-icons/fa";
import React from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
    zIndex?: number;
}

export const Modal = ({ isOpen, closeModal, children, zIndex = 10 }: ModalProps) => {
    return (
        <div>
            {isOpen && (
                <div className={`fixed inset-0 z-${zIndex} overflow-y-auto`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-2 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-full sm:w-auto sm:p-6 w-full max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div className="sm:flex sm:items-center">
                                <button type="button"
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-[#e74c4c] focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm">
                                    <FaWindowClose />
                                </button>
                            </div>
                            <div className="mt-3 pt-5 text-center w-full sm:mt-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
