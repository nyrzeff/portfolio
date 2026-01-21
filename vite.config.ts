import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr(), nodePolyfills()],
    assetsInclude: ["**/*.md"],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: `assets/[name].[ext]`,
                manualChunks(id) {
                    if (
                        id.includes("react") ||
                        id.includes("react-dom") ||
                        id.includes("react-router")
                    ) {
                        return "react-vendor";
                    }
                    if (
                        id.includes("lodash") ||
                        id.includes("date-fns") ||
                        id.includes("axios") ||
                        id.includes("gray-matter") ||
                        id.includes("rehype-raw") ||
                        id.includes("sass")
                    ) {
                        return "utils-vendor";
                    }
                    if (
                        id.includes("chart.js") ||
                        id.includes("recharts") ||
                        id.includes("d3")
                    ) {
                        return "chart-vendor";
                    }
                    if (
                        id.includes("lucide") ||
                        id.includes("react-icons") ||
                        id.includes("@iconify")
                    ) {
                        return "icons-vendor";
                    }
                    return "vendor";
                },
            },
        },
    },
});
