import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/errorPage'
import Home from './routes/home'

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            errorElement: <ErrorPage />,
        },
    ])
    return <RouterProvider router={router} />
}

export default App
