import { ToastContainer } from 'react-toastify'
import AppProvider from './hook'
import 'react-toastify/dist/ReactToastify.css' 

import Routers from './routes'

export default function App() {
  return (
    <AppProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routers />
    </AppProvider>
  )
}
