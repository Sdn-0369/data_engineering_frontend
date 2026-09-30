import { useState, useEffect } from 'react';
import { useActiveSection } from '../utils/hooks';
import { BarChart3, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Results', href: '#conclusions' },
  { label: 'Artifacts', href: '#artifacts' },
];

const SECTION_IDS = ['hero', 'overview', 'problem', 'objectives', 'pipeline', 'data-quality', 'gold-explorer', 'analytics', 'snowflake', 'automation', 'architecture', 'conclusions', 'metrics', 'artifacts', 'author'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function isActive(href) {
    const target = href.replace('#', '');
    if (target === 'overview') return ['overview', 'problem', 'objectives'].includes(activeId);
    if (target === 'pipeline') return ['pipeline', 'data-quality', 'gold-explorer'].includes(activeId);
    if (target === 'analytics') return ['analytics'].includes(activeId);
    if (target === 'architecture') return ['snowflake', 'automation', 'architecture'].includes(activeId);
    if (target === 'conclusions') return ['conclusions', 'metrics'].includes(activeId);
    if (target === 'artifacts') return ['artifacts', 'author'].includes(activeId);
    return activeId === target;
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors">
            <BarChart3 size={20} className="text-accent" />
            <span className="font-semibold text-sm tracking-tight hidden sm:inline">Footfall Analytics</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-accent bg-accent/10 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-accent bg-accent/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
