export default function StatusDot({
  tone,
  children,
}: {
  tone: "positive" | "pending";
  children: React.ReactNode;
}) {
  return (
    <span className={`status-dot status-dot--${tone}`}>
      <span className="status-dot-mark" aria-hidden="true" />
      {children}
    </span>
  );
}
