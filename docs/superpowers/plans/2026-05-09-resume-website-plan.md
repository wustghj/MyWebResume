# Resume Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Vue 3 resume website with GSAP typographic animations and UnoCSS styling.

**Architecture:** Vue 3 SPA with `<script setup>` Composition API. Components organized by page section. Resume content lives in a typed data module. GSAP ScrollTrigger drives scroll-based reveal animations. UnoCSS provides utility-first styling with custom theme colors. No router — single-page scrolling with Intersection Observer nav highlighting.

**Tech Stack:** Vue 3, Vite, TypeScript, GSAP (ScrollTrigger + TextPlugin), UnoCSS

---

## Prerequisites

- [ ] **Check Node.js and npm**

Run:
```bash
node --version && npm --version
```
Expected: Node >= 18, npm >= 9. If missing, install via `nvm` or system package manager.

---

## File Map

```
MyWebResume/
├── index.html                          # Vite entry HTML
├── package.json                        # Dependencies + scripts
├── vite.config.ts                      # Vite + Vue plugin config
├── uno.config.ts                       # UnoCSS theme (colors, fonts, breakpoints)
├── tsconfig.json                       # TypeScript config
├── tsconfig.node.json                  # TS config for Vite/Node
├── public/
│   └── 甘鸿谨_C++后端开发.pdf           # Resume PDF (already exists, move/copy)
└── src/
    ├── main.ts                         # App entry, createApp + GSAP plugins
    ├── App.vue                         # Root: sidebar + all sections
    ├── env.d.ts                        # Vite client type declarations
    ├── data/
    │   └── resume.ts                   # Typed resume content (all text, projects, skills)
    ├── composables/
    │   ├── useActiveSection.ts         # Intersection Observer → current section ID
    │   └── useTypewriter.ts            # GSAP typewriter animation composable
    ├── components/
    │   ├── SidebarNav.vue              # Fixed sidebar/bottom nav, active dot tracking
    │   ├── HeroSection.vue             # Name, typewriter subtitle, CTAs, dot bg
    │   ├── SkillsSection.vue           # Grouped skill tag cloud
    │   ├── ExperienceSection.vue       # Parent wrapper for experience entries
    │   ├── ExperienceCard.vue          # Single experience card with sub-sections
    │   ├── MetricCallout.vue           # Metric number box (TPS, latency, etc.)
    │   ├── InternshipSection.vue       # Compact internship entry
    │   ├── EducationSection.vue        # Education + GitHub two-column
    │   └── FooterSection.vue           # Copyright + email
    └── styles/
        └── global.css                  # Font imports, CSS custom properties, resets
```

**Boundaries:**
- `resume.ts` is the single source of truth for all content — components never hardcode text
- Composables (`useActiveSection`, `useTypewriter`) encapsulate GSAP/DOM logic away from component templates
- `ExperienceCard` is generic — both KingMQ and RDStgy use the same component with different data props
- Each `<section>` registers itself via `data-section-id` attribute for the Intersection Observer

---

### Task 1: Scaffold Vite + Vue 3 + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `uno.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.ts`, `src/App.vue`, `src/env.d.ts`

- [ ] **Step 1: Initialize package.json**

```bash
cd /home/ganhongjin/MyWebResume && npm init -y
```

- [ ] **Step 2: Install dependencies**

```bash
npm install vue@^3.5 gsap@^3.12
npm install -D vite@^6 @vitejs/plugin-vue unocss@^66 typescript@^5 vue-tsc@^2 @types/node
```

- [ ] **Step 3: Write package.json scripts**

Read the generated `package.json`, then replace it with:

```json
{
  "name": "my-web-resume",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "gsap": "^3.12.0",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.7.0",
    "unocss": "^66.0.0",
    "vite": "^6.0.0",
    "vue-tsc": "^2.0.0"
  }
}
```

- [ ] **Step 4: Write index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>甘鸿谨 — C++ Backend Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,500;0,600;1,500&family=Noto+Serif+SC:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Write vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

- [ ] **Step 6: Write uno.config.ts**

```typescript
import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      'text-primary': '#1A1A1A',
      'text-secondary': '#6B7280',
      accent: '#2563EB',
      'accent-muted': '#DBEAFE',
      border: '#E5E7EB',
    },
    fontFamily: {
      serif: ['Noto Serif SC', 'Lora', 'serif'],
      sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  shortcuts: {
    'section-padding': 'py-24',
    'content-width': 'max-w-160 mx-auto px-6',
    'card': 'bg-surface border border-border rounded-lg p-6',
    'tag': 'inline-block px-3 py-1 text-sm font-mono border border-border rounded-full',
    'metric-box': 'bg-accent-muted rounded-lg p-4 text-center',
  },
})
```

