import { Button, Card } from "@pidedirecto/ui";
import { formatRelativeTime } from "@pidedirecto/utils";

const queue = [
  { label: "Vendor approvals", value: 12 },
  { label: "Payout reviews", value: 4 },
  { label: "Open disputes", value: 7 }
];

const timeline = [
  {
    title: "Tenant Madrid launched",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 45))
  },
  {
    title: "New restaurant onboarding",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 120))
  },
  {
    title: "Rider incentives published",
    time: formatRelativeTime(new Date(Date.now() - 1000 * 60 * 320))
  }
];

export default function AdminDashboardHome() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Admin Dashboard PWA</p>
          <h1>Operational insights across every tenant.</h1>
          <p className="muted">
            Track order flow, manage vendors, and stay ahead of disputes with a
            real-time admin command center.
          </p>
        </div>
        <div className="hero-actions">
          <Button>Review queue</Button>
          <Button variant="secondary">Download reports</Button>
        </div>
      </section>

      <section className="grid">
        {queue.map((item) => (
          <Card
            key={item.label}
            title={item.label}
            description={`${item.value} items need attention`}
          />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Recent updates</h2>
          <ul>
            {timeline.map((event) => (
              <li key={event.title}>
                <span>{event.title}</span>
                <small>{event.time}</small>
              </li>
            ))}
          </ul>
        </div>
        <Button variant="ghost">View audit logs</Button>
      </section>
    </main>
  );
}
