import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./assets/styles/bootstrap.custom.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from "./components/screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./components/screens/CartScreen";
import AdminRoute from "./components/AdminRoute";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ShippingScreen from "./components/screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentScreen from "./components/screens/PaymentScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import OrderScreen from "./components/screens/OrderScreen";
import ProfileScreen from "./components/screens/ProfileScreen";
import OrderListScreen from "./components/screens/admin/OrderListScreen";
import ProductListScreen from "./components/screens/admin/ProductListScreen";
import ProductEditScreen from "./components/screens/admin/ProductEditScreen";
import UserEditScreen from "./components/screens/admin/UserEditScreen";
import UserListScreen from "./components/screens/admin/UserListScreen";

// Define the router correctly with proper JSX syntax
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />} />
    <Route path='/search/:keyword' element={<HomeScreen />} />
    <Route path='/page/:pageNumber' element={<HomeScreen />} />
    <Route
      path='/search/:keyword/page/:pageNumber'
      element={<HomeScreen />}
    />
    <Route path='/product/:id' element={<ProductScreen />} />
    <Route path='/cart' element={<CartScreen />} />
    <Route path='/login' element={<LoginScreen />} />
    <Route path='/register' element={<RegisterScreen />} />
    {/* Registered users */}
    <Route path='' element={<PrivateRoute />}>
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
    </Route>
    {/* Admin users */}
    <Route path='' element={<AdminRoute />}>
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route
        path='/admin/productlist/:pageNumber'
        element={<ProductListScreen />}
      />
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
    </Route>
  </Route>
)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <HelmetProvider>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </HelmetProvider>
</React.StrictMode>
);

reportWebVitals();
