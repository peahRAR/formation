/** Mode clair / sombre, mémorisé dans le navigateur. */
export function useTheme() {
  const isDark = useState('theme-dark', () => false)

  function apply(dark: boolean) {
    isDark.value = dark
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', dark)
      try {
        localStorage.setItem('fw-theme', dark ? 'dark' : 'light')
      } catch {
        /* ignore */
      }
    }
  }

  function toggle() {
    apply(!isDark.value)
  }

  /** À appeler une fois au montage : lit la classe posée par le script du <head>. */
  function sync() {
    if (import.meta.client) isDark.value = document.documentElement.classList.contains('dark')
  }

  return { isDark, toggle, apply, sync }
}
