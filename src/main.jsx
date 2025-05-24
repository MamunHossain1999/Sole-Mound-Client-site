import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <React.StrictMode>
          <ToastContainer position="top-center" autoClose={3000} />
          <RouterProvider router={router} />
        </React.StrictMode>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
