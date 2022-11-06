import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import api from '../services/api';
import { maskCurrency, maskPrice } from '../utils/masks';


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

interface DataProps {
  data: ItemProps;
  edit: () => void;
  setId: (value: number) => void;
}


interface ICategoria {
  id: number;
  nome: string;
  is_active: number;
}


export function CardCardapio({ data, edit, setId }: DataProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [idCArdapio, setIdCArdapio] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [listaCategorias, setListaCategorias] = useState([]);


  async function buscaCategorias() {
    api.get(`/categorias/`).then((res) => {
      if (res.status === 200) {
        setListaCategorias(res.data);
      }
    }).catch((e) => console.log(e));
  }


  const handleUpdateProduct = useCallback(async () => {
    api
      .put("/cardapios/"+idCArdapio, {
        id_empresa: 1,
        nome,
        id_categoria: categoria,
        descricao,
        valor,
        tempo_preparo: tempoPreparo,
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setOpenEdit(false);
      });
  }, [nome, descricao, valor, tempoPreparo]);


  function editCardapio(data: ItemProps) {
    buscaCategorias();
    setValor(maskPrice((data.valor).toString()));
    setNome(data.nome);
    setIdCArdapio(data.id);
    setDescricao(data.descricao);
    setTempoPreparo((data.tempo_preparo).toString());
    setOpenEdit(true);
  }

  const handleEdit = useCallback(() => {
    edit()
    setId(data.id)
  },[])


  return (
    <>
      <Transition.Root show={openEdit} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenEdit}>
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
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Imagem do produto
                      </label>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-slate-50 font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Procure um arquivo</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">ou arraste e solte aqui!</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nome do prato
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <input
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full h-10 rounded-md border-gray-300 px-2"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Descrição
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <input
                            onChange={(e) => setDescricao(e.target.value)}
                            value={descricao}
                            type="text"
                            name="first-name"
                            id="description"
                            autoComplete="given-name"
                            className="block w-full h-10 rounded-md border-gray-300 px-2"
                          />
                        </div>
                      </div>


                      <div className="mt-4">
                        <label
                          htmlFor="select-category"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Categoria
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <select
                            name=""
                            value={categoria}
                            id="select-category"
                            className="block w-full h-10 rounded-md border-gray-300 px-2"
                            onChange={(e) => setCategoria(e.target.value)}
                          >
                            <option
                              className="text-gray-400"
                            >
                              Selecione uma categoria
                            </option>
                            {
                              listaCategorias ? listaCategorias.map((cat: ICategoria, index) => {
                                if(cat.id.toString() == categoria) {
                                return (<option selected value={cat.id}>{cat.nome}</option>);
                                } else {
                                  return (<option value={cat.id}>{cat.nome}</option>);
                                }
                              }) : ''
                            }
                          </select>

                        </div>
                      </div>


                      <div className="mt-4">
                        <label
                          htmlFor="valor"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Valor
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <input
                            onChange={(e) =>
                              setValor(maskPrice(e.target.value))
                            }
                            value={maskCurrency(valor)}
                            type="text"
                            name="valor"
                            id="valor"
                            autoComplete="given-name"
                            className="block px-4 w-full text-right h-10 rounded-md border-gray-300"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Tempo de preparo em minutos
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <input
                            onChange={(e) => setTempoPreparo(e.target.value)}
                            value={tempoPreparo}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block text-right w-full h-10 rounded-md border-gray-300 px-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleUpdateProduct}
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

      <li
        key={data.id}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-slate-50 text-center shadow"
      >
        <div className="flex flex-1 flex-col p-1">
          <img className="mx-auto h-32 w-full flex-shrink-0 rounded" src={data.foto_url ? data.foto_url : ""} alt="" />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{data.nome} - {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(data.valor))}</h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Descrição</dt>
            <dd className="text-sm text-gray-500">{data.descricao}</dd>
            <dt className="sr-only">Role</dt>
            <dd className="mt-3">
              {data.is_active === 1 ? <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Ativo
              </span> :
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  Inativo
                </span>}
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <a
                href={`#`}
                onClick={handleEdit}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Editar</span>
              </a>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <a
                href={``}
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                {data.is_active === 1 ?
                  <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> :
                  <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                }
                <span className="ml-3">{data.is_active === 1 ? "Desativar" : "Ativar"}</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </>


  )
}