import { ref, computed, onMounted, watch } from 'vue';

const isDark = ref(false);

export function useTheme() {
  const isDarkMode = computed(() => isDark.value);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    updateTheme();
  };

  const setDarkMode = (dark: boolean) => {
    isDark.value = dark;
    updateTheme();
  };

  const updateTheme = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const initTheme = () => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      isDark.value = saved === 'dark';
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateTheme();
  };

  onMounted(() => {
    initTheme();
  });

  // Listen for system theme changes
  watch(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    (newVal) => {
      if (!localStorage.getItem('theme')) {
        isDark.value = newVal;
        updateTheme();
      }
    },
  );

  return {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
    initTheme,
  };
}