- [ ] **Step 7: Write tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "src/env.d.ts"]
}
```

- [ ] **Step 8: Write tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["vite.config.ts", "uno.config.ts"]
}
```

- [ ] **Step 9: Write src/env.d.ts**

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

- [ ] **Step 10: Write src/main.ts**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import './styles/global.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

createApp(App).mount('#app')
```

- [ ] **Step 11: Write src/styles/global.css**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #FAFAFA;
  color: #1A1A1A;
  line-height: 1.7;
}

h1, h2, h3, h4 {
  font-family: 'Noto Serif SC', 'Lora', serif;
  font-weight: 600;
  line-height: 1.3;
}

code, pre, .font-mono {
  font-family: 'JetBrains Mono', monospace;
}

::selection {
  background-color: #DBEAFE;
}
```

- [ ] **Step 12: Write minimal App.vue to verify scaffolding**

```vue
<template>
  <div class="min-h-screen bg-bg text-text-primary">
    <h1 class="font-serif text-3xl p-8">甘鸿谨 — C++ Backend Developer</h1>
  </div>
</template>
```

- [ ] **Step 13: Verify scaffold**

```bash
npx vite build
```
Expected: Build succeeds with no errors. Output in `dist/`.

---

### Task 2: Resume data module

**Files:**
- Create: `src/data/resume.ts`

- [ ] **Step 1: Write resume.ts with all content from PDF**

