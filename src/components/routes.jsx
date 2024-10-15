import App from "../App";
import Shop from './shop'
import About from './about'
import Home from './home'
import Checkout from './checkout'

import ErrorPage from './errorPage'

const routes = [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "shop",
            element: <Shop />,
        },
        {
            path: "about",
            element: <About />,
        }, 
        {
            path: "checkout",
            element: <Checkout />,
        }
    ],
    },
  ];
  
  export default routes;