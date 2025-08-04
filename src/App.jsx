import { Dashboard, AboutUs, Customer } from "./page";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./rootLayout/RootLayout";
import Product from "./rootLayout/Product";
import Error from "./Error/Error";
import LinkCategory from "./ProductPage/LinkCategory";
import OrderProduct from "./ProductPage/OrderProduct";
import Checkouts from "./CheckOut/Checkouts";
import Account from "./rootLayout/Account";
import { Navigate } from "react-router-dom";
import {
  AddressBook,
  PersonalDetial,
  Point,
  Purchased,
  SettingPassword,
  Wishlist,
} from "./Account";
import DetialProduct from "./Account/DetialProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <Product />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <LinkCategory />,
          },
          {
            path: ":id",
            element: <OrderProduct />,
            errorElement: <Error />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "review",
        element: <Customer />,
      },
      {
        path: "checkouts",
        element: <Checkouts />,
      },
      {
        path: "account",
        element: <Account />,
        errorElement: <Error />,
        children: [
          {
            index: true, // ✅ បង្ហាញ PersonalDetial ដោយលំនាំដើម
            element: <Navigate to="editprofile" replace />,
          },
          {
            path: "editprofile",
            element: <PersonalDetial />,
          },
          {
            path: "editaddress",
            element: <AddressBook />,
          },
          {
            path: "purchased",
            element: <Purchased />,
            errorElement: <Error />,
            children: [
              {
                path: "detail/:id",
                element: <DetialProduct />,
              },
            ],
          },
          {
            path: "pointlist",
            element: <Point />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
          },
          {
            path: "password",
            element: <SettingPassword />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
