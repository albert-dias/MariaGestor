import { ButtonHTMLAttributes } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  
}

export function CardPedidos({...rest}: Props) {
  console.log({...rest})
  return (
    <button {...rest} className="cursor-pointer border border-green-300 p-2 rounded bg-green-100 hover:bg-green-200 flex-col shadow w-full">
      <div>
        <div className="flex justify-between">
          <strong className="text-neutral-700">Albert Dias</strong>
          <span>18h45</span>
        </div>
        <div>
          <span className="text-neutral-500 text-sm">Rua Cesimar Borges, 1457 - Candelária</span>
        </div>
      </div>
    </button>
  )
}