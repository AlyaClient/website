export function Header() {
  return (
    <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2.5rem; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); background: rgba(6,3,16,0.6); border-bottom: 1px solid rgba(255,255,255,0.05);">
      <span style="font-family: 'Geist', sans-serif; font-weight: 700; font-size: 1.125rem; letter-spacing: 0.18em; color: rgba(255,255,255,0.92);">
        Alya Client
      </span>
      <div style="display: flex; gap: 2rem;">
        <a
          href="https://github.com/AlyaClient/alya"
          style="font-size: 0.8rem; letter-spacing: 0.06em; color: rgba(255,255,255,0.45); text-decoration: none; transition: color 0.2s;"
          class="nav-link"
        >
          GITHUB
        </a>
      </div>
    </header>
  );
}
