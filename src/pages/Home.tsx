/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CardCardapioPromocao } from "../components/CardCardapioPromocao";
import { Header } from "../components/Header";
import api from "../services/api";

interface ITarifa {
  distancia: number;
  id: number;
  preco: number;
  is_active: number;
}

interface ItemProps {
  id: number;
  nome: string;
  descricao: string;
  foto_url: string;
  is_active: number;
  valor: number;
  tempo_preparo: number;
  id_empresa: number;
}

export function Home() {

  const [listaTarifas, setListaTarifas] = useState<ITarifa[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [horaAbertura, setHoraAbertura] = useState();
  const [horaFechamento, setHoraFechamento] = useState();
  const [widthProgressBar, setWidthProgressBar] = useState(0);
  const [lojaAberta, setLojaAberta] = useState(0);


  function buscarHorarios() {
    api.get('/empresas/1').then((resp) => {
      setHoraAbertura(resp.data.hora_inicio);
      setHoraFechamento(resp.data.hora_fim);
      let horaAtual = new Date();
      let expediente = new Date(`2021-01-01T${horaFechamento}:00-03:00`) - new Date(`2021-01-01T${horaAbertura}:00-03:00`);
      let H = horaAtual.getHours() < 10 ? `0${horaAtual.getHours()}` : horaAtual.getHours();
      let M = horaAtual.getMinutes() < 10 ? `0${horaAtual.getMinutes()}` : horaAtual.getMinutes();
      let S = horaAtual.getSeconds() < 10 ? `0${horaAtual.getSeconds()}` : horaAtual.getSeconds();
      let tempoAberto = new Date(`2021-01-01T${H}:${M}:${S}-03:00`) - new Date(`2021-01-01T${horaAbertura}:00-03:00`);
      let percent = parseInt((tempoAberto / expediente) * 100);
      percent = percent > 0 ? percent : 0;
      // console.log(percent);
      setWidthProgressBar(percent);
    }).catch((err) => {
    })
  }


  function verStatusLoja() {
    api.get(`/empresas/1`).then((res) => {
      if (res.data.aberta == 1) {
        setLojaAberta(1);
      } else {
        setLojaAberta(0);
      }
    }).catch((e) => console.log(e));
  }


  function abrirLoja() {
    api.post(`/empresas/abrir/1`).then((res) => {
      setLojaAberta(1);
      toast.info('Expediente Iniciado');

    }).catch((e) => console.log(e));
  }
  function fecharLoja() {
    api.post(`/empresas/fechar/1`).then((res) => {
      setLojaAberta(0);
      if (widthProgressBar > 0) {
        toast.warning('Expediente Pausado');
      } else {
        toast.info('Expediente Encerrado');
      }
    }).catch((e) => console.log(e));
  }


  const loadCardapio = useCallback(async () => {
    api.get(`/cardapios/empresa/1`).then((res) => {
      if (res.status === 200) {
        setItems(res.data);
      }
    }).catch((e) => console.log(e));
  }, []);


  const AtualizarLista = () => {
    let tempLista = [];
    api.get("/tarifafrete").then((resp) => {
      tempLista = resp.data;
      tempLista = tempLista.filter((t: ITarifa) => {
        return t.is_active;
      });
      setListaTarifas(tempLista);
    }).catch((err) => { });
  };


  useEffect(() => {
    verStatusLoja();
    AtualizarLista();
    loadCardapio();
    buscarHorarios();
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
                {lojaAberta == 1 ?
                  <button
                    onClick={fecharLoja}
                    type="button"
                    className={`inline-flex h-10 items-center pr-3 py-1.5 pl-4 border border-transparent text-sm font-medium rounded shadow-sm text-white ${widthProgressBar <= 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none`}
                  >
                    Encerrar Expediente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                  </button> :
                  <button
                    onClick={abrirLoja}
                    type="button"
                    className={`inline-flex h-10 items-center pr-3 py-1.5 pl-4 border border-transparent text-sm font-medium rounded shadow-sm text-white ${widthProgressBar > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none`}
                  >
                    Iniciar Expediente
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-5 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                  </button>
                }
              </div>
            </div>
          </header>
        </div>


        <main className="-mt-32">

          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-2 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-1-title">

                  <h2 className="text-lg mb-4 font-medium leading-6 text-white">
                    Tarifas de Entrega
                  </h2>
                  <div className="over sm:h-[300px] rounded-lg bg-white shadow p-8">

                    <div className="sm:h-[240px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-200 overflow-y-scroll">
                      {listaTarifas != undefined &&
                        listaTarifas.map((tarifa: ITarifa, index) => {
                          if (tarifa.is_active) {
                            return (
                              <div
                                className="grid gap-0 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mr-3"
                                key={index}
                              >
                                <input
                                  readOnly
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className={`text-center block bg-gray-50 text-gray-600 border border-x-0 border-t-0 ${index + 1 == listaTarifas.length ? 'border-b-0' : ''} border-gray-200 py-2 px-3 border-le focus:outline-none sm:text-sm`}
                                  value={`${index == 0
                                    ? 0
                                    : listaTarifas[index - 1].distancia
                                    } km à ${tarifa.distancia} km`}
                                />

                                <input
                                  readOnly
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  placeholder="valor R$"
                                  autoComplete="given-name"
                                  className={`block text-gray-600 text-center border border-gray-200 py-2 px-3 border-r-0 border-t-0 ${index + 1 == listaTarifas.length ? 'border-b-0' : ''} focus:outline-none sm:text-sm`}
                                  value={
                                    tarifa.preco != undefined
                                      ? "R$ " +
                                      tarifa.preco.toLocaleString("pt-br", {
                                        minimumFractionDigits: 2,
                                      })
                                      : 0
                                  }
                                />
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </section>

                <section aria-labelledby="section-1-title">
                  <h2 className="text-lg font-medium leading-6 mb-4 text-gray-900">
                    Horário de Funcionamento
                  </h2>
                  <div className="overflow-hidden sm:h-[300px] rounded-lg bg-white shadow">
                    <div className="p-8">




                      {(widthProgressBar > 0 && lojaAberta) == 0 ?
                        <div className="bg-yellow-100 border mb-[-40px] border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
                          <strong className="font-bold">Hora de abrir!</strong>
                          <span className="block sm:inline"> Inicie seu expediente. Seus clientes esperam por você.</span>
                          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                          </span>
                        </div> :

                        (widthProgressBar <= 0 && lojaAberta) == 1 ?
                          <div className="bg-blue-100 border mb-[-40px] border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Missão cumprida!</strong>
                            <span className="block sm:inline"> Hora de encerrar o expediente e se preparar para amanhã</span>
                            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            </span>
                          </div> : ''
                      }



                      <div className="grid gap-4 items-center grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-16 mb-6">
                        <input
                          type="time"
                          value={horaAbertura}
                          id="first-name"
                          autoComplete="given-name"
                          className="text-center block bg-gray-100 text-gray-600 rounded-md border border-gray-200 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                        <input
                          type="time"
                          value={horaFechamento}
                          id="first-name"
                          autoComplete="given-name"
                          className="text-center block text-gray-600 bg-gray-100 rounded-md border border-gray-200 py-2 px-3 border-le shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                      </div>

                      <div className="w-full border border-gray-200 bg-gray-100 rounded-full h-2.5">
                        <div
                          className={`${(widthProgressBar > 0 && lojaAberta == 0) ? 'bg-yellow-400' : (widthProgressBar > 95 ? 'bg-red-500' : 'bg-blue-500')} h-2.5 rounded-full`}
                          style={{ width: `${widthProgressBar}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </section>

              </div>

              <div className="grid grid-cols-1 col-span-2 gap-4">
                <section aria-labelledby="section-1-title">
                  <h2 className="text-lg font-medium leading-6 mb-4 text-white">
                    Promoções Ativas
                  </h2>
                  <div className="rounded-lg bg-white shadow mb-10">
                    <div className="p-8">
                      <div className=" sm:h-[593px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 overflow-y-scroll">

                        <ul
                          role="list"
                          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        >
                          {items.length > 0 ? (
                            items.map((person) => (
                              <CardCardapioPromocao data={person} />
                            ))
                          ) : (
                            <h1>Nenhum item para essa categoria</h1>
                          )}
                        </ul>
                      </div>

                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
