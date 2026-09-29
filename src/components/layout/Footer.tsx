import Link from "next/link";
import Logo from "./Logo";
import { mainNav, site } from "@/data/site";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/60">
              <span className="text-ivory">{site.legalName}</span> is an integrated interior solutions
              company delivering design, project management, execution, contracting and bespoke
              furniture, from first concept to final handover.
            </p>
            <p className="mt-6 font-display text-lg italic text-brass-light">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2 lg:col-start-6">
            <h2 className="eyebrow mb-6 text-ivory/40">Navigate</h2>
            <ul className="space-y-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/75 transition-colors duration-300 hover:text-brass-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-4 lg:col-span-3">
            <h2 className="eyebrow mb-6 text-ivory/40">Services</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-sm text-ivory/75 transition-colors duration-300 hover:text-brass-light"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-12 lg:col-span-3">
            <h2 className="eyebrow mb-6 text-ivory/40">Contact</h2>
            <a
              href={`mailto:${site.email}`}
              className="break-all font-display text-2xl text-ivory transition-colors duration-300 hover:text-brass-light"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.legalName}. All Rights Reserved.</p>
          <Link href="/contact" className="transition-colors hover:text-ivory">
            Start a Project →
          </Link>
        </div>
      </div>
    </footer>
  );
}