```typescript
export interface Metric {
  value: string
  label: string
}

export interface SubSection {
  title: string
  bullets: string[]
  techTags?: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  projectTitle: string
  subtitle: string
  subSections: SubSection[]
  metrics?: Metric[]
  techStack: string[]
}

export interface SkillGroup {
  category: string
  skills: string[]
}

export const personalInfo = {
  name: '甘鸿谨',
  nameEn: 'Gan Hongjin',
  title: 'C++ Backend Developer',
  tagline: '专注于高性能网络编程与分布式系统，金融级消息中间件与量化交易平台研发经验',
  email: 'libailinux0@gmail.com',
  phone: '15623662523',
  github: 'github.com/wustghj',
  pdfPath: '/甘鸿谨_C++后端开发.pdf',
}

export const skillGroups: SkillGroup[] = [
  {
    category: '语言与核心',
    skills: ['C++11/14/17', 'STL', 'Boost', '模板元编程', '多线程(std::thread/pthread/asio)'],
  },
  {
    category: '网络与并发',
    skills: ['TCP/UDP', 'epoll/kqueue', 'libevent/libev/asio', 'Protobuf/flatbuffers', '高并发网络编程'],
  },
  {
    category: '系统与工具',
    skills: ['Linux 系统编程', '内存管理(智能指针/内存池/RAII)', '性能优化', 'Git', 'CMake', 'GDB', 'Valgrind', 'Google Benchmark'],
  },
  {
    category: '数据库与中间件',
    skills: ['MySQL 索引优化/连接池/主从复制', 'Redis 高可用/集群', 'gRPC/brpc', 'TARS Framework', 'Docker/K8s'],
  },
]

export const experiences: Experience[] = [
  {
    id: 'kingmq',
    company: '上海金仕达软件科技股份有限公司',
    role: 'C++开发工程师',
    period: '2025.03 – 2026.01',
    projectTitle: 'KingMQ C++ SDK (kmq-cpp-sdk)',
    subtitle: '为招商银行开发的高性能消息队列SDK · 已上线交付招商银行生产环境',
    subSections: [
      {
        title: '架构与核心实现',
        bullets: [
          '基于 C++11 + Boost + Protobuf + 自研 KMQP 协议，独立完成 Producer/Consumer、事务消息、Req/Rsp 模型',
          '实现流控（max_prefetch + 阈值系数）、消息压缩（snappy/lz4）及多 Topic/Partition 支持',
        ],
        techTags: ['C++11', 'Boost', 'Protobuf', 'KMQP', 'Snappy', 'LZ4'],
      },
      {
        title: '跨平台异步 IO 引擎',
        bullets: [
          '自研 Poller 抽象层（Linux epoll + Windows IOCP），集成 AsynchIO Buffer 队列、完成端口回调及 ThreadPool',
          '采用 std::atomic + lock-free 机制保障多 Session 线程安全',
        ],
        techTags: ['epoll', 'IOCP', 'Lock-free', 'ThreadPool'],
      },
      {
        title: '高可用与稳定性',
        bullets: [
          '实现心跳检测（可配置间隔）、自动重连、故障转移重订阅、消息 Ack 防重/编号回退逻辑',
          '修复多连接线程池重复创建、死锁、MessageAck 悬空引用等线上级 Bug',
          'SDK 在断网/主备切换场景下可用性达 99.99%+（压测验证）',
        ],
      },
      {
        title: '性能优化与可观测性',
        bullets: [
          '重构发送/接收链路（v2.0.2 → v3.1.13），引入自研 CPerfStat 框架 + gperftools 集成',
          '集成 Prometheus 客户端库暴露核心指标（消息吞吐、延迟分布 P99/P999、错误率等），结合 Grafana 实现实时监控与阈值告警',
        ],
        techTags: ['Prometheus', 'Grafana', 'gperftools'],
      },
      {
        title: '多语言生态',
        bullets: [
          '落地滚动日志、批量 Ack 配置、灵活回调机制',
          '提供 pybind11 Python 绑定、.NET 封装及完整 API 文档 + 升级指南',
        ],
        techTags: ['pybind11', '.NET', 'Python'],
      },
    ],
    metrics: [
      { value: '百万 TPS', label: '单机峰值吞吐' },
      { value: '~100μs', label: '平均端到端延迟' },
      { value: '~250μs', label: 'P99 尾延迟' },
    ],
    techStack: ['C++11', 'Boost', 'Protobuf', 'epoll', 'IOCP', 'Prometheus', 'Grafana', 'pybind11', 'Snappy', 'LZ4'],
  },
  {
    id: 'rdstgy',
    company: '上海金仕达软件科技股份有限公司',
    role: 'C++开发工程师',
    period: '2024.07 – 2025.09',
    projectTitle: '瑞达期货 RDStgy 量化交易平台',
    subtitle: '期货微服务交易系统 · 已上线 iOS/Android/Windows',
    subSections: [
      {
        title: '核心代理层',
        bullets: [
          '主导 CTPProxyServer 与 V8TProxyServer 开发：实现 CTP/V8T 柜台协议接入、订单路由、风控前置校验与实时成交回报',
          '每个 Proxy 进程限 100 账户，通过多实例 + etcd 分布式锁实现水平扩展，支持超千级资金账户并发',
        ],
        techTags: ['CTP', 'V8T', 'etcd'],
      },
      {
        title: '分布式交易代理架构',
        bullets: [
          '负责 KSFTProxyServer（C++）与 V8TProxyServer（Go 协作），结合 KSF 框架、Kedis 缓存与 etcd 分布式存储/锁',
          '实现高可用路由（RouterServer / StrategyRouterServer）、负载均衡与故障转移',
        ],
        techTags: ['KSF', 'Kedis', 'etcd', 'Go'],
      },
      {
        title: '中间层服务',
        bullets: [
          '独立开发 BypassProxyServer / BypassStoreServer / EngineForCondServer 等中间层服务',
          '实现条件单引擎、旁路存储与代理转发逻辑，支持复杂策略在微服务间的低延迟执行',
        ],
      },
      {
        title: '数据层优化',
        bullets: [
          '负责 KSArchiveServer / KSBasicServer / KSDataStorageServer，处理海量行情/成交/持仓数据存储与归档',
          '使用 KSF + etcd 实现分布式一致性，降低数据查询延迟，提升风控与清算效率',
        ],
        techTags: ['KSF', 'etcd'],
      },
    ],
    metrics: [
      { value: '毫秒级', label: '订单穿透延迟' },
      { value: '千级', label: '并发资金账户' },
    ],
    techStack: ['C++', 'Go', 'KSF', 'etcd', 'Kedis', 'CTP', 'V8T', '微服务'],
  },
]

export const internship = {
  company: '金山办公软件有限公司',
  role: 'C++软件开发实习生',
  period: '2023.06 – 2023.09',
  project: 'WPS 看图模块稳定性优化与自动化测试',
  bullets: [
    '使用 WinDbg 分析崩溃 dump，定位并修复 WPS 看图 Windows 端多个崩溃 Bug',
    '独立优化缩略图缓存机制：将原 Windows API 调用改为内嵌 SQLite 多线程读取，热启动速度提升 10 倍',
    '独立开发自动化稳定性测试工具：基于 Airtest + OpenCV 实现操作自动化与异常界面监视，结合状态机生成随机场景用例',
  ],
  techStack: ['WinDbg', 'SQLite', 'Airtest', 'OpenCV', 'Python', 'C++'],
}

export const education = {
  school: '武汉科技大学',
  major: '计算机科学与技术',
  degree: '本科',
  period: '2020.09 – 2024.06',
}

export const githubInfo = {
  url: 'github.com/wustghj',
  contributions: [
    'Contributor to RX-Explorer (796★, UWP/C#)',
    'Contributor to easyChat (1.3K★, Python)',
    'PR 被 merge 并在 release 致谢',
  ],
}
```

- [ ] **Step 2: Verify data module compiles**

