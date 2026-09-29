import Link from "next/link";
import Logo from "./Logo";
import GoldLines from "@/components/ui/GoldLines";
import { mainNav, primaryCta, site } from "@/data/site";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

const linkCls =
  "inline-flex min-h-9 items-center text-[0.9rem] text-ivory/75 transition-colors duration-300 hover:text-brass-light";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <GoldLines className="right-5 top-0 h-8 opacity-70 md:right-[6%] md:h-40" />

      <div className="container-x relative">
        {/* Closing call to action */}
        <div className="flex flex-col gap-6 border-b border-ivory/10 py-12 md:flex-row md:items-end md:justify-between md:py-16">
          <div>
            <p className="eyebrow flex items-center gap-3 text-brass-light">
              <span className="rule-brass" />
              Have a project in mind?
            </p>
            <p className="mt-4 max-w-2xl font-display text-[2rem] leading-[1.1] md:text-5xl">
              Let&apos;s shape your <span className="italic text-brass-light">next space</span> together.
            </p>
          </div>
          <Link
            href={primaryCta.href}
            className="flex min-h-12 shrink-0 items-center justify-center gap-3 bg-brass px-7 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:bg-brass-light"
          >
            {primaryCta.label} <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Brand + links + contact */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-12 md:gap-x-8 md:py-14">
          <div className="col-span-2 md:col-span-12 lg:col-span-4 lg:pr-8">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-ivory/60">
              Interior design, project management, execution, contracting and bespoke furniture, from
              first concept to final handover.
            </p>
            <p className="mt-4 font-display text-lg italic text-brass-light">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
            <h2 className="eyebrow mb-3 text-ivory/40">Navigate</h2>
            <ul>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-4 lg:col-span-3">
            <h2 className="eyebrow mb-3 text-ivory/40">Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={`${linkCls} leading-snug`}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-5 lg:col-span-3">
            <h2 className="eyebrow mb-3 text-ivory/40">Get in touch</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`} className={`${linkCls} break-all`}>
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.tel}`} className={linkCls}>
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink("Hello Novenso Spaces, I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkCls} gap-2`}
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </li>
              <li className="mt-3 text-[0.9rem] text-ivory/50">Hyderabad, India</li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex items-center justify-between gap-4 border-t border-ivory/10 py-6 text-[0.75rem] text-ivory/45">
          <p>
            © 2026 {site.legalName}.
            <br className="sm:hidden" /> All Rights Reserved.
          </p>
          <a
            href="#main"
            aria-label="Back to top"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors hover:border-brass hover:text-brass-light"
          >
            <span aria-hidden>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
