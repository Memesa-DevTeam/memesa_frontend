import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './MainPage.vue'
import 'ant-design-vue/dist/antd.less'

const app = createApp(App)
app.use(Antd).mount("#app")
