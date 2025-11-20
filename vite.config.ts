import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import pkg from "./package.json";

const target = process.env.BUILD_TARGET || "dev";
const isDemo = target === "demo";
const isDev = target === "dev" || process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],

  // Use demo folder as root in both demo + dev
  root: isDemo ? "src/demo" : ".",
  base: './',

  build: isDemo
      ? {
        // 🎯 GitHub Pages demo build
        outDir: "../../dist-demo", // relative to "src/demo"
        emptyOutDir: true,
        sourcemap: true,
      }
      : {
        // 📦 Library build
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "MuiThemeManager",
          formats: ["es", "cjs"],
          fileName: (format) =>
              format === "es" ? "index.esm.js" : "index.cjs.js",
        },
        rollupOptions: {
          external: [
            ...Object.keys(pkg.peerDependencies || {}),
          ],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
              "@mui/material": "MaterialUI",
              "@mui/icons-material": "MaterialIcons",
              "@emotion/react": "EmotionReact",
              "@emotion/styled": "EmotionStyled",
            },
          },
        },
        sourcemap: true,
        emptyOutDir: true,
      },

  // 🧩 Conditional aliasing
  resolve: {
    alias: [
      // 👇 This forces Vite to treat "../lib" as an alias
      {
        find: "../lib",
        replacement: isDemo
            ? resolve(__dirname, "dist/index.esm.js")
            : resolve(__dirname, "src/lib/index.ts"),
      },
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
});
