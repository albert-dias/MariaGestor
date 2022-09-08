/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { CardCardapio } from '../components/CardCardapio';
import { CardPedidos } from '../components/CardPedido'
import { Header } from '../components/Header';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Ativo',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Inativo',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Inativo',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Ativo',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Ativo',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]


export default function Cardapio() {
  const [active, setActive] = useState('all');
  const [open, setOpen] = useState(false)

  const handleFilter = useCallback((set: string) => {
    setActive(set)
  }, []);

  const filter = useMemo(() => {
    if (active === "all") {
      return people;
    }
    if (active === "a") {
      return people.filter(p => p.role === "Ativo")
    }
    else {
      return people.filter(p => p.role !== "Ativo")
    }
  }, [people, active])

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Payment successful
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
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
          <Header />
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-white">Cardápio</h1>
              <div>
                <button
                  onClick={() => { setOpen(true) }}
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-6"
                >
                  Adicionar novo item
                  <PlusIcon className="h-5 w-5 ml-1" aria-hidden="true" />
                </button>
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => { handleFilter("all") }}
                    type="button"
                    className={`relative inline-flex items-center rounded-l-md border border-gray-300 ${active === "all" ? 'bg-indigo-500 text-gray-100' : 'bg-white text-gray-700'} px-4 py-2 text-sm font-medium hover:bg-indigo-500 `}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => { handleFilter("a") }}
                    type="button"
                    className={`relative -ml-px inline-flex items-center border border-gray-300 ${active === "a" ? 'bg-indigo-500 text-gray-100' : 'bg-white text-gray-700'} px-4 py-2 text-sm font-medium hover:bg-indigo-500 `}
                  >
                    Ativos
                  </button>
                  <button
                    onClick={() => { handleFilter("i") }}
                    type="button"
                    className={`relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 ${active === "i" ? 'bg-indigo-500 text-gray-100' : 'bg-white text-gray-700'} px-4 py-2 text-sm font-medium  hover:bg-indigo-500 `}
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
                  <div className="rounded-lg  bg-white shadow">
                    <div className="p-6">
                      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filter.length > 0 ? filter.map((person) => (
                          <CardCardapio data={person} />
                        )) :
                          <h1>
                            Nenhum item para essa categoria
                          </h1>
                        }
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
  )
}
