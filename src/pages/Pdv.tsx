import styled from "styled-components";
import Logo from "../components/Logo";
import { useAuth } from "../hook/auth";

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
    min-width: 140px;
    margin: 14px;
    padding: 16px;
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
      padding-left: 60px;
      padding-right: 36px;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;

      ul {
        li {
          border-radius: 8px;
          :hover {
            background: #ffffff1a;
          }

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
          padding: 0px 24px;
          ul {
            text-align: center;
            justify-content: start;
            margin: 24px auto;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
          }
          overflow-y: auto;
        }

        div#resumo {
          height: calc(100% - 120px);
        }
      }
    }

  `;

  let cards = [1, 2, 3, 4, 5, 6, 7];
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
                <li className="mr-2 py-1 px-8">
                  <div>
                    <div className="font-light text-sm">Mesa</div>
                    <div className="text-3xl text-center">{index + 1}</div>
                  </div>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className={`mt-2 px-10 inline-flex h-10 items-center py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm bg-orange-500  text-white hover:text-gray-900 hover:bg-gray-50 focus:outline-none`}
          >
            Nova Mesa
          </button>

        </div>
        <div id="div_middle_content">
          <div id="side_bar" className="bg-gray-900">
          </div>
          <div id="main_content">
            <div id="produtos">
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
            <div id="resumo">
              <FichaPedidos>
                <div id="content">
                  <div id="header">
                    <h4>Resumo da Venda</h4>
                  </div>
                  <hr />
                  <ul>
                    <li>
                      <div>
                        aaaaaaa
                      </div>
                    </li>
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
