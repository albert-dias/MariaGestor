import { ButtonHTMLAttributes } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dadosModal: {
    cliente: {
      nome: string
      logradouro: string
      numero: string
      bairro: string
    },
    created_at: string
  }
}

export function CardPedidos({...rest}: Props) {
  // console.log({...rest})
  return (
    <button {...rest} className="cursor-pointer border border-green-300 p-2 mt-4 rounded bg-green-100 hover:bg-green-200 flex-col shadow w-full">
      <div>
        <div className="flex justify-between">
          <strong className="text-neutral-700">{rest.dadosModal.cliente.nome}</strong>
          <span>{`${new Date(rest.dadosModal.created_at).toLocaleDateString()} ${new Date(rest.dadosModal.created_at).toLocaleTimeString()}`}</span>
        </div>
        <div>
          <span className="text-neutral-500 text-sm">{`${rest.dadosModal.cliente.logradouro}, ${rest.dadosModal.cliente.numero} - ${rest.dadosModal.cliente.bairro}`}</span>
        </div>
      </div>
    </button>
  )
}