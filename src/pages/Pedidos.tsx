/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { CardPedidos } from "../components/CardPedido";
import { Header } from "../components/Header";
import { useAuth } from "../hook/auth";

export function Pedidos() {
  const [open, setOpen] = useState(false);
  const [openM2, setOpenM2] = useState(false);
  const [openM3, setOpenM3] = useState(false);

  const { user } = useAuth();

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
                            <span className="font-semibold">Nome: </span>
                            <span>{user.name}</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span>Telefone: </span>
                            <span>(84)99231-3523</span>
                          </div>
                        </div>
                        <div className="pb-2">
                          <span>Endereço: </span>
                          <span>Albert Andrade Dias</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>Dinheiro</span>
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

                        <div className="grid grid-cols-5 gap-4 border-b py-2">
                          <div className="flex justify-center">
                            <span className="font-medium text-zinc-900 ">
                              1
                            </span>
                          </div>
                          <div className="flex justify-center col-span-3">
                            <span className="font-medium text-zinc-900">
                              23 - Temaki Filadelfia
                            </span>
                          </div>
                          <div className="flex justify-end ">
                            <span className="font-medium text-zinc-900 pr-4">
                              R$ 24,00
                            </span>
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-0  h-auto w-3/5 sm:w-2/5">
                          <div className="flex justify-between">
                            <span>Total pedido: </span>
                            <span>R$ 135,00</span>
                          </div>
                          <div className="flex justify-between border-y">
                            <span>Taxa de entrega: </span>
                            <span>R$ 5,00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total a pagar: </span>
                            <span>R$ 140,00</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full justify-between flex-wrap">
                        <button
                          type="submit"
                          className="flex sm:w-56 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 "
                        >
                          Cancelar Pedido
                        </button>
                        <button
                          type="submit"
                          className="flex sm:w-56  w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
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
                            <span className="font-semibold">Nome: </span>
                            <span>Albert Andrade Dias</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span>Telefone: </span>
                            <span>(84)99231-3523</span>
                          </div>
                        </div>
                        <div className="pb-2">
                          <span>Endereço: </span>
                          <span>Albert Andrade Dias</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>Dinheiro</span>
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
                            <span className="font-semibold">Nome: </span>
                            <span>Albert Andrade Dias</span>
                          </div>
                          <div className="flex w-full sm:w-1/2">
                            <span>Telefone: </span>
                            <span>(84)99231-3523</span>
                          </div>
                        </div>
                        <div className="pb-2">
                          <span>Endereço: </span>
                          <span>Albert Andrade Dias</span>
                        </div>
                        <hr />
                        <div className="flex py-2">
                          <div className="w-1/2">
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className="w-1/2">
                            <span>Forma de pagamento: </span>
                            <span>Dinheiro</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex w-full justify-between flex-wrap">
                        <button
                          type="submit"
                          className="flex sm:w-56 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 "
                        >
                          Cliente cancelou
                        </button>
                        <button
                          type="submit"
                          className="flex sm:w-56  w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
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
                      <CardPedidos onClick={() => setOpen(true)} />
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
                      <CardPedidos onClick={() => setOpenM2(true)} />
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-zinc-700 sm:text-white">Em rota</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      <CardPedidos onClick={() => setOpenM3(true)} />
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
                      <CardPedidos onClick={() => setOpen(true)} />
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <strong className="text-zinc-700">Cancelados</strong>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      <CardPedidos onClick={() => setOpenM2(true)} />
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
    </>
  );
}
