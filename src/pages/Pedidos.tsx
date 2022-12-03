/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { CardPedidos } from "../components/CardPedido";
import { Header } from "../components/Header";
import { useAuth } from "../hook/auth";
import api from "../services/api";

export interface IPedido {
  id: number;
  id_empresa: number;
  cliente: {
    nome: string
    telefone: string
    logradouro: string
    numero: string
    bairro: string
  }
  forma_pagamento: {
    descricao: string
  }
  itens: [
    {
      id: number
      quantidade: number
      cardapio: {
        id: number
        nome: string
        descricao: string
        valor: number
      }
    }
  ]
  total: number
  valor_entrega: number;
  status: number;
  created_at: string;
}


export function Pedidos() {

  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [openM2, setOpenM2] = useState(false);
  const [openM3, setOpenM3] = useState(false);
  const [listaPedidos, setListaPedidos] = useState<IPedido[]>([]);
  const [dataM1, setDataM1] = useState<IPedido>({} as IPedido);
  const [dataM2, setDataM2] = useState<IPedido>({} as IPedido);
  const [dataM3, setDataM3] = useState<IPedido>({} as IPedido);
  const audio = new Audio('notification.mp3');


  const loadPedidos = useCallback(async () => {
    api.get('/pedidos').then((resp) => {
      setListaPedidos(resp.data);
    }).catch((err) => {
    })
  }, [])

  const socket = io("https://api.mgmenu.com.br")

  useEffect(() => {
    if (socket) {
      socket.on("pedidoSolicitado", (data: IPedido) => {
        if (data.id_empresa === user.id_empresa) {
          loadPedidos();
          audio.play();
        }
      })

      socket.on("statusPedido", (data: IPedido) => {
        if (data.id_empresa === user.id_empresa) {
          loadPedidos()
        }
      })
    }
  }, [socket])

  useEffect(() => {
    loadPedidos();
  }, []);

  function abrirModal1(pedido: IPedido) {
    console.log(pedido)
    setDataM1(pedido);
    setOpen(true);
  }

  function abrirModal2(pedido: IPedido) {
    setDataM2(pedido);
    setOpenM2(true);
  }

  function abrirModal3(pedido: IPedido) {
    setDataM3(pedido);
    setOpenM3(true);
  }

  const aprovarPedido = useCallback((id: number) => {
    
    let content = document.getElementById("contentprint");
    if(content !== null ){
      let wd = window.open('about:blank');
      wd?.document.write(content?.innerHTML);
      wd?.print();
      wd?.close();
    }
    // socket.emit("estabelecimentoMudouStatus", { id_pedido: id, status: 2, id_empresa: user.id_empresa })
    // setOpen(false);
  }, [])

  const entregarPedido = useCallback((id: number) => {
    socket.emit("estabelecimentoMudouStatus", { id_pedido: id, status: 3, id_empresa: user.id_empresa })
    setOpenM2(false);
  }, [])

  const finalizarPedido = useCallback((id: number) => {
    socket.emit("estabelecimentoMudouStatus", { id_pedido: id, status: 4, id_empresa: user.id_empresa })
    setOpenM3(false);
  }, [])

  const cancelarPedido = useCallback((id: number) => {
    socket.emit("estabelecimentoMudouStatus", { id_pedido: id, status: 5, id_empresa: user.id_empresa })
  }, [])
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:min-w-[700px] max-w-7xl sm:p-6">
                  <div className="w-full">
                    <div className="p-6">
                      <div className="w-full flex flex-col">
                        <div className="flex flex-wrap">
                          <div className="flex w-full sm:w-1/2">
                            <span className="font-semibold mr-1">Nome: </span>
                            <span> {dataM1?.cliente?.nome}</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span className="mr-1">Telefone: </span>
                            <span> {` (${dataM1?.cliente?.telefone.substring(0, 2)}) ${dataM1?.cliente?.telefone.substring(2, 7)} - ${dataM1?.cliente?.telefone.substring(7, 11)}`}</span>
                          </div>
                        </div>
                        <div className="pb-2 mb-2">
                          <span>Endereço: </span>
                          <span>{`${dataM1?.cliente?.logradouro}, ${dataM1?.cliente?.numero} - ${dataM1?.cliente?.bairro}`}</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>{dataM1.forma_pagamento !== undefined && dataM1.forma_pagamento?.descricao}</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative  mb-4 w-full h-96">
                        <div className="grid grid-cols-5 gap-4 bg-slate-100">
                          <div className="flex justify-center">
                            <span className="font-medium text-zinc-500">
                              Qtd
                            </span>
                          </div>
                          <div className="flex justify-center col-span-3">
                            <span className="font-medium text-zinc-500">
                              Item
                            </span>
                          </div>
                          <div className="flex justify-center ">
                            <span className="font-medium text-zinc-500">
                              Valor
                            </span>
                          </div>
                        </div>

                        {dataM1.itens != undefined && dataM1?.itens.map((item, index) => {
                          return (
                            <div key={index} className="grid grid-cols-5 gap-4 border-b py-2">
                              <div className="flex justify-center">
                                <span className="font-medium text-zinc-900 ">
                                  {item.quantidade}
                                </span>
                              </div>
                              <div className="flex justify-center col-span-3">
                                <span className="font-medium text-zinc-900">
                                  {item.cardapio.id} - {item.cardapio.nome}
                                </span>
                              </div>
                              <div className="flex justify-end ">
                                <span className="font-medium text-zinc-900 pr-4">
                                  R$ {item.cardapio.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            </div>
                          );
                        })}



                        <div className="absolute bottom-0 right-0  h-auto w-3/5 sm:w-2/5">
                          <div className="flex justify-between">
                            <span>Total pedido: </span>
                            <span>{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(dataM1.total)}</span>
                          </div>
                          <div className="flex justify-between border-y">
                            <span>Taxa de entrega: </span>
                            <span>{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(dataM1.valor_entrega)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total a pagar: </span>
                            <span>{Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(dataM1.total + dataM1.valor_entrega)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full justify-between flex-wrap">
                        <button
                          type="submit"
                          className="flex sm:w-56 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                        >
                          Cancelar Pedido
                        </button>
                        <button
                          type="submit"
                          className="flex sm:w-56  w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => aprovarPedido(dataM1.id)}
                        >
                          Confirmar Pedido
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>

              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openM2} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenM2}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:min-w-[700px] max-w-7xl sm:p-6">
                  <div className="w-full">
                    <div className="p-6">
                      <div className="w-full flex flex-col mb-4">
                        <div className="flex flex-wrap">
                          <div className="flex w-full sm:w-1/2">
                            <span className="font-semibold mr-1">Nome: </span>
                            <span>{dataM2?.cliente?.nome}</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span>Telefone: </span>
                            <span> {` (${dataM2?.cliente?.telefone.substring(0, 2)}) ${dataM2?.cliente?.telefone.substring(2, 7)} - ${dataM2?.cliente?.telefone.substring(7, 11)}`}</span>
                          </div>
                        </div>
                        <div className="pb-2">
                          <span>Endereço: </span>
                          <span>{`${dataM2?.cliente?.logradouro}, ${dataM2?.cliente?.numero} - ${dataM2?.cliente?.bairro}`}</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>{dataM2.forma_pagamento != undefined && dataM2.forma_pagamento.descricao}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full justify-end flex-wrap">
                        {/* <button
                          type="submit"
                          className="flex sm:w-56 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 "
                        >
                          Cliente cancelou
                        </button> */}
                        <button
                          type="submit"
                          className="flex sm:w-56  w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => entregarPedido(dataM2.id)}
                        >
                          Saiu para entrega
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>

              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={openM3} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenM3}>
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:min-w-[700px] max-w-7xl sm:p-6">
                  <div className="w-full">
                    <div className="p-6">
                      <div className="w-full flex flex-col mb-4">
                        <div className="flex flex-wrap">
                          <div className="flex w-full sm:w-1/2">
                            <span className="font-semibold mr-3">Nome: </span>
                            <span>{dataM3?.cliente?.nome}</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span>Telefone: </span>
                            <span> {` (${dataM3?.cliente?.telefone.substring(0, 2)}) ${dataM3?.cliente?.telefone.substring(2, 7)} - ${dataM3?.cliente?.telefone.substring(7, 11)}`}</span>
                          </div>
                        </div>
                        <div className="pb-2">
                          <span>Endereço: </span>
                          <span>{`${dataM3?.cliente?.logradouro}, ${dataM3?.cliente?.numero} - ${dataM3?.cliente?.bairro}`}</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>{dataM3.forma_pagamento != undefined && dataM3.forma_pagamento.descricao}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full justify-between flex-wrap">
                        <button
                          type="submit"
                          className="flex sm:w-56 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 "
                          onClick={() => cancelarPedido(dataM3.id)}
                        >
                          Cliente cancelou
                        </button>
                        <button
                          type="submit"
                          className="flex sm:w-56  w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
                          onClick={() => finalizarPedido(dataM3.id)}
                        >
                          Pedido Entregue
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* <ModalPedido open={true} info={pedido} /> */}

      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Pedidos" />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Pedidos
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-3 lg:px-8">
            {/* Replace with your content */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-white">Recebidos</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      {listaPedidos !== undefined && listaPedidos.filter(p => p.status === 1).map((pedido, index) => (
                        <CardPedidos dadosModal={pedido} key={index} onClick={() => abrirModal1(pedido)} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <strong className="sm:text-white text-zinc-700">
                  Em preparo
                </strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      {listaPedidos !== undefined && listaPedidos.filter(p => p.status === 2).map((pedido, index) => (
                        <CardPedidos dadosModal={pedido} key={index} onClick={() => abrirModal2(pedido)} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-zinc-700 sm:text-white">Em rota</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      {listaPedidos !== undefined && listaPedidos.filter(p => p.status === 3).map((pedido, index) => (
                        <CardPedidos dadosModal={pedido} key={index} onClick={() => abrirModal3(pedido)} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              {/* Right column */}
            </div>
            {/* /End replace */}
          </div>
        </main>
        <section className="-mt-6">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-2 lg:px-8">
            {/* Replace with your content */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-zinc-700">Finalizados</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      {listaPedidos !== undefined && listaPedidos.filter(p => p.status === 4).map((pedido, index) => (
                        <CardPedidos dadosModal={pedido} key={index} onClick={() => abrirModal1(pedido)} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-zinc-700">Cancelados</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      {listaPedidos !== undefined && listaPedidos.filter(p => p.status === 5).map((pedido, index) => (
                        <CardPedidos dadosModal={pedido} key={index} onClick={() => abrirModal3(pedido)} />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
              {/* Right column */}
            </div>
            {/* /End replace */}
          </div>
        </section>
      </div>

      <div className="hidden print:block" id="contentprint">
        <h3 style={{'textAlign':'center'}}>Sushi San</h3>
        
        <div>
          <div>Nome: </div>
          <div>Telefone: </div>
          <div>Endereço: </div>

          <div>Pedidos na loja: 30</div>
          <div>Forma de pagamento: </div>
        </div>
        <br />
        <table width={'100%'} style={{'textAlign':'center'}}>
          <thead>
            <tr>
              <th>Qtd</th>
              <th>Item</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {dataM1.itens && dataM1.itens.map(item => (
              <tr key={item.id}>
                <td>{item.quantidade}</td>
                <td>{item.cardapio.id} - {item.cardapio.nome}</td>
                <td>{item.cardapio.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div style={{'width':'100%'}}>
          <div style={{'display':'inline-block','width':'100%'}}>
            <span style={{'float':'left'}}>Total do Pedido: </span>
            <span style={{'float':'right'}}>{Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(dataM1.total)}</span>
          </div>
          <div style={{'display':'inline-block','width':'100%'}}>
            <span style={{'float':'left'}}>Taxa de entrega: </span>
            <span style={{'float':'right'}}>{Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(dataM1.valor_entrega)}</span>
          </div>
          <div style={{'display':'inline-block','width':'100%'}}>
            <span style={{'float':'left'}}>Total a pagar: </span>
            <span style={{'float':'right'}}>{Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(dataM1.total + dataM1.valor_entrega)}</span>
          </div>
        </div>

      </div>
    </>
  );
}
