import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="shrink-0">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Instabooth Photo"
              className="block h-auto max-h-10 md:max-h-14 w-auto max-w-[180px] object-contain self-center"
            />
          </a>

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">

            <a
              href="https://memoryfactory.smugmug.com/Instabooth-Photo/Instabooth-Photo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors border border-foreground rounded px-3 py-1 hover:border-primary"
            >
              See your event gallery
            </a>
            <a
              href="tel:7862053985"
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              786.205.3985
            </a>
            <a
              href="mailto:info@instaboothphoto.com"
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              info@instaboothphoto.com
            </a>

          </nav>

          <a
            href="https://memoryfactory.smugmug.com/Instabooth-Photo/Instabooth-Photo"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden text-xs font-medium text-foreground hover:text-primary border border-foreground rounded px-2 py-1 hover:border-primary whitespace-nowrap"
          >
            See your event gallery
          </a>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 flex flex-col gap-4">
          <a
            href="https://memoryfactory.smugmug.com/Instabooth-Photo/Instabooth-Photo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground hover:text-primary border border-foreground rounded px-3 py-1 hover:border-primary w-fit"
          >
            See your event gallery
          </a>
          <a href="tel:7862053985" className="text-sm font-medium text-foreground hover:text-primary flex items-center gap-2">
            <Phone className="w-4 h-4" /> 786.205.3985
          </a>
          <a href="mailto:info@instaboothphoto.com" className="text-sm font-medium text-foreground hover:text-primary flex items-center gap-2">
            <Mail className="w-4 h-4" /> info@instaboothphoto.com
          </a>

        </div>
      )}
    </header>
  );
}
