# 甘鸿谨 Personal Resume Website — Design Spec

## Overview

Single-page personal resume website for 甘鸿谨 (Gan Hongjin), C++ backend developer. Clean, modern, spacious design with subtle tech-inspired typographic animations.

## Tech Stack

- **Framework:** Vue 3 (Composition API + `<script setup>`)
- **Build:** Vite
- **Animation:** GSAP (ScrollTrigger, TextPlugin for typewriter)
- **CSS:** UnoCSS (utility-first, lighter than Tailwind)
- **Hosting:** Static (any static server)

## Visual Foundation

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FAFAFA` | Page base |
| Surface | `#FFFFFF` | Cards, nav |
| Text primary | `#1A1A1A` | Body, headings |
| Text secondary | `#6B7280` | Meta, dates, labels |
| Accent | `#2563EB` | Links, highlights, active nav |
| Accent muted | `#DBEAFE` | Accent backgrounds |
| Border | `#E5E7EB` | Dividers, card borders |

### Typography

| Role | Font |
|------|------|
| Headings | Noto Serif SC (CJK) + Lora (Latin) — serif |
| Body | Inter (Latin) + PingFang SC / Microsoft YaHei (CJK fallback) |
| Code/Technical | JetBrains Mono — monospace |

### Spacing

- Section vertical padding: `py-24` (~96px)
- Content max-width: `640px` (narrow reading measure)
- Card gaps: `gap-6` (~24px)
- Min hit area: 44px

## Page Structure

### Navigation
- Fixed left sidebar on desktop, collapses to bottom bar on mobile
- Dot + short label per section
- Active indicator via Intersection Observer (accent glow)
- Always visible, no hamburger

### 1. Hero
- Name: 甘鸿谨 (large serif)
- Subtitle: "C++ Backend Developer" with typewriter cursor blink
- One-line tagline synthesized from resume
- CTA links: View PDF, GitHub
- Subtle dot-pattern background

### 2. Skills
- Grouped tag cloud: Language & Core / Networking & Concurrency / Systems & Tools / Databases & Middleware
- Monospace pill tags, border, hover → accent reveal
- Stagger-fade-in on scroll

### 3. Experience (detailed cards)

**KingMQ C++ SDK (2025.03 – 2026.01)**
- Company line + project subtitle (为招商银行开发...已上线交付)
- Sub-sections as inner cards:
  - Architecture & Core — C++11, Boost, Protobuf, KMQP protocol, Producer/Consumer, 事务消息, Req/Rsp, 流控, 压缩, Multi-Topic
  - Async I/O Engine — Poller abstraction (epoll + IOCP), AsynchIO Buffer, ThreadPool, lock-free multithreading
  - Metrics — 百万 TPS, avg ~100μs, P99 ~250μs (visual callout boxes)
  - Reliability & Observability — heartbeat, reconnect, failover, Ack dedup, 99.99% availability, CPerfStat, Prometheus, Grafana
  - Ecosystem — pybind11 Python binding, .NET wrapper, API docs
- Tech stack tag row

**RDStgy 量化交易平台 (2024.07 – 2025.09)**
- Company line + project subtitle (期货微服务交易系统, iOS/Android/Windows 上线)
- Sub-sections as inner cards:
  - Proxy Layer — CTPProxyServer, V8TProxyServer, order routing, risk control
  - Distributed Architecture — KSFTProxyServer (C++), V8TProxyServer (Go), KSF, etcd, horizontal scaling
  - Middleware Services — BypassProxyServer, BypassStoreServer, EngineForCondServer
  - Data Layer — KSArchiveServer, KSBasicServer, KSDataStorageServer
- Metrics callout: 毫秒级延迟
- Tech stack tag row

### 4. Internship
- Compact card: WPS 看图模块
- Bug fixes, thumbnail cache (10x), auto testing tool (Airtest + OpenCV)

### 5. Education + GitHub
- Two-column: Education (武汉科技大学) | GitHub (github.com/wustghj, open source contributions)

### Footer
- 甘鸿谨 © 2026 + email

## Animations (GSAP)

- **Hero:** Typewriter effect on subtitle, cursor blink loop
- **Skills:** Staggered fade-in-up for each tag group on scroll
- **Experience cards:** Reveal on scroll (fade + slight translateY), inner sub-cards stagger
- **Metrics:** Counter animation to final values when scrolled into view
- **Nav:** Active indicator transitions smoothly between dots
- **Hover:** Card scale/border accent transition (CSS, ~200ms)
- **Micro-interactions:** Link underline slide, tag hover glow

## Responsive Behavior

- Desktop: left sidebar nav, single-column content (640px max-width)
- Tablet: horizontal top nav, same content width
- Mobile: bottom nav bar, full-width content with horizontal padding

## Content Source

- Base: extracted resume PDF content
- No CMS — content lives in Vue component data or a static JSON file

## Non-Goals

- No dark mode toggle (can add later)
- No i18n
- No CMS/editing interface
- No analytics/tracking