```bash
npx vue-tsc --noEmit
```
Expected: No type errors.

---

### Task 3: useActiveSection composable

**Files:**
- Create: `src/composables/useActiveSection.ts`

- [ ] **Step 1: Write useActiveSection.ts**

```typescript
import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useActiveSection(sectionIds: string[]): { activeSection: Ref<string> } {
  const activeSection = ref(sectionIds[0] ?? '')

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.getAttribute('data-section-id') ?? ''
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    for (const id of sectionIds) {
      const el = document.querySelector(`[data-section-id="${id}"]`)
      if (el) observer.observe(el)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { activeSection }
}
```

- [ ] **Step 2: Verify compilation**

```bash
npx vue-tsc --noEmit
```

---

### Task 4: useTypewriter composable

**Files:**
- Create: `src/composables/useTypewriter.ts`

- [ ] **Step 1: Write useTypewriter.ts**

```typescript
import { onMounted, onUnmounted, type Ref } from 'vue'

export function useTypewriter(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options?: { duration?: number; delay?: number },
): void {
  const { duration = 1.5, delay = 0.3 } = options ?? {}
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const { default: gsap } = await import('gsap')
    const el = elementRef.value
    if (!el) return

    ctx = new gsap.Context(() => {
      gsap.fromTo(
        el,
        { text: '' },
        {
          text,
          duration,
          delay,
          ease: 'none',
          onComplete: () => {
            const cursor = el.querySelector('.cursor-blink')
            if (cursor) (cursor as HTMLElement).style.animation = 'blink 1s step-end infinite'
          },
        },
      )
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
```

Wait — the `await import` inside `onMounted` with no async won't work. Let me rewrite this properly.

- [ ] **Step 1 (corrected): Write useTypewriter.ts**

```typescript
import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

export function useTypewriter(
  elementRef: Ref<HTMLElement | null>,
  text: string,
  options?: { duration?: number; delay?: number },
): void {
  const { duration = 1.5, delay = 0.3 } = options ?? {}
  let ctx: gsap.Context | null = null

  onMounted(() => {
    const el = elementRef.value
    if (!el) return

    ctx = new gsap.Context(() => {
      gsap.fromTo(
        el,
        { text: '' },
        {
          text,
          duration,
          delay,
          ease: 'none',
        },
      )
    })

    // Start cursor blink after typewriter finishes
    gsap.delayedCall(delay + duration, () => {
      el.style.setProperty('--cursor-visible', '1')
    })
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}
```

- [ ] **Step 2: Verify compilation**

```bash
npx vue-tsc --noEmit
```

---

### Task 5: SidebarNav component

**Files:**
- Create: `src/components/SidebarNav.vue`
- Modify: `src/App.vue` (add sidebar)

- [ ] **Step 1: Write SidebarNav.vue**

```vue
<script setup lang="ts">
defineProps<{
  sections: { id: string; label: string }[]
  activeSection: string
}>()

function scrollTo(id: string) {
  const el = document.querySelector(`[data-section-id="${id}"]`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="sidebar">
    <ul class="nav-list">
      <li
        v-for="s in sections"
        :key="s.id"
        class="nav-item"
        :class="{ active: activeSection === s.id }"
        @click="scrollTo(s.id)"
      >
        <span class="nav-dot" />
        <span class="nav-label">{{ s.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  position: fixed;
  left: calc((100vw - 640px) / 2 - 80px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.nav-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-item:hover .nav-label {
  opacity: 1;
  color: #2563EB;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #D1D5DB;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.nav-item.active .nav-dot {
  background: #2563EB;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
  transform: scale(1.3);
}

.nav-label {
  font-size: 13px;
  color: #6B7280;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.nav-item.active .nav-label {
  opacity: 1;
  color: #2563EB;
}

/* Hide sidebar on tablets/phones */
@media (max-width: 1024px) {
  .sidebar {
    display: none;
  }
}
</style>
```

- [ ] **Step 2: Update App.vue to include sidebar and sections placeholder**

```vue
<script setup lang="ts">
import { useActiveSection } from '@/composables/useActiveSection'
import SidebarNav from '@/components/SidebarNav.vue'

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'internship', label: 'Internship' },
  { id: 'education', label: 'Education' },
]

const { activeSection } = useActiveSection(navSections.map(s => s.id))
</script>

<template>
  <div class="app-layout">
    <SidebarNav :sections="navSections" :active-section="activeSection" />
    <main class="content-width">
      <section data-section-id="hero"><!-- placeholder --></section>
      <section data-section-id="skills" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="experience" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="internship" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="education" class="section-padding"><!-- placeholder --></section>
    </main>
  </div>
</template>
```

- [ ] **Step 3: Verify build**

```bash
npx vite build
```
Expected: Build succeeds.

