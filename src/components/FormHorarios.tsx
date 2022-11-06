import { useEffect, useState } from 'react';
import { useAuth } from '../hook/auth';
import api from "../services/api";

interface ITarifa {
    distancia: number
    preco: number
}


export default function FormHorarios() {

    const [horaAbertura, setHoraAbertura] = useState();
    const [horaFechamento, setHoraFechamento] = useState();
    const {user} = useAuth()


    useEffect(() => {
        api.get(`/empresas/${user.id_empresa}`).then((resp) => {
            // console.log(resp.data);
            setHoraAbertura(resp.data.hora_inicio);
            setHoraFechamento(resp.data.hora_fim);
        }).catch((err) => {
        })
    }, []);

    return (

        <div className="aba-config divide-y divide-gray-200 lg:col-span-9">
            {/* Profile section */}
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div className="divide-y divide-gray-200 pt-6">
                    <div className='mb-12'>
                        <h2 className="text-lg font-medium leading-6 text-gray-900">Horários de Funcionamento</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Informe o horário de funcionamento do estabelecimento. Esta informação definirá em que momento serão aceitos novos pedidos
                        </p>
                        <div className="mt-10 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-4">
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Horário de Abertura
                                </label>
                                <input
                                    readOnly
                                    value={horaAbertura}
                                    type="time"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="mt-1 block w-full text-center rounded-md border bg-gray-100 border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-4">
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                    Horário de Fechamento
                                </label>
                                <input
                                    readOnly
                                    type="time"
                                    value={horaFechamento}
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="mt-1 block w-full text-center rounded-md border bg-gray-100 border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button
                                    className="mt-[24px] border justify-center rounded-md border-transparent border-gray-300 bg-white py-2 px-4 text-sm font-medium hover:text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}