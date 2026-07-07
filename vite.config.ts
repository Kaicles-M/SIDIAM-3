import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const assetDir = fileURLToPath(new URL("./src/assets/", import.meta.url));

function figmaAssetResolver() {
  return {
    name: "figma-asset-resolver",
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) {
        return new URL(id.replace("figma:asset/", ""), `file:///${assetDir.replace(/\\/g, "/")}/`).pathname;
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