---

### Task 6: HeroSection component

**Files:**
- Create: `src/components/HeroSection.vue`
- Modify: `src/App.vue` (add hero section)

- [ ] **Step 1: Add cursor blink keyframe to global.css**

Append to `src/styles/global.css`:

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 2: Write HeroSection.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useTypewriter } from '@/composables/useTypewriter'
import { personalInfo } from '@/data/resume'

const subtitleRef = ref<HTMLElement | null>(null)
useTypewriter(subtitleRef, personalInfo.title, { duration: 1.5, delay: 0.3 })
</script>

<template>
  <section data-section-id="hero" class="hero">
    <div class="hero-bg" />
    <h1 class="hero-name">{{ personalInfo.name }}</h1>
    <p class="hero-name-en">{{ personalInfo.nameEn }}</p>
    <p ref="subtitleRef" class="hero-title">
      <span class="cursor-blink">|</span>
    </p>
    <p class="hero-tagline">{{ personalInfo.tagline }}</p>
    <div class="hero-links">
      <a :href="personalInfo.pdfPath" target="_blank" class="hero-link accent-link">View Resume PDF</a>
      <a :href="`https://${personalInfo.github}`" target="_blank" class="hero-link accent-link">GitHub</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 600px;
  height: 600px;
  background-image: radial-gradient(circle, #DBEAFE 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.5;
  pointer-events: none;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 4px;
}

.hero-name-en {
  font-size: 1.1rem;
  color: #6B7280;
  margin-bottom: 16px;
}

.hero-title {
  font-size: 1.4rem;
  font-family: 'JetBrains Mono', monospace;
  color: #2563EB;
  margin-bottom: 16px;
  min-height: 2rem;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

.hero-tagline {
  font-size: 1.05rem;
  color: #6B7280;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 28px;
}

.hero-links {
  display: flex;
  gap: 20px;
}

.accent-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #2563EB;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px solid #2563EB;
  transition: all 0.2s ease;
}

.accent-link:hover {
  color: #1D4ED8;
  border-color: #1D4ED8;
  padding-bottom: 4px;
}
</style>
```

- [ ] **Step 3: Update App.vue to use HeroSection**

```vue
<script setup lang="ts">
import { useActiveSection } from '@/composables/useActiveSection'
import SidebarNav from '@/components/SidebarNav.vue'
import HeroSection from '@/components/HeroSection.vue'

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'internship', label: 'Internship' },
  { id: 'education', label: 'Education' },
]

const { activeSection } = useActiveSection(navSections.map(s => s.id))
</script>

<template>
  <div class="app-layout">
    <SidebarNav :sections="navSections" :active-section="activeSection" />
    <main class="content-width">
      <HeroSection />
      <section data-section-id="skills" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="experience" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="internship" class="section-padding"><!-- placeholder --></section>
      <section data-section-id="education" class="section-padding"><!-- placeholder --></section>
    </main>
  </div>
</template>
```

- [ ] **Step 4: Verify build**

```bash
npx vite build
```

---

### Task 7: SkillsSection component

**Files:**
- Create: `src/components/SkillsSection.vue`
- Modify: `src/App.vue` (add skills section)

- [ ] **Step 1: Write SkillsSection.vue**

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillGroups } from '@/data/resume'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const groups = document.querySelectorAll('.skill-group')
  gsap.fromTo(
    groups,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#skills-section',
        start: 'top 75%',
      },
    },
  )
})

// ScrollTrigger auto-cleans up since we registered it within the component lifecycle.
// GSAP context cleanup:
let triggers: ScrollTrigger[] = []
onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section id="skills-section" data-section-id="skills" class="section-padding">
    <h2 class="section-heading">Skills</h2>
    <div class="skills-grid">
      <div
        v-for="group in skillGroups"
        :key="group.category"
        class="skill-group card"
      >
        <h3 class="skill-category">{{ group.category }}</h3>
        <div class="skill-tags">
          <span
            v-for="skill in group.skills"
            :key="skill"
            class="tag skill-tag"
          >{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-size: 1.75rem;
  margin-bottom: 28px;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-category {
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  margin-bottom: 12px;
  color: #1A1A1A;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  transition: all 0.2s ease;
  cursor: default;
}

.skill-tag:hover {
  border-color: #2563EB;
  color: #2563EB;
  background: #DBEAFE;
}
</style>
```

- [ ] **Step 2: Update App.vue to use SkillsSection**

Import and replace the skills placeholder:
```vue
import SkillsSection from '@/components/SkillsSection.vue'
```

Replace:
```vue
<section data-section-id="skills" class="section-padding"><!-- placeholder --></section>
```
With:
```vue
<SkillsSection />
```

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 8: MetricCallout component

