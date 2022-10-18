import { useEffect, useState } from 'react';
import api from "../services/api";


interface iClientes {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    avatar: null,
    is_active: 1,
    telefone: string;
    telefone_whatsApp: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    created_at: string;
    updated_at: string;

}


export default function ConfigClients() {

    const [listaClientes, setListaClientes] = useState([]);

    const buscarClientes = () => {
        api.get('/clientes/').then((resp) => {
            // console.log(resp.data);
            setListaClientes(resp.data);
        })
    }

    const onLoad = useEffect(() => {
        buscarClientes();
    }, []);



    return (
        <div className="aba-config divide-y divide-gray-200 lg:col-span-9">
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div className="divide-y divide-gray-200 pt-6">
                    <div className='mb-12'>
                        <h2 className="text-lg font-medium leading-6 text-gray-900">Cadastro de Clientes</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Listagem de todos os clientes cadastrados na plataforma
                        </p>


                        <div className='mt-8'>
                            <div className='grid grid-cols-5 bg-gray-100 px-4 py-2 rounded-t-md'>
                                <div className='col-span-2'>Nome</div>
                                <div className=''>Telefone</div>
                                <div className=''>Pedidos</div>
                                <div className=''>Bairro</div>
                            </div>
                            <div className=''>
                                {listaClientes.length > 0 ?

                                    listaClientes.map((cliente: iClientes, index) => {
                                        return (
                                            <div key={index} className='grid grid-cols-5 border-b-2 text-gray-600 px-4 py-2'>
                                                <div className='col-span-2' >{cliente.nome}</div>
                                                <div>{` (${cliente.telefone.substring(0, 2)}) ${cliente.telefone.substring(2, 7)}-${cliente.telefone.substring(7, 11)}`}</div>
                                                <div>12</div>
                                                <div>{cliente.bairro}</div>
                                            </div>
                                        );
                                    })
                                    :
                                    <div className='grid grid-cols-5 justify-center border-b-2 text-gray-600 px-4 py-2'>
                                        <div className='justify-center col-span-5 text-center w-full whitespace-nowrap'>Nenhum registro encontrado</div>
                                    </div>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}