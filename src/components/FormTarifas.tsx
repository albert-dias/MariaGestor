import { Switch } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify'
import api from "../services/api";


interface ITarifa {
    distancia: number
    id: number
    preco: number
    is_active: number
}



export default function FormTarifas() {

    const [listaTarifas, setListaTarifas] = useState<ITarifa[]>([]);
    const [novaTarifa, setNovaTarifa] = useState(false);
    const [state_inputDistacia, setState_inputDistacia] = useState('');
    const [state_inputValor, setState_inputValor] = useState('');

    let input_novaDistancia = useRef(null);
    let input_novoValor = useRef(null);



    const AtualizarLista = () => {
        let tempLista = [];
        api.get('/tarifafrete').then((resp) => {
            tempLista = resp.data;
            tempLista = tempLista.filter((t:ITarifa) => {
                return t.is_active;
            })
            setListaTarifas(tempLista);
        }).catch((err) => {
        })
    }


    useEffect(() => {
        AtualizarLista()
    }, []);


    function removerTarifa(id: number) {
        api.delete('/tarifafrete/' + id).then((resp) => {
            AtualizarLista()
            toast.info('Tarifa removida com sucesso');
            setNovaTarifa(false);
        }).catch((err) => {
        })
    }


    const salvarNovaTarifa = (event: any) => {

        if (!state_inputValor || !state_inputDistacia) {
            toast.error('Os campos devem estar preenchidos')
            return
        }

        let nova = {
            "distancia": Number(state_inputDistacia),
            "id_empresa": 1,
            "preco": Number(state_inputValor)
        }

        api.post('/tarifafrete', nova).then((resp) => {
            AtualizarLista()
            toast.info('Nota tarifa adicionada com sucesso')
            setNovaTarifa(false);
        }).catch((err) => {
        })
    }

    return (

        <div className="aba-config divide-y divide-gray-200 lg:col-span-9">
            {/* Profile section */}
            <div className="py-6 px-4 mb-10 sm:p-8 lg:pb-8">


                <div className='mb-12 mt-6'>
                    <h2 className="text-lg font-medium leading-6 text-gray-900">Tarifas de Entrega</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Defina o valor de tarifa de entrega de acordo a distancia do ponto de coleta até o destino final.
                    </p>
                </div>


                <div>
                    {listaTarifas != undefined &&
                        listaTarifas.map((tarifa: ITarifa, index) => {
                            if (tarifa.is_active) {
                                return (
                                    <div className='grid gap-4 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mb-6' key={index}>
                                        
                                        <div className="rounded-md grid grid-cols-2 shadow-sm">
                                            <span className="text-center whitespace-nowrap h-10 mt-1 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                                {index == 0 ? 0 : listaTarifas[index - 1].distancia} km até
                                            </span>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="mt-1 text-right block text-gray-600 rounded-r-md border border-gray-300 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                value={tarifa.distancia + ' km'}
                                            />
                                        </div>

                                        <div className='grid grid-cols-2'>                                       
                                            <div className='justify-center items-center h-8'>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    placeholder='valor R$'
                                                    autoComplete="given-name"
                                                    className="mt-1 block text-gray-600 text-center rounded-md border border-gray-300 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                                    value={tarifa.preco != undefined ? 'R$ ' + tarifa.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}
                                                />
                                            </div>

                                            <div className='grid grid-cols-2'>
                                            <span className="isolate inline-flex rounded-md shadow-sm">
                                                <button
                                                    className="mt-[6px] inline-flex border-r-0 justify-center border rounded-l-md border-transparent border-gray-300 bg-white py-2 px-4 text-sm font-medium hover:text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => removerTarifa(tarifa.id)}
                                                    className="mt-[6px] inline-flex justify-center rounded-r-md border-transparent border border-gray-300 bg-white py-2 px-4 text-sm font-medium hover:text-white text-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                                >
                                                    Remover
                                                </button>
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                );
                            }
                        })
                    }

                    {/* NOTA TARIFA */
                        novaTarifa ?
                            <div className='flex mb-6'>
                                <div className="mt-1 flex rounded-md shadow-sm col-span-3">
                                    <span className="w-24 text-center whitespace-nowrap h-10 mt-1 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                        nova região
                                    </span>
                                    <input
                                        id="nt_distancia"
                                        type="text"
                                        onChange={e => setState_inputDistacia(e.target.value)}
                                        ref={input_novaDistancia}
                                        name="first-name"
                                        autoComplete="given-name"
                                        className="mt-1 text-right block text-gray-600 rounded-md border border-gray-300 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    />
                                </div>
                                <div className='pt-7 pl-2 pr-2 col-span-3'>
                                    <hr className='w-6' />
                                </div>
                                <input
                                    type="text"
                                    name="first-name"
                                    onChange={e => setState_inputValor(e.target.value)}
                                    ref={input_novoValor}
                                    id="nt_valor"
                                    placeholder='valor R$'
                                    autoComplete="given-name"
                                    className="col-span-3 mt-1 block text-gray-600 text-center rounded-md border border-gray-300 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                                <div>
                                    <button

                                        onClick={salvarNovaTarifa}
                                        className="ml-5 mt-[6px] inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-green-600 shadow-sm hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                    >
                                        salvar
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => setNovaTarifa(false)}
                                        className="ml-5 mt-[6px] inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-yellow-500 shadow-sm hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div> : ''
                    }


                    <div className='justify-end w-100'>
                        <span
                            onClick={() => setNovaTarifa(true)}
                            className="cursor-pointer mt-[6px] inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                        >
                            Nova Tarifa
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}