**Files:**
- Create: `src/components/MetricCallout.vue`

- [ ] **Step 1: Write MetricCallout.vue**

```vue
<script setup lang="ts">
defineProps<{
  metrics: { value: string; label: string }[]
}>()
</script>

<template>
  <div class="metrics-row">
    <div v-for="m in metrics" :key="m.label" class="metric-box">
      <div class="metric-value">{{ m.value }}</div>
      <div class="metric-label">{{ m.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.metrics-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.metric-box {
  background: #DBEAFE;
  border-radius: 8px;
  padding: 12px 20px;
  text-align: center;
  flex: 1;
  min-width: 120px;
}

.metric-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2563EB;
}

.metric-label {
  font-size: 0.8rem;
  color: #6B7280;
  margin-top: 4px;
}
</style>
```

- [ ] **Step 2: Verify build**

```bash
npx vite build
```

---

### Task 9: ExperienceCard component

**Files:**
- Create: `src/components/ExperienceCard.vue`

- [ ] **Step 1: Write ExperienceCard.vue**

```vue
<script setup lang="ts">
import type { Experience } from '@/data/resume'
import MetricCallout from './MetricCallout.vue'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <div class="experience-card card">
    <!-- Header -->
    <div class="exp-header">
      <div class="exp-company-row">
        <span class="exp-company">{{ experience.company }}</span>
        <span class="exp-separator">·</span>
        <span class="exp-role">{{ experience.role }}</span>
      </div>
      <span class="exp-period">{{ experience.period }}</span>
    </div>

    <h3 class="exp-project-title">{{ experience.projectTitle }}</h3>
    <p class="exp-subtitle">{{ experience.subtitle }}</p>

    <!-- Metrics -->
    <MetricCallout v-if="experience.metrics?.length" :metrics="experience.metrics" />

    <!-- Sub-sections -->
    <div class="exp-sub-sections">
      <div
        v-for="sub in experience.subSections"
        :key="sub.title"
        class="exp-sub-card"
      >
        <h4 class="exp-sub-title">{{ sub.title }}</h4>
        <ul class="exp-bullets">
          <li v-for="b in sub.bullets" :key="b">{{ b }}</li>
        </ul>
        <div v-if="sub.techTags?.length" class="exp-sub-tags">
          <span
            v-for="t in sub.techTags"
            :key="t"
            class="tag"
          >{{ t }}</span>
        </div>
      </div>
    </div>

    <!-- Tech stack -->
    <div class="exp-tech-row">
      <span
        v-for="t in experience.techStack"
        :key="t"
        class="tag exp-tech-tag"
      >{{ t }}</span>
    </div>
  </div>
</template>

<style scoped>
.experience-card {
  margin-bottom: 32px;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.exp-company-row {
  font-size: 0.95rem;
  color: #6B7280;
}

.exp-company {
  font-weight: 500;
  color: #1A1A1A;
}

.exp-separator {
  margin: 0 6px;
  color: #D1D5DB;
}

.exp-role {
  font-size: 0.9rem;
}

.exp-period {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #9CA3AF;
}

.exp-project-title {
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.exp-subtitle {
  font-size: 0.95rem;
  color: #6B7280;
  margin-bottom: 16px;
}

.exp-sub-sections {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
}

.exp-sub-card {
  background: #F9FAFB;
  border: 1px solid #F3F4F6;
  border-radius: 6px;
  padding: 14px 18px;
}

.exp-sub-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1F2937;
}

.exp-bullets {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
}

.exp-bullets li {
  position: relative;
  padding-left: 16px;
  font-size: 0.9rem;
  color: #4B5563;
  line-height: 1.7;
  margin-bottom: 4px;
}

.exp-bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #D1D5DB;
}

.exp-sub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.exp-tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
}

.exp-tech-tag {
  font-size: 0.8rem;
  background: #FAFAFA;
}
</style>
```

- [ ] **Step 2: Verify build**

```bash
npx vite build
```

---

### Task 10: ExperienceSection component

**Files:**
- Create: `src/components/ExperienceSection.vue`
- Modify: `src/App.vue` (add experience section)

- [ ] **Step 1: Write ExperienceSection.vue with GSAP scroll animations**

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experiences } from '@/data/resume'
import ExperienceCard from './ExperienceCard.vue'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  const cards = document.querySelectorAll('.exp-card-wrapper')
  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#experience-section',
        start: 'top 70%',
      },
    },
  )
})
</script>

<template>
  <section id="experience-section" data-section-id="experience" class="section-padding">
    <h2 class="section-heading">Experience</h2>
    <div
      v-for="exp in experiences"
      :key="exp.id"
      class="exp-card-wrapper"
    >
      <ExperienceCard :experience="exp" />
    </div>
  </section>
