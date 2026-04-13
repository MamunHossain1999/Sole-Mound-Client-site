import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";

import router from "./router/router";
import { store } from "./Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
