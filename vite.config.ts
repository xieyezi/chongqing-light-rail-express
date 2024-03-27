import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    VitePWA({
      manifest: {
        name: "Ding",
        description: "ding",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/64.png",
            sizes: "64x64",
            type: "image/png"
          },
          {
            src: "192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