</template>

<style scoped>
.section-heading {
  font-size: 1.75rem;
  margin-bottom: 28px;
}
</style>
```

- [ ] **Step 2: Update App.vue to use ExperienceSection**

Import and replace the experience placeholder.

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 11: InternshipSection component

**Files:**
- Create: `src/components/InternshipSection.vue`
- Modify: `src/App.vue` (add internship section)

- [ ] **Step 1: Write InternshipSection.vue**

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { internship } from '@/data/resume'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo(
    '#internship-card',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#internship-section',
        start: 'top 75%',
      },
    },
  )
})
</script>

<template>
  <section id="internship-section" data-section-id="internship" class="section-padding">
    <h2 class="section-heading">Internship</h2>
    <div id="internship-card" class="card">
      <div class="exp-header">
        <div class="exp-company-row">
          <span class="exp-company">{{ internship.company }}</span>
          <span class="exp-separator">·</span>
          <span class="exp-role">{{ internship.role }}</span>
        </div>
        <span class="exp-period">{{ internship.period }}</span>
      </div>
      <h3 class="exp-project-title">{{ internship.project }}</h3>
      <ul class="exp-bullets">
        <li v-for="b in internship.bullets" :key="b">{{ b }}</li>
      </ul>
      <div class="exp-tech-row">
        <span
          v-for="t in internship.techStack"
          :key="t"
          class="tag"
        >{{ t }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading { font-size: 1.75rem; margin-bottom: 28px; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 8px; }
.exp-company-row { font-size: 0.95rem; color: #6B7280; }
.exp-company { font-weight: 500; color: #1A1A1A; }
.exp-separator { margin: 0 6px; color: #D1D5DB; }
.exp-role { font-size: 0.9rem; }
.exp-period { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #9CA3AF; }
.exp-project-title { font-size: 1.2rem; margin-bottom: 12px; }
.exp-bullets { list-style: none; padding: 0; margin-bottom: 16px; }
.exp-bullets li { position: relative; padding-left: 16px; font-size: 0.9rem; color: #4B5563; line-height: 1.7; margin-bottom: 6px; }
.exp-bullets li::before { content: '—'; position: absolute; left: 0; color: #D1D5DB; }
.exp-tech-row { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 16px; border-top: 1px solid #F3F4F6; }
</style>
```

- [ ] **Step 2: Update App.vue to use InternshipSection**

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 12: EducationSection component

**Files:**
- Create: `src/components/EducationSection.vue`
- Modify: `src/App.vue` (add education section)

- [ ] **Step 1: Write EducationSection.vue**

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { education, githubInfo } from '@/data/resume'

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo(
    '#edu-card, #github-card',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#education-section',
        start: 'top 80%',
      },
    },
  )
})
</script>

