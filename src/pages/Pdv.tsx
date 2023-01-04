import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../components/Assets/Logo";
import { useAuth } from "../hook/auth";
import api from "../services/api";


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
  quantidade: number;
}

interface IMesa {
  itens: ItemProps[];
}

interface ICategoria {
  id: number;
  nome: string;
  is_active: number;
}

const FichaPedidos = styled.div`
      padding-right: 34px;
      padding-top: 18px;
      height: 100%;

    div#content {
      background-color: #fff;
      border-radius: 10px;
      width: 100%;
      box-shadow: 1px 1px 20px rgba(0,0,0,0.3);
      height: calc(100% - 58px);
      margin: 14px;
      padding: 18px;

      ul {
        height: calc(100% - 156px);
        overflow-y: auto;
        position: relative;
      }

      hr {
        border: 1px solid #bebebe;
        margin-bottom: 4px;
      }

      button.btn_action {
        width: 100%;
        text-align: center;
      }
    }
  `;

const ProdCard = styled.li`
    cursor: pointer;
    background-color: #fff;
    border-radius: 10px;
    height: 150px;
    width: 100%;
    /* margin: 14px; */
    padding: 16px;
    box-shadow: 1px 1px 20px rgba(0,0,0,0.3);
    :hover {
      box-shadow: 1px 1px 16px rgba(0,0,0,0.01);
    }
    img {
      max-width: 120px;
      margin: auto;
      max-height: 70%;
    }
    div {
      h6 {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }
  `;

const Main = styled.main`
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    header {
      background-color: #0a0c1b;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 36px;
    }

    div#div_mesas {
      width: 100%;
      height: 80px;
      padding-left: 58px;
      padding-right: 36px;
      padding-top: 11px;
      display: flex;
      justify-content: space-between;

      
      ul {
        li {
          margin-right: 10px;
          cursor: pointer;
          background-color: #374151;
          border-radius: 8px;
          :hover {
            background: #ffffff58;
          }
          div.rrotulo {
          }
          div.numero {
            margin-top: -4px;
            font-size: 29px;
          }
          div.nova_mesa {
            margin-top: -6px;
          }
        }

        li.disabled {
          opacity: .3;
        }
      }
    }

    div#div_middle_content {
      display: flex;
      width: 100%;
      height: 100%;

      div#side_bar {
        height: calc(100% - 120px);
        width: 60px;
      }

      div#main_content {
        color: #0a0c1b;
        width: 100%;
        display: grid;
        grid-template-columns: 66% 33% !important;

        
        div#produtos {
          height: calc(100% - 120px);
          padding-left: 12px;
          padding-right: 8px;
          /* background-color: #9c9c9c; */

          div#div_ul {
            height: calc(100vh - 188px);
            margin: 8px 20px;
            /* background-color: red; */
            overflow-y: auto;

            ul {
              text-align: center;
              justify-content: start;
              margin: 24px auto;
              list-style: none;
              display: grid;
              grid-column-gap: 22px;
              grid-row-gap: 26px;
              grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            }
          }
        }

        div#resumo {
          height: calc(100% - 120px);
        }
      }
    }

  `;

const SelectedItem = styled.li`
      display: grid;
      grid-template-columns: 60px 1fr 1fr .60fr;
      height: 44px;
      margin-top: 2px;
      border-bottom: 1px solid #dfdfdf;
      div.img {
        overflow-x: hidden;
        img {
          height: 38px;
          max-width: 38px;
          margin-top: 2px;
        }
      }
      div.item {
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        strong {
          font-size: 14px;
        }
        span {
          display: block;
          margin-top: -6px;
          font-size: 14px;
        }
        :hover {
          text-overflow: unset;
          overflow-x: unset;
          strong {
            position: absolute;
            margin-top: 2px;
          }
          span {
            margin-top: 18px;
          }
        }
      }
      div.quantidade {
        text-align: center;
        margin-top: 2px;
        :hover {
          button.btn_count {
            opacity: 1;
          }
          input {
            border: 1px solid #e2e2e2;
          }
        }
        button.btn_count {
          background-color: #eeeeee;
          height: 30px !important;
          width: 24px;
          margin-top: 4px;
          position: absolute;
          opacity: 0;
          :hover {
            background-color: #d6d6d6;
          }
          :active {
            background-color: #b9b9b9;
          }
        }
        button.sub {
          border-radius: 4px 0px 0px 4px;
          margin-left: -24px;
        }
        button.som {
          border-radius: 0px 4px 4px 0px;
        }
        input {
          text-align: center;
          font-size: 18px;
          height: 30px;
          margin-top: 4px;
          width: 40px;
          border: 1px solid #ffffff;
        }
      }
      div.valorTotal {
        text-align: right;
        font-size: 18px;
        padding-right: 4px;
        padding-top: 8px;
      }
    `;


