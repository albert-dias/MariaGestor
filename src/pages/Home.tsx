/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import api from "../services/api";

interface ITarifa {
  distancia: number
  id: number
  preco: number
  is_active: number
}

export function Home() {

  const [listaTarifas, setListaTarifas] = useState<ITarifa[]>([]);

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

  return (
    <>
      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Home" />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Resumo
              </h1>
              <div>
                <button
                  type="button"
                  className="inline-flex h-10 items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-6"
                >
                  Adicionar novo item
                  <PlusIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="inline-flex h-10 items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-"
                >
                  Adicionar nova categoria
                  <PlusIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </button>

              </div>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-2 lg:px-8">

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[300px] rounded-lg bg-white shadow p-8">
                    <h2 className="text-lg mb-4 font-medium leading-6 text-gray-900">Tarifas de Entrega</h2>


                    {listaTarifas != undefined &&
                      listaTarifas.map((tarifa: ITarifa, index) => {
                        if (tarifa.is_active) {
                          return (

                            <div className='grid gap-0 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mb-2' key={index}>

                              <input
                                readOnly
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className=" text-center block bg-gray-100 text-gray-600 rounded-l-md border border-r-0 border-gray-200 py-2 px-3 border-le shadow-sm focus:outline-none sm:text-sm"
                                value={`${index == 0 ? 0 : listaTarifas[index - 1].distancia} km até ${tarifa.distancia} km`}
                              />

                              <input
                                readOnly
                                type="text"
                                name="first-name"
                                id="first-name"
                                placeholder='valor R$'
                                autoComplete="given-name"
                                className="block text-gray-600 text-center border rounded-r-md border-gray-200 py-2 px-3 border-le shadow-sm focus:outline-none sm:text-sm"
                                value={tarifa.preco != undefined ? 'R$ ' + tarifa.preco.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}
                              />

                            </div>
                          );
                        }
                      })
                    }


                    {/* <div className="flex justify-center">
                      <ul className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                        <li className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">An item</li>
                        <li className="px-6 py-2 border-b border-gray-200 w-full">A second item</li>
                        <li className="px-6 py-2 border-b border-gray-200 w-full">A third item</li>
                        <li className="px-6 py-2 border-b border-gray-200 w-full">A fourth item</li>
                        <li className="px-6 py-2 w-full rounded-b-lg">And a fifth one</li>
                      </ul>
                    </div> */}



                    <div className="p-6">
                    </div>
                  </div>
                </section>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[300px] rounded-lg bg-white shadow">
                    <div className="p-8">
                      <h2 className="text-lg font-medium leading-6 text-gray-900">Horário de Funcionamento</h2>

                      <div className='grid gap-4 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-16 mb-6'>
                        <input
                          type="time"
                          id="first-name"
                          autoComplete="given-name"
                          className="text-center block bg-gray-100 text-gray-600 rounded-md border border-gray-200 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                        <input
                          type="time"
                          id="first-name"
                          placeholder='valor R$'
                          autoComplete="given-name"
                          className="text-center block text-gray-600 bg-gray-100 rounded-md border border-gray-200 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                      </div>

                      <div className="w-full border border-gray-200 bg-gray-100 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 col-span-2 gap-4">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[600px] rounded-lg bg-white shadow">
                    <div className="p-6">


                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  )
}
