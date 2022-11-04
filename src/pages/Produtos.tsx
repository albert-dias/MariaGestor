/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Header } from "../components/Header";
import api from "../services/api";


const Content = styled.div`
  display: flex;

  section#section_listProducts {
    width: 70%;
    height: 100% !important;

    article#article_listProducts {
      min-height: 80vh;

    }
  }

  aside#aside_listProducts {
    width: 30%;
  }
`;


interface IProduto {
  id: number;
  nome: string;
  descricao: string;
  foto_url: string;
  is_active: number;
  valor: number;
  tempo_preparo: number;
  id_empresa: number;
}


export function Produtos() {
  const [open, setOpen] = useState(false);
  const [listaProdutos, setListasProdutos] = useState([]);

  async function buscarProdutos() {
    api.get(`/cardapios/`).then((res) => {
      if (res.status === 200) {
        setListasProdutos(res.data);
      }
    }).catch((e) => console.log(e));
  }

  useEffect(() => {
    buscarProdutos()
  })

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[80vw]">

                  <div className="flex justify-between items-start p-4 rounded-t bg-white border-b dark:border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-600">
                      Detalhes do Produto
                    </h3>
                    <button
                      onClick={() => setOpen(false)}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-toggle="defaultModal">
                      <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div className="px-4 pt-5 pb-4 sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">

                      <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                          <div className="bg-white p-6 rounded-md shadow">
                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                              <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only"></input>
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-6 rounded-md shadow mt-6">
                            <div className="flex items-start">
                              <div className="flex h-5 items-center">
                                <input id="comments" name="comments" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"></input>
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium text-gray-700">Comments</label>
                                <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="md:col-span-2 md:mt-0">
                        <form action="#" method="POST">
                          <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3 mb-4">
                                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                  <input type="text" name="first-name" id="first-name" className="mt-1 h-full block w-full border rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                  <input type="text" name="last-name" id="last-name" className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-4">
                                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                                  <input type="text" name="email-address" id="email-address" className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                  <select id="country" name="country" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                  </select>
                                </div>

                                <div className="col-span-6">
                                  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                                  <input type="text" name="street-address" id="street-address" className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                  <input type="text" name="city" id="city" className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">State / Province</label>
                                  <input type="text" name="region" id="region"  className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                  <input type="text" name="postal-code" id="postal-code" className="h-full border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                              <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                            </div>
                          </div>
                        </form>
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
          <Header name="Cardápio" />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Produtos
              </h1>
              <div>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center h-10 px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  Adicionar novo produto
                </button>

              </div>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-3 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="grid grid-cols-1 col-span-3 gap-4">
                <section aria-labelledby="section-1-title">
                  <h2 className="text-lg mb-4 font-medium leading-6 text-white">
                    Itens Cadastrados
                  </h2>
                  <div className="rounded-lg  bg-white shadow">
                    <div className="">
                      <Content>
                        <section className="bg-gray-100 rounded-l-lg p-6" id="section_listProducts">
                          <article id="article_listProducts" className="rounded-lg bg-white shadow">



                            <div className='grid grid-cols-12 bg-gray-50 px-4 py-2 rounded-t-md'>
                              <div className='col-span-1'></div>
                              <div className='col-span-4 px-2'>Descrição</div>
                              <div className='col-span-3 text-right px-4'>Valor</div>
                              <div className='col-span-2 text-right px-4'>Estoque</div>
                              <div className='col-span-2'></div>
                            </div>


                            <div>
                              {listaProdutos != undefined &&
                                listaProdutos.map((produto: IProduto, index) => {
                                  if (produto.is_active) {
                                    return (
                                      <div key={index} className='grid grid-cols-12 border-b-[1px] text-gray-600 px-2 py-2 sm:text-sm hover:bg-gray-50'>

                                        <div className="col-span-1 text-left text-gray-600">
                                          <img className="mx-auto h-[38px] w-[38px] flex-shrink-0 rounded-full" src={produto.foto_url ? produto.foto_url : ""} alt="" />
                                        </div>


                                        <div className="col-span-4 text-left text-gray-600 py-2 px-4 border-r-[1px]">
                                          {produto.nome}
                                        </div>


                                        <div className="col-span-3 text-right text-gray-600 py-2 px-4 border-r-[1px]">
                                          {produto.valor}
                                        </div>


                                        <div className="col-span-2 text-right text-gray-600 py-2 px-4 border-r-[1px]">
                                          20 Unid.
                                        </div>


                                        <div className='col-span-2 text-center'>
                                          <button
                                            onClick={() => setOpen(true)}
                                            className="h-[32px] mt-[2px] inline-flex text-sky-700 justify-center border rounded-md border-sky-700 bg-white py-[6px] px-4 text-sm font-medium hover:text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                          >
                                            Editar
                                          </button>
                                        </div>

                                      </div>
                                    );
                                  }
                                })
                              }
                            </div>




                          </article>
                        </section>
                        <aside className="bg-white shadow rounded-r-lg p-6" id="aside_listProducts">
                          <div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Foto do Produto</label>
                              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                  </svg>
                                  <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                      <span>Upload a file</span>
                                      <input id="file-upload" name="file-upload" type="file" className="sr-only"></input>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </aside>
                      </Content>
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
  );
}
