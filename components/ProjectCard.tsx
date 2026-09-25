"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data";
import StatusDot from "@/components/ui/StatusDot";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export default function ProjectCard({ project: p }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const status = (
    <StatusDot tone={p.status === "Shipped" ? "positive" : "pending"}>
      {p.status}
    </StatusDot>
  );
  const chips = (
    <div className="stack">
      {p.stack.map((s) => (
        <span className="chip" key={s}>
          {s}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <SpotlightCard spotlightColor="rgba(39, 138, 83, 0.18)">
        <article className="project">
          <h3 className="project-name">
            {/* ::after stretches this button over the whole card */}
            <button
              type="button"
              className="project-open"
              aria-haspopup="dialog"
              onClick={() => dialog.current?.showModal()}
            >
              {p.name}
            </button>
          </h3>
          {status}
          <p className="project-oneliner">{p.oneLiner}</p>
          {chips}
          <span className="project-cue" aria-hidden="true">
            View details →
          </span>
        </article>
      </SpotlightCard>

      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby={`${p.slug}-title`}
        // Click on the backdrop (the dialog element itself, outside the panel) closes it
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className="dialog-panel">
          <header className="dialog-block dialog-head">
            <div>
              <h3 id={`${p.slug}-title`} className="project-name">
                {p.name}
              </h3>
              {status}
            </div>
            <form method="dialog">
              <button className="dialog-close" aria-label="Close">
                ×
              </button>
            </form>
          </header>

          <p className="dialog-block project-oneliner">{p.oneLiner}</p>

          <dl className="dialog-block project-detail">
            <div>
              <dt>Why it exists</dt>
              <dd>{p.problem}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>{p.result}</dd>
            </div>
          </dl>

          <div className="dialog-block dialog-foot">
            {chips}
            {p.link && (
              <a className="project-link" href={p.link.href}>
                {p.link.label} ↗
              </a>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
