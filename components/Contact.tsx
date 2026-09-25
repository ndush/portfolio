import { profile } from "@/lib/data";

// "https://www.linkedin.com/in/x/" → "linkedin.com/in/x"
const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { kind: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { kind: "LinkedIn", value: short(profile.linkedin), href: profile.linkedin },
  { kind: "GitHub", value: short(profile.github), href: profile.github },
];

export default function Contact() {
  return (
    <section id="contact" className="wrap">
      <div className="contact">
        <div>
          <div className="section-label">Get in touch</div>
          <h2 className="section-title">Let&apos;s talk</h2>
          <p className="contact-lede">
            Open to new roles and interesting problems. Email is the fastest
            way to reach me. I usually reply within a day.
          </p>
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
        </div>

        <ul className="contact-list">
          {channels.map((c) => {
            const external = !c.href.startsWith("mailto:");
            return (
              <li key={c.kind}>
                <a
                  href={c.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className="contact-kind">{c.kind}</span>
                  <span className="contact-value">{c.value}</span>
                  <span className="contact-arrow" aria-hidden="true">
                    {external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
