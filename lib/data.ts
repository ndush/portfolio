export const profile = {
  name: "Damaris Nduku",
  role: "Software Engineer",
  blurb:
    "I build mobile and web products people rely on every day. I care most about the unglamorous parts: software that keeps working on a slow network, handles retries correctly, and never leaves anyone guessing about their money.",
  email: "mdamarisnduku@gmail.com",
  github: "https://github.com/ndush",
  linkedin: "https://www.linkedin.com/in/damaris-nduku/",
  resumeUrl: "#",
};

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  problem: string;
  role: string;
  result: string;
  stack: string[];
  status: "Shipped" | "Prototype";
  link?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "advance",
    name: "Advance",
    oneLiner:
      "A mobile app where employees borrow against their upcoming salary, repaid automatically from their next payslip.",
    problem:
      "Employees who need cash before payday usually turn to informal, high-interest lenders. Advance lets an employer offer salary advances directly: the employee requests an amount, the employer approves it, the money lands on M-Pesa, and repayment is deducted from the next payslip automatically — no chasing, no manual reconciliation.",
    role:
      "Built the Flutter mobile app end to end, including the request/approval flow, M-Pesa disbursement status handling, and the BLoC state layer that keeps request state consistent across retries and app restarts.",
    result:
      "Shipped to Android and iOS and used by employees across participating employer accounts to request and track salary advances without leaving the app.",
    stack: ["Flutter", "Dart", "BLoC", "REST API", "M-Pesa", "Android", "iOS"],
    status: "Shipped",
    link: { label: "Repo", href: "#" },
  },
  {
    slug: "algora-smart",
    name: "Algora Smart",
    oneLiner:
      "A prepaid electricity and water metering app for Kenya — tenants top up, property managers control supply, admins run the fleet.",
    problem:
      "Prepaid utility metering in Kenya spans three very different users in one system: a tenant who just wants to top up before the lights go out, a property manager who needs to control and monitor supply across units, and an admin running the whole meter fleet. Algora Smart is one role-aware app that serves all three without turning into three separate products.",
    role:
      "Built the cross-platform Flutter app, including the role-based navigation and permissions, the M-Pesa top-up flow, and an offline BLE fallback for talking to meters when connectivity to the backend drops.",
    result:
      "Working prototype covering all three roles — tenant top-ups, manager supply control, and admin fleet oversight — validated against a mock backend ahead of production rollout.",
    stack: ["Flutter", "Dart", "BLoC", "M-Pesa", "Bluetooth LE", "Android", "iOS"],
    status: "Prototype",
    link: { label: "Repo", href: "#" },
  },
  {
    slug: "algora-console",
    name: "Algora Smart Admin Console",
    oneLiner:
      "A control-room web dashboard for operators running a fleet of prepaid smart electricity and water meters.",
    problem:
      "Algora Smart's mobile app covers tenants and property managers, but operators managing hundreds of meters need a different tool: fast search and filtering across a large fleet, a clear view of top-up and supply status, and confidence that the actions they take actually reach the meter.",
    role:
      "Built the React admin console, including a custom query layer for filtering and paginating large meter datasets against the REST/OpenAPI backend, plus the Playwright end-to-end test suite covering the core operator workflows.",
    result:
      "Gives operators a single dashboard to search, filter, and act on the full meter fleet, with an E2E test suite that catches regressions in the core flows before release.",
    stack: ["React", "Vite", "REST", "OpenAPI", "M-Pesa", "Playwright"],
    status: "Shipped",
    link: { label: "Repo", href: "#" },
  },
];
