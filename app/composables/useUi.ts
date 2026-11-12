/** État global de l'interface : sidebar, menu mobile, notes du formateur. */
export function useUi() {
  const sidebarCollapsed = useState('ui-sidebar-collapsed', () => false)
  const mobileMenuOpen = useState('ui-mobile-menu', () => false)
  const notesOpen = useState('ui-notes', () => false)
  const restored = useState('ui-restored', () => false)

  if (import.meta.client && !restored.value) {
    try {
      sidebarCollapsed.value = localStorage.getItem('fw-sidebar') === 'collapsed'
    } catch {
      /* ignore */
    }
    restored.value = true
  }

  function setSidebarCollapsed(value: boolean) {
    sidebarCollapsed.value = value
    try {
      localStorage.setItem('fw-sidebar', value ? 'collapsed' : 'open')
    } catch {
      /* ignore */
    }
  }

  function toggleSidebar() {
    setSidebarCollapsed(!sidebarCollapsed.value)
  }

  return { sidebarCollapsed, mobileMenuOpen, notesOpen, toggleSidebar, setSidebarCollapsed }
}
