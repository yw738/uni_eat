import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// https://vitejs.dev/config/
export default defineConfig({
  devServer: {
    port: 8080, // 这里修改为你想要的端口号
  },
  plugins: [uni()],
});
