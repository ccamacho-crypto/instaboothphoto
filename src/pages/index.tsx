import { useState, type FormEvent } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useRef } from 'react'
import { motion } from 'motion/react'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Check, Camera, Film, Wifi, Image, ChevronRight } from 'lucide-react';
import { home } from 'virtual:content';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';


function GallerySlider() {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const slides = [
    { src: '/airo-assets/images/pages/home/gallery-slide-1', alt: 'Photo booth fun group of friends' },
    { src: '/airo-assets/images/pages/home/gallery-slide-2', alt: 'Photo booth costume fun' },
    { src: '/airo-assets/images/pages/home/gallery-slide-3', alt: 'Couple with photo booth props' },
    { src: '/airo-assets/images/pages/home/gallery-slide-4', alt: 'Family fun at photo booth' },
    { src: '/airo-assets/images/pages/home/gallery-slide-5', alt: 'Party fun with photo booth' },
    { src: '/airo-assets/images/pages/home/gallery-slide-6', alt: 'Wedding photo booth celebration' },
  ];
  return (
    <section className="py-12 bg-background overflow-hidden">
      <Carousel opts={{ loop: true }} plugins={[autoplay.current]} className="w-full">
        <CarouselContent className="-ml-4">
          {slides.map((slide, i) => (
            <CarouselItem key={i} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={600}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default function HomePage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (formData.get('tm_pb_contactform_validate_0')) return;
    const name = String(formData.get('tm_pb_contact_name_1') ?? '').trim();
    const phone = String(formData.get('tm_pb_contact_lastname_1') ?? '').trim();
    const email = String(formData.get('tm_pb_contact_email_1') ?? '').trim();
    const message = String(formData.get('tm_pb_contact_message_1') ?? '').trim();
    setStatus('sending');
    setErrorMsg('');
    try {
      // Field mapping: only the message textarea goes in messages_attributes[0].body.
      // All other fields (phone) must be added to conversation.data as { 'Label': value } pairs.
      const res = await fetch('/api/contact/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: {
            messages_attributes: [{ body: message || 'New booking inquiry' }],
            data: { __gd_contact_form_title: 'Book Your Booth Today!', Phone: phone }
          },
          user: { email, name }
        })
      });
      const json = await res.json();
      if (json.success) {setStatus('success');form.reset();} else
      {throw new Error(json.error || 'Something went wrong.');}
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Instabooth Photo',
    description: 'Miami photo booth rental company serving weddings, mitzvahs, anniversaries, and corporate events.',
    telephone: '+17862053985',
    email: 'info@instaboothphoto.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8865 SW 131 Street',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33176',
      addressCountry: 'US'
    },
    url: 'https://instaboothphoto.com'
  };

  return (
    <>
      <Helmet>
        <title>Instabooth Photo — Miami Photo Booth Rental for Weddings & Events</title>
        <meta name="description" content="Miami's premier photo booth rental company. Serving weddings, mitzvahs, anniversaries, and corporate events with unlimited prints, animated GIFs, and online galleries." />
        <link rel="canonical" href="https://instaboothphoto.com/" />
        <link rel="icon" href="/assets/other/33fb27676b7324c046a22af796951802.png" sizes="32x32" />
        <meta property="og:title" content="Instabooth Photo — Miami Photo Booth Rental" />
        <meta property="og:description" content="Miami's premier photo booth rental. Weddings, mitzvahs, anniversaries, and corporate events." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://instaboothphoto.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>
      </Helmet>

      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 pointer-events-none">
            <img src="/airo-assets/images/uploads/background-qx654i8p9r-1791753899843-file-lgug0zn0-i" alt="Photo booth party celebration" className="w-full h-full object-cover" loading="eager" fetchPriority="high" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/60 to-gray-900/30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' as const }}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {home.hero.tags.map((tag) =>
                  <span key={tag} className="text-xs font-semibold bg-primary/20 text-primary border border-primary/40 px-3 py-1 rounded-full">{tag}</span>
                  )}
                </div>
                <h1 className="font-bold text-white leading-none mb-6" style={{ fontSize: 'clamp(56px, 10vw, 120px)', fontFamily: 'var(--font-heading)' }}>
                  {home.hero.headline}
                </h1>
                <p className="text-white/80 text-lg mb-8 max-w-md" style={{ lineHeight: '1.8' }}>{home.hero.subheadline}</p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={scrollToBooking} className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-base hover:opacity-90 transition-opacity">
                    {home.hero.cta}
                  </button>
                  <a href="https://memoryfactory.smugmug.com/Instabooth-Photo/Instabooth-Photo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/90 hover:text-primary font-medium transition-colors">
                    {home.hero.galleryLink} <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }} className="hidden lg:flex flex-col items-end gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-right">
                  <p className="text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-white/70 mt-1">Events Captured</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-right">
                  <p className="text-4xl font-bold text-primary">Orlando to Miami, FL</p>
                  <p className="text-sm text-white/70 mt-1">Based & Serving Florida</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GALLERY SLIDER */}
        <GallerySlider />

        {/* FEATURES */}
        <section id="features" className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' as const }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{home.features.heading}</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto" style={{ lineHeight: '1.8' }}>{home.features.intro}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0, ease: 'easeOut' as const }} className="lg:col-span-2 relative rounded-2xl overflow-hidden group min-h-[300px]">
                <img src="/airo-assets/images/uploads/background-qx654i8p9r-1791738813497-file-g4dys25et" alt="Photo booth strip with party guests" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Camera className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{home.features.items[0].title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{home.features.items[0].description}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' as const }} className="relative rounded-2xl overflow-hidden group min-h-[300px]">
                <video src="/airo-assets/videos/features/animated-gifs-video" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none" />
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <Film className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{home.features.items[1].title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{home.features.items[1].description}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' as const }} className="relative rounded-2xl overflow-hidden group min-h-[300px] bg-primary">
                <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                  <Image className="w-8 h-8 text-primary-foreground/80" />
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{home.features.items[2].title}</h3>
                    <p className="text-primary-foreground/80 text-sm leading-relaxed">{home.features.items[2].description}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' as const }} className="lg:col-span-2 relative rounded-2xl overflow-hidden group min-h-[260px]">
                <img src="/airo-assets/images/pages/home/features-corporate" alt="Online gallery photo collage" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Wifi className="w-8 h-8 text-primary mb-3" />
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{home.features.items[3].title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{home.features.items[3].description}</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' as const }} className="relative rounded-2xl overflow-hidden group min-h-[260px]">
                <img src="/airo-assets/images/uploads/background-qx654i8p9r-1791741480707-file-pftqjnkve7" alt="Photo booth album with printed strips" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={600} height={400} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-5xl font-bold text-primary leading-none mb-3">Albums</p>
                  <p className="text-lg font-semibold mb-1">Photo Strip Album</p>
                  <p className="text-white/80 text-sm">A keepsake album filled with your favorite photo booth strips</p>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' as const }} className="relative rounded-2xl overflow-hidden group min-h-[260px]">
                <video src="/airo-assets/videos/features/360-video" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-4xl font-bold text-primary leading-none mb-3">360°</p>
                  <p className="text-lg font-semibold mb-1">360 Video</p>
                  <p className="text-white/80 text-sm">Make a splash with the 360 video booth experience</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="relative py-24" style={{ backgroundImage: "url('/airo-assets/images/uploads/background-qx654i8p9r-1791732273644-file-rpyyhd-mhg')", backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gray-900/80 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' as const }} className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{home.pricing.heading}</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">{home.pricing.subtext}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {home.pricing.packages.map((pkg, i) =>
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
              className={['rounded-2xl p-8 flex flex-col gap-6 relative', pkg.featured ? 'bg-background border-2 border-primary shadow-[0_0_40px_rgba(233,30,140,0.25)] md:-mt-4' : 'bg-white/5 border border-white/10'].join(' ')}>
                
                  {pkg.featured &&
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
                }
                  <div>
                    <p className={pkg.featured ? 'text-sm font-semibold text-primary mb-1' : 'text-sm font-semibold text-white/50 mb-1'}>{pkg.duration}</p>
                    <h3 className={'text-2xl font-bold mb-2 ' + (pkg.featured ? 'text-foreground' : 'text-white')} style={{ fontFamily: 'var(--font-heading)' }}>{pkg.name}</h3>
                    <p className={'text-5xl font-bold ' + (pkg.featured ? 'text-primary' : 'text-white')}>{pkg.price}</p>
                  </div>
                  <p className={'text-sm leading-relaxed ' + (pkg.featured ? 'text-muted-foreground' : 'text-white/60')}>{pkg.description}</p>
                  <ul className="flex flex-col gap-2">
                    {pkg.features.map((feat) =>
                  <li key={feat} className="flex items-center gap-2">
                        <Check className={'w-4 h-4 shrink-0 ' + (pkg.featured ? 'text-primary' : 'text-white/50')} />
                        <span className={'text-sm ' + (pkg.featured ? 'text-foreground' : 'text-white/70')}>{feat}</span>
                      </li>
                  )}
                  </ul>
                  <button onClick={scrollToBooking} className={['mt-auto w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90', pkg.featured ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'].join(' ')}>{pkg.cta}</button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section
          id="booking"
          className="relative py-32 overflow-hidden"
          style={{ backgroundImage: "url('/airo-assets/images/uploads/background-qx654i8p9r-1791731582953-file-v-9x9mjjf2')", backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gray-900/60 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: 'easeOut' as const }} className="w-full max-w-md bg-background/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{home.contact.subtext}</p>
                <h2 className="text-3xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-heading)' }}>{home.contact.heading}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input type="text" name="tm_pb_contactform_validate_0" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />
                  <input type="text" name="tm_pb_contact_name_1" placeholder="Name" required className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                  <input type="text" name="tm_pb_contact_lastname_1" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                  <input type="email" name="tm_pb_contact_email_1" placeholder="E-mail address" required className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
                  <textarea name="tm_pb_contact_message_1" placeholder="Event Details:" rows={5} className="w-full px-4 py-3 rounded-xl border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" />
                  {status === 'error' && <p role="alert" className="text-sm text-red-500">{errorMsg}</p>}
                  <button type="submit" disabled={status === 'sending'} className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 w-fit">
                    {status === 'sending' ? 'Sending…' : home.contact.submitLabel}
                  </button>
                  {status === 'success' && <p role="status" className="text-sm text-green-600 font-medium">Thanks! We'll be in touch soon.</p>}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>);

}