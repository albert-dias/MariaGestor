/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CardCardapio } from "../components/CardCardapio";
import { CardPedidos } from "../components/CardPedido";
import { Header } from "../components/Header";
import { useAuth } from "../hook/auth";
import api from "../services/api";
import { maskCurrency, maskPrice } from "../utils/masks";

interface ItemProps {
  id: number;
  nome: string;
  descricao: string;
  foto_url: string;
  is_active: number;
  valor: number;
  tempo_preparo: number;
  id_empresa: number;
  categoria: ICategoria;
}

interface ICategoria {
  id: number;
  nome: string;
  is_active: number;
}



export function Cardapio() {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(false);
  const [openM2, setOpenM2] = useState(false);
  const [nome, setNome] = useState("");
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [items, setItems] = useState<ItemProps[]>([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [image, setImage] = useState<File | Blob>();
  const [idEdit, setIdEdit] = useState(0);
  const {user} = useAuth();


  const loadCardapio = useCallback(async () => {
    api
      .get(`/cardapios/empresa/${user.id_empresa}`)
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);


  async function buscaCategorias() {
    api.get(`/categorias/`).then((res) => {
      if (res.status === 200) {
        setListaCategorias(res.data);
      }
    }).catch((e) => console.log(e));
  }



  const handleRegisterCategory = () => {
    api.post("/categorias", { nome: nomeCategoria })
      .then((resp) => {
        setOpenM2(false);
        toast.success('Nova Categoria Criada com Sucesso');
      })
      .catch((e) => {
        console.log(e);
      })
  }


  useEffect(() => {
    loadCardapio();
    buscaCategorias();
  }, []);



  const handleFotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }, [])

  const editItem = useCallback((item: ItemProps) => {
    setNome(item.nome);
    setDescricao(item.descricao)
    setCategoria(item.categoria.id.toString());
    setValor(item.valor.toString())
    setTempoPreparo(item.tempo_preparo.toString())
    setOpen(true);

  }, [
    nome,
    categoria,
    descricao,
    valor,
    tempoPreparo
  ])

  const handleRegisterProduct = useCallback(async () => {
    const data = new FormData();

    image !== undefined && data.append("foto", image);
    data.append("id_empresa", `${user.id_empresa}`)
    data.append("nome", nome)
    data.append("id_categoria", categoria)
    data.append("descricao", descricao)
    data.append("valor", valor)
    data.append("tempo_preparo", tempoPreparo);

    if (idEdit === 0) {
      api
        .post("/cardapios", data)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          buscaCategorias();
          loadCardapio();
          setOpen(false);
        });
    } else {
      api
        .put(`/cardapios/${idEdit}`, data)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          buscaCategorias();
          loadCardapio();
          setCategoria('0');
          setIdEdit(0);
          setOpen(false);
        });
    }
  }, [nome, descricao, valor, tempoPreparo, image, idEdit, user]);


  const handleFilter = useCallback((set: string) => {
    setActive(set);
  }, []);


  const filter = useMemo(() => {
    if (active === "all") {
      return items;
    }
    if (active === "a") {
      return items.filter((p) => p.is_active === 1);
      0;
    } else {
      return items.filter((p) => p.is_active === 0);
    }
  }, [items, active]);

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="cover-photo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Imagem do produto
                      </label>

                      {
                        imageUrl ?
                          (
                            <div className="mt-1 justify-center rounded-md border-2 border-dashed border-gray-300">
                              <img className="opacity-30" style={{ width: '100%', margin: "auto" }} src={imageUrl} alt="Atual" />
                              <div className="space-y-1 text-center px-6 pt-5 pb-6 absolute top-32">
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
                                      onChange={handleFotoChange}
                                    />
                                  </label>
                                  <p className="pl-1">ou arraste e solte aqui!</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>)
                          :

                          (
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
                                      onChange={handleFotoChange}
                                    />
                                  </label>
                                  <p className="pl-1">ou arraste e solte aqui!</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          )
                      }


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
                              value={""}
                            >
                              Selecione uma categoria
                            </option>
                            {
                              listaCategorias ? listaCategorias.map((cat: ICategoria, index) => {
                                if(categoria == cat.id.toString()) {
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
                            className="block w-full text-right h-10 rounded-md border-gray-300 px-4"
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
                            className="block w-full h-10 rounded-md border-gray-300 text-right px-4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleRegisterProduct}
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="sm:col-span-6">
                      <h2 className="text-lg text-center mb-5 font-medium leading-6">
                        Nova Categoria
                      </h2>
                      <div className="mt-4">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nome da Categoria
                        </label>
                        <div className="mt-1 border border-gray-300 rounded-md">
                          <input
                            onChange={(e) => setNomeCategoria(e.target.value)}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="block w-full h-10 rounded-md border-gray-300 px-2"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={handleRegisterCategory}
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




      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Cardápio" />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Cardápio
              </h1>
              <div>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center h-10 px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-6"
                >
                  Adicionar novo item
                  <PlusIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </button>

                <button
                  onClick={() => {
                    setOpenM2(true);
                  }}
                  type="button"
                  className="inline-flex items-center h-10 px-3 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-6"
                >
                  Adicionar nova categoria
                  <PlusIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </button>

                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => {
                      handleFilter("all");
                    }}
                    type="button"
                    className={`relative inline-flex items-center rounded-l-md border border-gray-300 ${active === "all"
                      ? "bg-indigo-500 text-gray-100"
                      : "bg-white text-gray-700"
                      } px-4 py-2 text-sm font-medium hover:bg-indigo-500 `}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => {
                      handleFilter("a");
                    }}
                    type="button"
                    className={`relative -ml-px inline-flex items-center border border-gray-300 ${active === "a"
                      ? "bg-indigo-500 text-gray-100"
                      : "bg-white text-gray-700"
                      } px-4 py-2 text-sm font-medium hover:bg-indigo-500 `}
                  >
                    Ativos
                  </button>
                  <button
                    onClick={() => {
                      handleFilter("i");
                    }}
                    type="button"
                    className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 ${active === "i"
                      ? "bg-indigo-500 text-gray-100"
                      : "bg-white text-gray-700"
                      } px-4 py-2 text-sm font-medium  hover:bg-indigo-500 `}
                  >
                    Inativos
                  </button>
                </span>
              </div>
            </div>
          </header>
        </div>


        <main className="-mt-32">
          <div className="mx-auto max-w-7xl max-h-screen px-4 pb-12 sm:px-6 gap-4 lg:grid-cols-3 lg:px-8">
            {/* Replace with your content */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 col-span-3 gap-4">
                <section aria-labelledby="section-1-title">
                  <h2 className="text-lg mb-4 font-medium leading-6 text-white">
                    Itens Cadastrados
                  </h2>
                  <div className="rounded-lg  bg-white shadow">
                    <div className="p-6">
                      <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      >
                        {filter.length > 0 ? (
                          filter.map((person) => <CardCardapio data={person} edit={() => editItem(person)} setImage={setImageUrl} setId={setIdEdit} />)
                        ) : (
                          <h1>Nenhum item para essa categoria</h1>
                        )}
                      </ul>
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
