import { CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface ItemProps{
  name: string;
  price: string;
  title: string;
  role: string;
  email: string;
  telephone: string;
  imageUrl: string;
}

interface DataProps{
  data: ItemProps;
}

export function CardCardapio({data}: DataProps) {
  return (
    <li
          key={data.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-slate-50 text-center shadow"
        >
          <div className="flex flex-1 flex-col p-1">
            <img className="mx-auto h-32 w-full flex-shrink-0 rounded" src={data.imageUrl} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{data.name} - R${data.price}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{data.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
               { data.role ==="Ativo" ? <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {data.role}
                </span> :
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  {data.role}
                </span>}
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${data.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="ml-3">Editar</span>
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${data.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                >
                  {data.role ==="Ativo" ?
                  <XMarkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />:
                  <CheckIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  }
                  <span className="ml-3">{data.role ==="Ativo" ? "Desativar" : "Ativar"}</span>
                </a>
              </div>
            </div>
          </div>
        </li>
  )
}