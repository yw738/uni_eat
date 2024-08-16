import { createSSRApp } from "vue";
import App from "./App.vue";
import uviewPlus from "uview-plus";
import * as Pinia from 'pinia';	

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus)
  // 状态管理
  const store = Pinia.createPinia();	// 配置pinia第二句
  // 持久化
  app.use(store);
  return {
    app,
    Pinia								
  };
}
