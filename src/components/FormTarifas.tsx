import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import api from "../services/api";
import ReactLoading from 'react-loading';


interface ITarifa {
    id: number;
    preco: number;
    distancia_init: number;
    distancia_fim: number;
    is_active: number;
    created_at: string;
    updated_at: string;
    id_empresa: number;
}



export default function FormTarifas() {

    const [listaTarifas, setListaTarifas] = useState<ITarifa[]>([]);
    const [novaTarifa, setNovaTarifa] = useState(false);
    const [state_inputDistacia, setState_inputDistacia] = useState('');
    const [state_inputValor, setState_inputValor] = useState('');
    const [opeModal, setOpeModal] = useState(false);
    const [opeModalEdit, setOpeModalEdit] = useState(false);

    const [edit_distaciaIni, setEdit_distaciaIni] = useState(0);
    const [edit_distaciaFin, setEdit_distaciaFin] = useState(0);
    const [edit_valor, setEdit_valor] = useState(0);
    const [edit_id, setEdit_id] = useState(0);

    let input_novaDistanciaIni = useRef(null);
    let input_novaDistanciaFin = useRef(null);
    let input_novoValor = useRef(null);


    const AtualizarLista = () => {
        let tempLista = [];
        api.get('/tarifafrete').then((resp) => {
            tempLista = resp.data;
            tempLista = tempLista.filter((t: ITarifa) => {
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

        let nova = {
            distancia_init: Number(input_novaDistanciaIni?.current?.value),
            distancia_fim: Number(input_novaDistanciaFin?.current?.value),
            id_empresa: 1,
            preco: Number(input_novoValor?.current?.value)
        }

        if (!nova.distancia_init || !nova.distancia_fim || !nova.preco) {
            toast.error('Os campos devem estar preenchidos')
            console.log(nova);
            return
        }


        api.post('/tarifafrete', nova).then((resp) => {
            AtualizarLista()
            toast.success('Nota tarifa adicionada com sucesso')
            setOpeModal(false);
            setNovaTarifa(false);
        }).catch((err) => {
        })
    }


    const editarTarifa = (tarifa: ITarifa) => {
        setEdit_distaciaIni(tarifa.distancia_init)
        setEdit_distaciaFin(tarifa.distancia_fim)
        setEdit_valor(tarifa.preco)
        setEdit_id(tarifa.id)
    }


    function handleModalEdit(tarifa: ITarifa) {
        editarTarifa(tarifa);
        setOpeModalEdit(true);
    }


    const salvarEditarTarifa = () => {

        let nova = {
            distancia_init: Number(edit_distaciaIni),
            distancia_fim: Number(edit_distaciaFin),
            id_empresa: 1,
            preco: Number(edit_valor)
        }

        if (!nova.distancia_init || !nova.distancia_fim || !nova.preco) {
            toast.error('Os campos devem estar preenchidos')
            console.log(nova);
            return
        }


        api.put('/tarifafrete/'+edit_id, nova).then((resp) => {
            AtualizarLista()
            toast.success('Tarifa atualizada com sucesso')
            setOpeModalEdit(false);
            setNovaTarifa(false);
        }).catch((err) => {
        })
    }

    return (
        <>
            <Transition.Root show={opeModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="sm:col-span-6">


                                            <h2 className="text-lg text-center mb-8 font-medium leading-6 text-gray-600">
                                                Nova Tarifa
                                            </h2>


                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        De
                                                    </label>
                                                    <div className="mt-1 border border-gray-300 rounded-md">
                                                        <input
                                                            ref={input_novaDistanciaIni}
                                                            type="text"
                                                            placeholder="km"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            className="block text-right w-full h-9 rounded-md border-gray-300 px-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Até
                                                    </label>
                                                    <div className="mt-1 border border-gray-300 rounded-md">
                                                        <input
                                                            ref={input_novaDistanciaFin}
                                                            type="text"
                                                            placeholder="km"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            className="block text-right w-full h-9 rounded-md border-gray-300 px-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="mt-4">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Valor da Tarifa
                                                </label>
                                                <div className="mt-1 border border-gray-300 rounded-md">
                                                    <input
                                                        ref={input_novoValor}
                                                        type="text"
                                                        placeholder="R$ 0,00"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full text-right px-4 h-9 rounded-md border-gray-300 px-2"
                                                    />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-8">
                                        <button
                                            onClick={salvarNovaTarifa}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>


            <Transition.Root show={opeModalEdit} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpeModalEdit}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="sm:col-span-6">


                                            <h2 className="text-lg text-center mb-8 font-medium leading-6 text-gray-600">
                                                Editar Tarifa
                                            </h2>


                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        De
                                                    </label>
                                                    <div className="mt-1 border border-gray-300 rounded-md">
                                                        <input
                                                            value={edit_distaciaIni}
                                                            onChange={(e) => setEdit_distaciaIni(Number(e.target.value))}
                                                            type="text"
                                                            placeholder="km"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            className="block text-right w-full h-9 rounded-md border-gray-300 px-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="first-name"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Até
                                                    </label>
                                                    <div className="mt-1 border border-gray-300 rounded-md">
                                                        <input
                                                            value={edit_distaciaFin}
                                                            onChange={(e) => setEdit_distaciaFin(Number(e.target.value))}
                                                            type="text"
                                                            placeholder="km"
                                                            name="first-name"
                                                            id="first-name"
                                                            autoComplete="given-name"
                                                            className="block text-right w-full h-9 rounded-md border-gray-300 px-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="mt-4">
                                                <label
                                                    htmlFor="first-name"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Valor da Tarifa
                                                </label>
                                                <div className="mt-1 border border-gray-300 rounded-md">
                                                    <input
                                                        value={edit_valor}
                                                        type="text"
                                                        onChange={(e) => setEdit_valor(Number(e.target.value))}
                                                        placeholder="R$ 0,00"
                                                        name="first-name"
                                                        id="first-name"
                                                        autoComplete="given-name"
                                                        className="block w-full text-right px-4 h-9 rounded-md border-gray-300 px-2"
                                                    />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="mt-6 sm:mt-8">
                                        <button
                                            onClick={salvarEditarTarifa}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                        >
                                            Salvar
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className="aba-config divide-y divide-gray-200 lg:col-span-9">
                {/* Profile section */}
                <div className="py-6 px-4 mb-10 sm:p-8 lg:pb-8">


                    <div className='mb-12 mt-6'>


                        <div className='flex justify-between	w-100'>
                            <h2 className="text-lg font-medium leading-6 text-gray-900">Tarifas de Entrega</h2>
                            <span
                                onClick={() => setOpeModal(true)}
                                className="cursor-pointer mt-[-10px] inline-flex rounded-md border border-transparent bg-green-600 py-[6px] px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                            >
                                {/* <ReactLoading type={'spin'} color={'white'} height={10} width={16} className="mr-2 mt-[2px]" /> */}
                                Nova Tarifa
                            </span>
                        </div>


                        <p className="mt-1 text-sm text-gray-500">
                            Defina o valor de tarifa de entrega de acordo a distancia do ponto de coleta até o destino final.
                        </p>
                    </div>




                    <div className='grid grid-cols-3 bg-gray-100 px-4 py-2 rounded-t-md'>
                        <div className='text-center'>Raio</div>
                        <div className='text-center'>Tarifa</div>
                        <div className='text-center'>Ações</div>
                    </div>


                    <div>
                        {listaTarifas != undefined &&
                            listaTarifas.map((tarifa: ITarifa, index) => {
                                if (tarifa.is_active) {
                                    return (
                                        <div key={index} className='grid grid-cols-3 border-b-[1px] text-gray-600 px-2 py-2 sm:text-sm hover:bg-gray-50'>

                                            <div className="text-left text-gray-600 py-2 px-4 border-r-[1px]">
                                                {`de ${tarifa.distancia_init} km até ${tarifa.distancia_fim} km`}
                                            </div>


                                            <div className="text-right text-gray-600 py-2 px-4 border-r-[1px]">
                                                {tarifa.preco != undefined ? 'R$ ' + tarifa.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}
                                            </div>


                                            <div className='text-center'>
                                                <button
                                                    onClick={() => handleModalEdit(tarifa)}
                                                    className="h-[32px] mt-[2px] inline-flex justify-center border rounded-l-md border-sky-700 bg-white py-[6px] px-4 text-sm font-medium hover:text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => removerTarifa(tarifa.id)}
                                                    className="h-[32px] mt-[2px] inline-flex border-l-0 justify-center rounded-r-md border border-red-600 bg-white py-[6px] px-4 text-sm font-medium hover:text-white text-red-600 shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                                >
                                                    Remover
                                                </button>
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
                    </div>
                </div>
            </div>
        </>
    );
}