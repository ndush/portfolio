import { projects } from "@/lib/data";

const tools = Array.from(new Set(projects.flatMap((p) => p.stack)));

export default function About() {
  return (
    <section id="about" className="wrap about">
      <div className="section-label">About</div>
      <h2 className="section-title">Background</h2>
      <p>
        Most of my recent work sits at the intersection of mobile apps and
        payments in East Africa — money that needs to move reliably over
        patchy connectivity, and state that has to stay correct even when a
        request is retried, delayed, or half-completed.
      </p>
      <p className="about-stack-label">Tools I've shipped with</p>
      <div className="stack">
        {tools.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
