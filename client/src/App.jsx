import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import FundsPage from './pages/FundsPage'
import FundDetails from './pages/FundDetails'
import SavedFunds from './pages/SavedFunds'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/funds/:query',
      element: <FundsPage />,
    },
    {
      path: "/:schemeCode",
      element:
        <ProtectedRoute>
          <FundDetails />
        </ProtectedRoute>
    },
    {
      path: '/saved-funds',
      element:
        <ProtectedRoute>
          <SavedFunds />
        </ProtectedRoute>
    }

  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
