import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, isAdmin, login, logout } = useContext(AuthContext)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b-2 border-border">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-bold text-lg tracking-tight uppercase text-text hover:opacity-70 transition-opacity"
        >
          FAISAL KHAN PATHAN
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <a
                  href="/admin"
                  className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all duration-200"
                >
                  ADMIN
                </a>
              )}
            </>
          )}

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={login}
              className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer"
            >
              LOGIN
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text hover:opacity-70 transition-opacity cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="square" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t-2 border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-2 text-center hover:bg-text hover:text-bg transition-all duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                {isAdmin && (
                  <a href="/admin" className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-2 text-center hover:bg-text hover:text-bg transition-all duration-200">
                    ADMIN
                  </a>
                )}
                <button onClick={logout} className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-2 text-center hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                  LOGOUT
                </button>
              </>
            ) : (
              <button onClick={login} className="text-xs font-bold tracking-wider uppercase border-2 border-border px-3 py-2 text-center hover:bg-text hover:text-bg transition-all duration-200 cursor-pointer">
                LOGIN WITH GOOGLE
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
