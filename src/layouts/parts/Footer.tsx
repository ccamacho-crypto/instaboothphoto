import { Phone, Mail } from 'lucide-react';
import { home } from 'virtual:content';

export default function Footer() {
  return (
    <footer style={{ background: 'hsl(var(--surface-dark))' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-4">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="Instabooth Photo"
              className="block h-auto max-h-12 w-auto max-w-[160px] object-contain self-start brightness-0 invert" />
            
            <p className="text-sm text-white/70">{home.footer.tagline}</p>
            <p className="text-xs text-white/50 mt-auto">{home.footer.copyright}</p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Quick Links</h3>
            <nav aria-label="Footer links" className="flex flex-col gap-2">
              {home.footer.quickLinks.map((link) =>
              <a
                key={link.id}
                href={link.href}
                className="text-sm text-white/80 hover:text-primary transition-colors">
                
                  {link.label}
                </a>
              )}
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <a href={`tel:${home.footer.phone.replace(/\./g, '')}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{home.footer.phone}</span>
              </a>
              <a href={`mailto:${home.footer.email}`} className="flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <span>{home.footer.email}</span>
              </a>

            </div>
          </div>
        </div>
      </div>
    </footer>);

}