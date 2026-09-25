import { profile } from "@/lib/data";
import BlurText from "@/components/reactbits/BlurText";

export default function Hero() {
  return (
    <header className="hero wrap">
      <h1>
        <BlurText text={profile.role} delay={90} direction="bottom" />
      </h1>
      <p>{profile.blurb}</p>
      <div className="hero-actions">
        <a className="btn btn-primary" href="#work">
          See the work
        </a>
        <a className="btn btn-ghost" href={profile.resumeUrl}>
          Resume
        </a>
      </div>
    </header>
  );
}
