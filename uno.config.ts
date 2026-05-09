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
      'accent-soft': '#F0F4FF',
      border: '#E8ECF2',
      'border-subtle': '#F0F1F3',
    },
    fontFamily: {
      serif: ['Noto Serif SC', 'Lora', 'serif'],
      sans: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    breakpoints: {
      sm: '768px',
      md: '1024px',
      lg: '1440px',
    },
  },
  shortcuts: {
    'section-padding': 'py-12',
    'content-width': 'max-w-275 mx-auto px-6',
    'card': 'bg-surface border border-border rounded-10px p-6 transition-colors duration-150',
    'card-hover': 'hover:border-accent hover:shadow-[0_0_0_1px_rgba(37,99,235,0.08)]',
    'tag': 'inline-block px-2.5 py-0.5 text-10px font-mono border border-transparent rounded-full bg-[#F3F4F6] text-[#4B5563] transition-all duration-120',
    'tag-hover': 'hover:border-accent hover:text-accent hover:bg-accent-muted',
    'metric-box': 'bg-accent-soft border border-accent-muted rounded-lg py-2.5 px-4.5 text-center transition-all duration-150',
    'metric-box-hover': 'hover:scale-103 hover:border-accent',
    'section-heading': 'font-serif text-20px font-semibold mb-7',
    'sub-card': 'bg-[#FAFAFA] border border-border-subtle rounded-md p-3.5',
  },
})
