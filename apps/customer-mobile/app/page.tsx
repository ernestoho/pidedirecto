import { Button, Card } from "@pidedirecto/ui";

const modules = [
  {
    title: "Quick search",
    description: "Instant results with smart cuisine filters and distance sorting."
  },
  {
    title: "Mobile checkout",
    description: "Finger-friendly checkout with saved delivery addresses."
  },
  {
    title: "Offline ready",
    description: "Cache last orders and menus to browse without a signal."
  }
];

export default function CustomerMobileHome() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Customer PWA Mobile</p>
        <h1>Mobile ordering built for speed and clarity.</h1>
        <p className="muted">
          A compact PWA that keeps customers on track with real-time delivery
          updates and one-tap reorders.
        </p>
        <div className="hero-actions">
          <Button>Open mobile preview</Button>
          <Button variant="secondary">Set delivery address</Button>
        </div>
      </section>

      <section className="grid">
        {modules.map((module) => (
          <Card key={module.title} title={module.title} description={module.description} />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Location sharing</h2>
          <p className="muted">
            Enable live location sharing for precise ETAs and faster handoff.
          </p>
        </div>
        <Button variant="ghost">Enable GPS</Button>
      </section>
    </main>
  );
}
