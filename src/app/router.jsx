import { createBrowserRouter } from "react-router";
import { NotesPage } from "@pages/NotesPage";
import { HomePage } from "@pages/HomePage";
import { TestPage } from "@pages/TestPage";
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
            {
                path: "/test",
                Component: TestPage,
            },
        ],
    },
]);
