/* This example requires Tailwind CSS v2.0+ */
import { CardPedidos } from '../components/CardPedido'
import { Header } from '../components/Header'


export default function Pedidos() {
  return (
    <>
      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Pedidos</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-3 lg:px-8">
            {/* Replace with your content */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">
                      <CardPedidos />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">
                  <div className="overflow-hidden rounded-lg sm:h-[600px] bg-white shadow">
                    <div className="p-6">
                      <div className="w-full flex flex-col">
                        <div className='flex flex-wrap'>
                          <div className='flex w-full sm:w-1/2'>
                            <span>Nome: </span>
                            <span>Albert Andrade Dias</span>
                          </div>
                          <div className='flex w-full sm:w-1/2'>
                            <span>Telefone: </span>
                            <span>(84)99231-3523</span>
                          </div>
                          
                        </div>
                        <div className='pb-2'>
                          <span>Endereço: </span>
                          <span>Albert Andrade Dias</span>
                        </div>
                        <hr />
                        <div className='flex py-2'>
                          <div className='w-1/2'>
                            <span>Pedidos na loja: </span>
                            <span>30</span>
                          </div>
                          <div className='w-1/2'>
                            <span>Forma de pagamento: </span>
                            <span>Dinheiro</span>
                          </div>
                        </div>
                      </div>
                      <div className="relative  mb-4 w-full h-96">
                        <div className="grid grid-cols-5 gap-4 bg-slate-100">
                          <div className="flex justify-center">
                            <span className='font-medium text-zinc-500'>
                              Qtd
                            </span>
                          </div>
                          <div className="flex justify-center col-span-3">
                            <span className='font-medium text-zinc-500'>
                              Item
                            </span>
                          </div>
                          <div className="flex justify-center ">
                            <span className='font-medium text-zinc-500'>
                              Valor
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4 border-b py-2">
                          <div className="flex justify-center">
                            <span className='font-medium text-zinc-900 '>
                              1
                            </span>
                          </div>
                          <div className="flex justify-center col-span-3">
                            <span className='font-medium text-zinc-900'>
                              23 - Temaki Filadelfia
                            </span>
                          </div>
                          <div className="flex justify-end ">
                            <span className='font-medium text-zinc-900 pr-4'>
                              R$ 24,00
                            </span>
                          </div>
                        </div>

                        <div className="absolute bottom-0 right-0  h-auto w-3/5 sm:w-2/5">
                          <div className='flex justify-between'>
                            <span>Total pedido: </span>
                            <span>R$ 135,00</span>
                          </div>
                          <div className='flex justify-between border-y'>
                            <span>Taxa de entrega: </span>
                            <span>R$ 5,00</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Total a pagar: </span>
                            <span>R$ 140,00</span>
                          </div>
                        </div>

                      </div>
                      <div className="flex w-full justify-between flex-wrap">
                        <button
                          type="submit"
                          className="flex md:w-80 sm:mb-0 mb-4 w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Cancelar Pedido
                        </button>
                        <button
                          type="submit"
                          className="flex md:w-80  w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Confirmar Pedido
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
