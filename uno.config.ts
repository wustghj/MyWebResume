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
