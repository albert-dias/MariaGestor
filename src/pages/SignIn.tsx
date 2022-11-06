import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styled from "styled-components";
import FullLogo from "../components/Assets/FullLogo";
import { useAuth } from "../hook/auth";

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState('');
  const [marginTop, setMarginTop] = useState(0);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = useCallback(async () => {
    if (document === '' || password === '') {
      toast.error('Todos os campos são obrigatórios')
    }

    signIn({ document, password })
  }, [document, password, toast]);

  useEffect(() => {
    if (user) {
      navigate("/pedidos")
    }
  }, [user])


  const DivSvg = styled.div`

    @media only screen and (min-height: 900px) {
      margin-top: 120px;
    }
  `;

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">Bem vindo ao MariaGestor</h2> */}
          <DivSvg>
          </DivSvg>

        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg hover:shadow-md sm:rounded-lg sm:px-10">
            <FullLogo />
            <h5 className="mt-[-10px] mb-4 text-center font-medium tracking-tight text-gray-500">Soluções em comércio</h5>
            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  CPF
                </label>
                <div className="mt-1">
                  <input
                    id="document"
                    name="document"
                    type="text"
                    autoComplete="CPF"
                    onChange={(e) => setDocument(e.target.value)}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Mantenha-me conectado
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mb-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Entrar
                </button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Ou{' '}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              entre em contato para maiores informações
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
