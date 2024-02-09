import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./app/page";
import { FoldersPage } from "./app/notes/page";
import { NotesPage } from "@/app/notes/[id]/page";
import { NotePage } from "@/app/notes/[id]/[noteId]/page";

const router = createBrowserRouter([
  {
    path: "/*",
    element: (
      <Home>
        <Outlet />
      </Home>
    ),

    children: [
      {
        path: "notes",
        element: (
          <FoldersPage>
            <Outlet />
          </FoldersPage>
        ),
        children: [
          {
            path: ":id",
            element: (
              <NotesPage>
                <Outlet />
              </NotesPage>
            ),
            children: [
              {
                path: ":noteId",
                element: <NotePage />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
