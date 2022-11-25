import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
      host: "0.0.0.0"
    },
    resolve: {
      alias: {
          "app": path.resolve(__dirname, "./src"),
          "components": path.resolve(__dirname, "./src/components"),
          "pages": path.resolve(__dirname, "./src/pages"),
          "context": path.resolve(__dirname, "./src/context"),
          "utils": path.resolve(__dirname, "./src/utils"),
          "hooks": path.resolve(__dirname, "./src/hooks"),
      }
    }
})
