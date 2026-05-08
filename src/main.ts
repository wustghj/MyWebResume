import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/global.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')
