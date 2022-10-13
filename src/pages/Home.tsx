/* This example requires Tailwind CSS v2.0+ */
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
    api.get('/tarifafrete').then((resp) => {
      setListaTarifas(resp.data);
    }).catch((err) => {
    })
  }

  useEffect(() => {
    // AtualizarLista()
  }, []);

  return (
    <>
      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Home" />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Home</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-2 lg:px-8">

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[300px] rounded-lg bg-white shadow">
                    {listaTarifas != undefined &&
                      listaTarifas.map((tarifa: ITarifa, index) => {
                        if (tarifa.is_active) {
                          return (
                            <div className='grid gap-1 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mb-8' key={index}>

                              <div className="rounded-md grid grid-cols-2 shadow-sm">
                                <span className="text-center whitespace-nowrap h-10 mt-1 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                  {index == 0 ? 0 : listaTarifas[index - 1].distancia} km até
                                </span>
                                <input
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="mt-1 text-right block text-gray-600 rounded-md border border-gray-300 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
                              </div>

                            </div>
                          );
                        }
                      })
                    }
                    <div className="p-6">
                    </div>
                  </div>
                </section>
                <section aria-labelledby="section-1-title">
                  <div className="overflow-hidden sm:h-[300px] rounded-lg bg-white shadow">
                    <div className="p-6">
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