<template>
  <section id="education-section" data-section-id="education" class="section-padding">
    <h2 class="section-heading">Education & Open Source</h2>
    <div class="two-col">
      <div id="edu-card" class="card edu-card">
        <h3 class="edu-school">{{ education.school }}</h3>
        <p class="edu-major">{{ education.major }} · {{ education.degree }}</p>
        <p class="edu-period">{{ education.period }}</p>
      </div>
      <div id="github-card" class="card github-card">
        <h3 class="github-title">Open Source</h3>
        <a
          :href="`https://${githubInfo.url}`"
          target="_blank"
          class="github-url"
        >{{ githubInfo.url }}</a>
        <ul class="github-list">
          <li v-for="c in githubInfo.contributions" :key="c">{{ c }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-heading { font-size: 1.75rem; margin-bottom: 28px; }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.edu-school { font-size: 1.15rem; margin-bottom: 6px; }
.edu-major { font-size: 0.95rem; color: #6B7280; margin-bottom: 4px; }
.edu-period { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: #9CA3AF; }

.github-title { font-size: 1.15rem; margin-bottom: 8px; }
.github-url { font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; color: #2563EB; text-decoration: none; }
.github-url:hover { text-decoration: underline; }
.github-list { list-style: none; padding: 0; margin-top: 12px; }
.github-list li { font-size: 0.9rem; color: #6B7280; line-height: 1.7; }

@media (max-width: 640px) {
  .two-col { grid-template-columns: 1fr; }
}
</style>
```

- [ ] **Step 2: Update App.vue to use EducationSection**

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 13: FooterSection component

**Files:**
- Create: `src/components/FooterSection.vue`
- Modify: `src/App.vue` (add footer)

- [ ] **Step 1: Write FooterSection.vue**

```vue
<script setup lang="ts">
import { personalInfo } from '@/data/resume'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer section-padding">
    <p class="footer-text">{{ personalInfo.name }} © {{ year }}</p>
    <a :href="`mailto:${personalInfo.email}`" class="footer-email">{{ personalInfo.email }}</a>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding-top: 48px;
  padding-bottom: 48px;
  border-top: 1px solid #E5E7EB;
}

.footer-text {
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 4px;
}

.footer-email {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #2563EB;
  text-decoration: none;
}

.footer-email:hover {
  text-decoration: underline;
}
</style>
```

- [ ] **Step 2: Update App.vue to use FooterSection**

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 14: Final App.vue assembly and polish

**Files:**
- Modify: `src/App.vue` (complete assembly)

- [ ] **Step 1: Write final App.vue**

```vue
<script setup lang="ts">
import { useActiveSection } from '@/composables/useActiveSection'
import SidebarNav from '@/components/SidebarNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import InternshipSection from '@/components/InternshipSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import FooterSection from '@/components/FooterSection.vue'

const navSections = [
  { id: 'hero', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'internship', label: 'Internship' },
  { id: 'education', label: 'Education' },
]

const { activeSection } = useActiveSection(navSections.map(s => s.id))
</script>

<template>
  <div class="app-layout">
    <SidebarNav :sections="navSections" :active-section="activeSection" />
    <main class="content-width">
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <InternshipSection />
      <EducationSection />
      <FooterSection />
    </main>
  </div>
</template>

<style>
.app-layout {
  position: relative;
}
</style>
```

- [ ] **Step 2: Full build verification**

```bash
npx vue-tsc --noEmit && npx vite build
```
Expected: No type errors, successful production build in `dist/`.

- [ ] **Step 3: Preview build output**

```bash
ls -lh dist/
```
Expected: `index.html`, `assets/` directory with JS and CSS bundles.

---

### Task 15: Copy PDF to public directory

- [ ] **Step 1: Copy resume PDF**

```bash
cp /home/ganhongjin/MyWebResume/甘鸿谨_C++后端开发.pdf /home/ganhongjin/MyWebResume/public/
```

- [ ] **Step 2: Verify PDF accessible**

```bash
ls -lh /home/ganhongjin/MyWebResume/public/甘鸿谨_C++后端开发.pdf
```

---

### Task 16: Mobile responsive nav

**Files:**
- Modify: `src/components/SidebarNav.vue` (add mobile bottom bar)
- Modify: `src/styles/global.css` (responsive helpers)

- [ ] **Step 1: Update global.css with responsive utilities**

Append to `src/styles/global.css`:

```css
@media (max-width: 1024px) {
  .content-width {
    max-width: 100%;
  }

  .section-padding {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}
```

- [ ] **Step 2: Update SidebarNav.vue with mobile bottom bar**

Add after the existing `<nav class="sidebar">` element:

```vue
<nav class="mobile-nav">
  <ul class="mobile-nav-list">
    <li
      v-for="s in sections"
      :key="s.id"
      class="mobile-nav-item"
      :class="{ active: activeSection === s.id }"
      @click="scrollTo(s.id)"
    >
      <span class="mobile-nav-dot" />
      <span class="mobile-nav-label">{{ s.label }}</span>
    </li>
  </ul>
</nav>
```

Add mobile styles to `<style scoped>`:

```css
.mobile-nav {
  display: none;
}

@media (max-width: 1024px) {
  .mobile-nav {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border-top: 1px solid #E5E7EB;
    z-index: 100;
    padding: 8px 0 env(safe-area-inset-bottom, 8px);
  }

  .mobile-nav-list {
    display: flex;
    justify-content: center;
    gap: 24px;
    list-style: none;
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 4px 8px;
    min-width: 48px;
  }

  .mobile-nav-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #D1D5DB;
    transition: all 0.2s ease;
  }

  .mobile-nav-item.active .mobile-nav-dot {
    background: #2563EB;
    box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
  }

  .mobile-nav-label {
    font-size: 11px;
    color: #6B7280;
  }

  .mobile-nav-item.active .mobile-nav-label {
    color: #2563EB;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
npx vite build
```

---

### Task 17: Performance check and final verification

- [ ] **Step 1: Run dev server and inspect**

```bash
npx vite --host 0.0.0.0
```

Open in browser and verify:
- Hero typewriter animation plays on load
- Scroll animations trigger for each section
- Sidebar dot highlights correct section on scroll
- Mobile responsive layout at < 1024px and < 640px
- PDF link opens resume
- GitHub link opens correct profile

- [ ] **Step 2: Check build size**

```bash
ls -lh dist/assets/
```
Expected: Total JS bundle < 100KB gzipped (Vue ~33KB + GSAP ~30KB + app code).

- [ ] **Step 3: Run Lighthouse if available**

Open Chrome DevTools → Lighthouse → Generate report on the production preview (`npx vite preview`).

---
