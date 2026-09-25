import { profile } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-name" href="#" aria-label={`${profile.name}, back to top`}>
          <span className="logo-mark" aria-hidden="true">
            dn
          </span>
          <span className="logo-word">{profile.name}</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
