import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/global.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

createApp(App).mount('#app')