export function Pdv() {

  // const mesas = [0,0,0,0,0,0];

  const { user } = useAuth();
  const [items, setItems] = useState<ItemProps[]>([]);
  const [itensSelecionados, setItemSelecionado] = useState<ItemProps[]>([]);
  const [valorProdutos, setValorProdutos] = useState(0);
  const [valorFinal, setValorFinal] = useState(0);
  const [mesas, setMesas] = useState<ItemProps[][]>([]);
  const [itensNovaMesa, setItemNovaMesa] = useState<ItemProps[]>([]);

  const loadCardapio = useCallback(async () => {
    api
      .get(`/cardapios/empresa/${user.id_empresa}`)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          setItems(res.data);
        }
      })
      .catch((e) => console.log(e));
  }, []);


  useEffect(() => {
    loadCardapio();
  }, []);


  const selecionarItem = (item: ItemProps) => {
    let temp = itensSelecionados;
    let existe = false;
    let tmp_valorProdutos = 0;
    let tmp_valorFinal = 0;
    let tmp_descontos = 0;

    if (temp.length > 0) {
      temp.forEach((i, index) => {
        if (i.id == item.id) {
          i.quantidade = (i.quantidade + 1);
          existe = true;
        }
        tmp_valorProdutos = tmp_valorProdutos + (i.valor * i.quantidade);
      });
      if (!existe) {
        tmp_valorProdutos = (tmp_valorProdutos + item.valor);
        item.quantidade = 1;
        temp.push(item);
      }
    } else {
      temp = [];
      tmp_valorProdutos = item.valor;
      item.quantidade = 1;
      temp.push(item);
    }
    tmp_valorFinal = (tmp_valorProdutos - tmp_descontos);
    setValorFinal(tmp_valorFinal);
    setValorProdutos(tmp_valorProdutos);
    setItemSelecionado(temp);
  }


  const addUnidade = (id: number) => {
    let temp = itensSelecionados;
    let tmp_valorProdutos = 0;
    let tmp_valorFinal = 0;
    let tmp_descontos = 0;
    temp.forEach((i) => {
      if (i.id == id) {
        i.quantidade = (i.quantidade + 1);
      }
      tmp_valorProdutos = tmp_valorProdutos + (i.valor * i.quantidade);
    });
    tmp_valorFinal = (tmp_valorProdutos - tmp_descontos);
    setValorFinal(tmp_valorFinal);
    setValorProdutos(tmp_valorProdutos);
    setItemSelecionado(temp);
  }


  const removeUnidade = (id: number) => {

    let temp = itensSelecionados;
    let tmp_valorProdutos = 0;
    let tmp_valorFinal = 0;
    let tmp_descontos = 0;

    temp.forEach((i, index) => {
      if (i.id == id) {
        if (i.quantidade == 1) {
          delete (temp[index]);
        } else {
          i.quantidade = (i.quantidade - 1);
        }
      }
    });

    temp.forEach((i, index) => {
      tmp_valorProdutos = tmp_valorProdutos + (i.valor * i.quantidade);
    });

    tmp_valorFinal = (tmp_valorProdutos - tmp_descontos);
    setValorFinal(tmp_valorFinal);
    setValorProdutos(tmp_valorProdutos);
    setItemSelecionado(temp);
  }


  const novaMesa = () => {

    let temp_mesa = mesas;
    temp_mesa.push(itensNovaMesa);

    setMesas(temp_mesa);
  }

  return (
    <>
      <Main className="bg-gray-700 text-white">
        <header>
          <div></div>
          <div className="flex">
            <span className="pt-1 mr-3">
              {user.fullname}
            </span>
            <Logo />
          </div>
        </header>

        <div id="div_mesas" className="bg-gray-900">
          <ul className="flex">
            {mesas.map((el, index) => {
              return (
                <li className={`py-[4px] px-6 mb-3 ${index > 0 ? 'disabled' : ''}`}>
                  <div className="font-light text-sm rotulo">Mesa</div>
                  <div className="text-3xl text-center numero">{index + 1}</div>
                </li>
              )
            })}

            <li className={`py-[4px] px-4 mb-3`} title="Iniciar uma nova mesa">
              <div onClick={novaMesa}>
                <div className="font-light text-sm">Nova Mesa</div>
                <div className="text-4xl text-center nova_mesa">+</div>
              </div>
            </li>

          </ul>

          <button
            type="button"
            className={`mt-3 px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm bg-orange-500  text-white hover:text-gray-900 hover:bg-gray-50 focus:outline-none`}
          >
            Nova Mesa
          </button>

        </div>
        <div id="div_middle_content">
          <div id="side_bar" className="bg-gray-900">
          </div>
          <div id="main_content">
            <div id="produtos">
              <div id="div_ul">
                <ul>
                  {
                    items.map((element, index) => {
                      return (
                        <ProdCard onClick={() => selecionarItem(element)} >
                          <img src={element.foto_url} alt="" />
                          <div>
                            <h6 className="text-[12px] mb-[-6px] mt-2 font-bold">{element.descricao}</h6>
                            <span className="text-sm mt-0">{element.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </ProdCard>
                      )
                    })
                  }
                </ul>
              </div>

            </div>
            <div id="resumo">
              <FichaPedidos>
                <div id="content">
                  <div id="header">
                    <h4><b>Resumo da Venda</b></h4>
                  </div>
                  <hr />
                  <ul>
                    {

                      itensSelecionados.map((item, index) => {
                        return (

                          <SelectedItem >
                            <div className="img">
                              <img src={item.foto_url} alt="" />
                            </div>

                            <div className="item">
                              <strong>{item.descricao}</strong>
                              <span>{item.valor.toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
                            </div>

                            <div className="quantidade">
                              <button className="btn_count sub" onClick={() => removeUnidade(item.id)} >-</button>
                              <input type="text" readOnly value={item.quantidade} />
                              <button className="btn_count som" onClick={() => addUnidade(item.id)} >+</button>
                            </div>

                            <div className="valorTotal">
                              <span>{(item.valor * item.quantidade).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
                            </div>
                          </SelectedItem>

                        )
                      })
                    }

                  </ul>
                  <hr />
                  <div className="flex justify-between">
                    <span><strong>Subtotal</strong></span>
                    <span><strong>{valorProdutos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></span>
                  </div>
                  <div className="flex justify-between">
                    <span>Descontos</span>
                    <span>- 0,00</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Total</strong></span>
                    <span><strong>{valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></span>
                  </div>

                  <button
                    type="button"
                    className={`mt-2 justify-center btn_action px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm bg-green-500  text-white hover:bg-green-600 focus:outline-none`}
                  >
                    Confirmar
                  </button>

                  {/* <button
                    type="button"
                    className={`mt-2 justify-center btn_action px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg text-green-600 shadow-sm bg-gray-0 border-green-500 hover:text-gray-50 hover:bg-green-500 focus:outline-none`}
                  >
                    Cancelar
                  </button> */}

                </div>
              </FichaPedidos>
            </div>
          </div>
        </div>

      </Main>
    </>
  );
}
