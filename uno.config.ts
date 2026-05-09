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
    'section-padding': 'py-16 lg:py-24',
    'card': 'bg-surface border border-border rounded-xl p-6 lg:p-8 transition-all duration-300',
    'card-hover': 'hover:border-accent hover:shadow-[0_0_0_1px_rgba(37,99,235,0.06)] hover:shadow-lg',
    'tag': 'inline-block px-3 py-1 text-11px lg:text-12px font-mono border border-transparent rounded-full bg-[#F3F4F6] text-[#4B5563] transition-all duration-200',
    'tag-hover': 'hover:border-accent hover:text-accent hover:bg-accent-muted hover:scale-105',
    'metric-box': 'bg-accent-soft border border-accent-muted rounded-xl py-4 px-6 text-center transition-all duration-300',
    'metric-box-hover': 'hover:scale-105 hover:border-accent hover:shadow-md',
    'section-heading': 'font-serif text-2xl lg:text-3xl font-semibold mb-10 lg:mb-14',
    'sub-card': 'bg-[#FAFAFA] border border-border-subtle rounded-lg p-5 lg:p-6 transition-all duration-200 hover:border-border',
  },
})
