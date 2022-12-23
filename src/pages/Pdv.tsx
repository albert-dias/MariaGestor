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
}

interface ICategoria {
  id: number;
  nome: string;
  is_active: number;
}



export function Pdv() {

  const FichaPedidos = styled.div`
      padding-right: 34px;
      padding-top: 24px;
      height: 100%;

    div#content {
      background-color: #fff;
      border-radius: 10px;
      width: 100%;
      height: calc(100% - 70px);
      margin: 14px;
      padding: 18px;

      ul {
        height: calc(100% - 196px);
      }

      hr {
        border: 1px solid #b3b3b3;
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
    box-shadow: 1px 1px 20px rgba(0,0,0,0.2);

    :hover {
      box-shadow: 1px 1px 16px rgba(0,0,0,0.01);
    }

    img {
      max-width: 120px;
      margin: auto;
      max-height: 70%;
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
      height: 90px;
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
            margin: 20px;
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
      grid-template-columns: 60px 1fr 1fr 1fr;
      height: 40px;
      margin-top: 2px;
      border-bottom: 1px solid gray;
      div.img {
        img {
          height: 40px;
        }
      }
    `;

  let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let mesas = [0, 0, 0, 0, 0, 0];
  const { user } = useAuth();


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
                  <div>
                    <div className="font-light text-sm">Mesa</div>
                    <div className="text-3xl text-center">{index + 1}</div>
                  </div>
                </li>
              )
            })}

            <li className={`py-[4px] px-4 mb-3`} title="Iniciar uma nova mesa">
              <div>
                <div className="font-light text-sm">Nova Mesa</div>
                <div className="text-4xl text-center">+</div>
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
                    cards.map((element, index) => {
                      return (
                        <ProdCard >
                          <img src={'https://www.drogariaminasbrasil.com.br/media/product/084/refrigerante-coca-cola-lata-350ml-80c.jpg'} alt="" />
                          <div>
                            <h6 className="text-[12px] mb-[-6px] mt-2 font-bold">Coca Lata 300ml</h6>
                            <span className="text-sm mt-0">R$ 3,99</span>
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
                    <h4>Resumo da Venda</h4>
                  </div>
                  <hr />
                  <ul>
                    <SelectedItem >
                      <div className="img">
                        <img src={'https://www.drogariaminasbrasil.com.br/media/product/084/refrigerante-coca-cola-lata-350ml-80c.jpg'} alt="" />
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </SelectedItem>
                    <SelectedItem >
                      <div className="img">
                        <img src={'https://www.drogariaminasbrasil.com.br/media/product/084/refrigerante-coca-cola-lata-350ml-80c.jpg'} alt="" />
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </SelectedItem>
                    <SelectedItem >
                      <div className="img">
                        <img src={'https://www.drogariaminasbrasil.com.br/media/product/084/refrigerante-coca-cola-lata-350ml-80c.jpg'} alt="" />
                      </div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </SelectedItem>
                  </ul>
                  <hr />
                  <div className="flex justify-between">
                    <span><strong>subtoal</strong></span>
                    <span><strong>8888</strong></span>
                  </div>
                  <div className="flex justify-between">
                    <span>subtoal</span>
                    <span>8888</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>subtoal</strong></span>
                    <span><strong>8888</strong></span>
                  </div>

                  <button
                    type="button"
                    className={`mt-2 justify-center btn_action px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm bg-green-500  text-white hover:bg-green-600 focus:outline-none`}
                  >
                    Confirmar
                  </button>

                  <button
                    type="button"
                    className={`mt-2 justify-center btn_action px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg text-green-600 shadow-sm bg-gray-0 border-green-500 hover:text-gray-50 hover:bg-green-500 focus:outline-none`}
                  >
                    Cancelar
                  </button>

                </div>
              </FichaPedidos>
            </div>
          </div>
        </div>

      </Main>
    </>
  );
}
