import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Admin from "./pages/adminpages/Admin";
import AdminUsers from "./pages/adminpages/AdminUsers";
import AdminProducts from "./pages/adminpages/AdminProducts";
import AdminOrders from "./pages/adminpages/AdminOrders";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Order from "./pages/Order";
import UpdateUser from "./pages/UpdateUser";
import AdminUpdateUser from "./pages/adminpages/AdminUpdateUser";
import AdminUpdateProduct from "./pages/adminpages/AdminUpdateProduct";

function App() {
  const queryClient = new QueryClient();
  const currentUser = useSelector((state) => state.user.currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/updateUser",
          element: currentUser ? <UpdateUser /> : <Navigate to="/" />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/order",
          element: currentUser ? <Order /> : <Navigate to="/" />,
        },
        {
          path: "/results",
          element: <Search />,
        },
        {
          path: "/admin",
          element: currentUser?.isAdmin ? <Admin /> : <Navigate to="/" />,
        },
        {
          path: "/admin/users",
          element: currentUser?.isAdmin ? <AdminUsers /> : <Navigate to="/" />,
        },
        {
          path: "/admin/user/:id",
          element: currentUser?.isAdmin ? (
            <AdminUpdateUser />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "/admin/products",
          element: currentUser?.isAdmin ? (
            <AdminProducts />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "/admin/product/:id",
          element: currentUser?.isAdmin ? (
            <AdminUpdateProduct />
          ) : (
            <Navigate to="/" />
          ),
        },
        {
          path: "/admin/orders",
          element: currentUser?.isAdmin ? <AdminOrders /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

const Layout = () => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className={`${darkMode && "dark"}`}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
