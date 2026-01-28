import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import pkg from "./package.json";

const target = process.env.BUILD_TARGET || "dev";
const isDemo = target === "demo";
const isDev = target === "dev" || process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [react()],
  root: isDemo ? "src/demo" : ".",
  // relative paths for GitHub Pages & local file previews
  base: "./",

  build: isDemo
      ? {
        // 🎯 GitHub Pages demo build (from src/demo root)
        outDir: "../../dist-demo",
        emptyOutDir: true,
        sourcemap: true,
      }
      : {
        // 📦 Library build
        lib: {
          entry: resolve(__dirname, "src/lib/index.ts"),
          name: "MuiThemeManager",
          formats: ["es", "cjs"],
          fileName: (format) => (format === "es" ? "index.esm.js" : "index.cjs.js"),
        },
        rollupOptions: {
          // 🔒 Externalize all peer deps *and* their subpaths
          external: (id: string) =>
              /^(react|react-dom|@mui\/material|@mui\/icons-material|@mui\/x-data-grid|@emotion\/react|@emotion\/styled)(\/.*)?$/.test(id),
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

  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      // 🧭 During demo *dev*, force the package name to source to keep exactly one React
      ...(isDemo && isDev
          ? [{ find: (pkg as any).name, replacement: resolve(__dirname, "src/lib/index.ts") }]
          : []),
    ],
    dedupe: ["react", "react-dom"],
  },

  // ✅ Let Vite prebundle React so jsx-runtime has named exports
  // (Do NOT exclude react/react-dom here)
  optimizeDeps: {
    include: ["react/jsx-runtime"], // extra-safe
  },
});
