import { InputField } from "../Input"


export const FormEmployee = () => {
    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
            <h2 className="text-lg font-semibold text-[#e74c4c] capitalize ">Registrar Empleado</h2>

            <form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <InputField label="Cédula" id="identification" type="text" />
                    <InputField label="Nombre Completo" id="name" type="text" />
                    <InputField label="Salario Base" id="salary" type="text" />
                    <InputField label="Teléfono" id="phone" type="text" />
                    <InputField label="Dirección" id="email" type="text" />
                    <InputField label="Correo" id="email" type="email" />
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-[#fdf3f3] transition-colors duration-300 transform bg-[#e74c4c] rounded-md hover:bg-[#d32f2f] focus:outline-none focus:bg-[#b22323]">Registrar</button>
                </div>
            </form>
        </section>
    )
}