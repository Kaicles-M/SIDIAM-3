import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./Layout";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { PublicOnlyRoute } from "./auth/PublicOnlyRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Avaliacoes from "./pages/Avaliacoes";
import Turmas from "./pages/Turmas";
import BNCC from "./pages/BNCC";
import Resultados from "./pages/Resultados";
import Intervencoes from "./pages/Intervencoes";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

export const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/login"),
  },
  {
    Component: PublicOnlyRoute,
    children: [{ path: "/login", Component: Login }],
  },
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          { path: "dashboard", Component: Dashboard },
          { path: "avaliacoes", Component: Avaliacoes },
          { path: "turmas", Component: Turmas },
          { path: "bncc", Component: BNCC },
          { path: "resultados", Component: Resultados },
          { path: "intervencoes", Component: Intervencoes },
          { path: "relatorios", Component: Relatorios },
          { path: "configuracoes", Component: Configuracoes },
          { path: "*", loader: () => redirect("/dashboard") },
        ],
      },
    ],
  },
  {
    path: "*",
    loader: () => redirect("/login"),
  },
]);
