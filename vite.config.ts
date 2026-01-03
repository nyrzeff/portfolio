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
            },
        },
    },
});
