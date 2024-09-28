import App from "../App";
import Shop from './shop'
import About from './about'
import Home from './home'

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
        }
    ],
    },
  ];
  
  export default routes;