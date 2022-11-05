import { CheckIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useCallback } from 'react';
import api from '../services/api';

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
interface DataProps {
  data: ItemProps;
  renderLista: (value: string) => void;
}
interface ICategoria {
  id: number;
  nome: string;
  is_active: number;
}

export function CardCardapioPromocao({ data, renderLista }: DataProps) {


  const handleRegisterProduct = useCallback(async () => {
    const fd = new FormData();

    fd.append("id_empresa", '1')
    fd.append("nome", data.nome)
    fd.append("id_categoria", '5')
    fd.append("descricao", data.descricao)
    fd.append("valor", data.valor.toString())
    fd.append("tempo_preparo", data.tempo_preparo.toString());

      api
        .put(`/cardapios/${data.id}`, fd)
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          renderLista
        });
    
  }, []);


  return (
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
          {/* <dd className="text-sm text-gray-500">{data.descricao}</dd> */}
          <dt className="sr-only">Role</dt>
          {/* <dd className="mt-3">
            {data.is_active === 1 ? <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              Ativo
            </span> :
              <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                Inativo                
              </span>}
          </dd> */}
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`#`}
              onClick={() => handleRegisterProduct()}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              {/* <PencilSquareIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
              <span className="ml-3">Pausar Promoção</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}