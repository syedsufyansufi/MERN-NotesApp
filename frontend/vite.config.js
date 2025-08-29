import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
// import daisyui from "daisyui";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});

// // daisyui config
// daisyui({
//   theme: ["forest"],
// });
