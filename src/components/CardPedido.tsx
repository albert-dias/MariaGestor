import { ButtonHTMLAttributes } from "react";
import { IPedido } from "../pages/Pedidos";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dadosModal: IPedido;
}

export function CardPedidos({ dadosModal, ...rest }: Props) {
  // console.log({...rest})
  return (
    <button {...rest} className="cursor-pointer border border-green-300 p-2 mt-4 rounded bg-green-100 hover:bg-green-200 flex-col shadow w-full">
      <div>
        <div className="flex justify-between">
          <strong className="text-neutral-700">#{dadosModal.id}</strong>
        </div>
        <div className="flex justify-between">
          <strong className="text-neutral-700">{dadosModal.cliente.nome}</strong>
          <span>{`${new Date(dadosModal.created_at).toLocaleDateString()} ${new Date(dadosModal.created_at).toLocaleTimeString()}`}</span>
        </div>
        <div>
          <span className="text-neutral-500 text-sm">{`${dadosModal.cliente.logradouro}, ${dadosModal.cliente.numero} - ${dadosModal.cliente.bairro}`}</span>
        </div>
      </div>
    </button>
  )
}