import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve("./src"),
            "@pages": path.resolve("./src/app/pages"),
            "@components": path.resolve("./src/components"),
            "@hooks": path.resolve("./src/hooks"),
            "@svg": path.resolve("./src/assets/svg"),
        },
    },
});
