import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  assetsInclude: ["**/*.md"],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `assets/[name].[ext]`
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
