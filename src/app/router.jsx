import { createBrowserRouter } from "react-router";
import { NotesPage } from "../components/NotesPage";
import { HomePage } from "../components/HomePage";
import App from "./App";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "/notes",
                Component: NotesPage,
            },
        ],
    },
]);
