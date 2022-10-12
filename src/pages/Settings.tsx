/* This example requires Tailwind CSS v2.0+ */
import { useMemo, useState } from 'react'
import { Header } from '../components/Header'
import {
  CogIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import FormPerfil from '../components/FormPerfil'
import FormTarifas from '../components/FormTarifas'
import FormHorarios from '../components/FormHorarios'


interface ILiNav 
  {
    name: string
    href: string
    curret: boolean
  }



export function Settings() {

  const subNavigation = [
    { name: 'Perfil', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Tarifas', href: 'tarifas', icon: CogIcon, current: false },
    { name: 'Horários', href: 'horarios', icon: CogIcon, current: false },
    // { name: 'Conta', href: '#', icon: CogIcon, current: false },
    // { name: 'Password', href: '#', icon: KeyIcon, current: false },
    // { name: 'Notifications', href: '#', icon: BellIcon, current: false },
    // { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
    // { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
  ]

  const [sideList, setSideList] = useState(subNavigation);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


  const [indexAtual, setIndexAtual] = useState(0);

  const mudarAba = useMemo(() => {
    console.log(indexAtual);
    let listaAlterada = sideList;
    listaAlterada.forEach((item, index) => {
      if(indexAtual == index) {
        listaAlterada[index].current = true;
      } else {
        listaAlterada[index].current = false;
      }
    })
    setSideList(listaAlterada);
  }, [indexAtual])

  return (
    <>
      <div className="min-h-full pb-4">
        <div className="bg-gray-800 pb-32">
          <Header name="Configurações"/>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">Pedidos</h1>
            </div>
          </header>
        </div>

        <main className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {subNavigation.map((item, index) => (
                      <span
                        key={item.name}
                        // href={item.href}
                        onClick={() => setIndexAtual(index)}
                        className={classNames(
                          index === indexAtual
                            ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 cursor-pointer'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 cursor-pointer',
                          'group border-l-4 px-3 py-2 flex items-center text-sm font-medium'
                        )}
                        aria-current={index === indexAtual ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            index === indexAtual
                              ? 'text-te\al-500 group-hover:text-teal-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </span>
                    ))}
                  </nav>
                </aside>

                {
                  indexAtual == 0 ?
                    <FormPerfil /> : 
                    indexAtual == 1 ? 
                      <FormTarifas /> :
                        indexAtual == 2 ? 
                        <FormHorarios /> : ''
                }

              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
