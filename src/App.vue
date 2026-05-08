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
