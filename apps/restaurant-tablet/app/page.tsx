import { Button, Card } from "@pidedirecto/ui";

const board = [
  { title: "New orders", description: "8 orders waiting for confirmation." },
  { title: "In prep", description: "12 orders currently cooking." },
  { title: "Ready for pickup", description: "3 riders ready to collect." }
];

export default function RestaurantTabletHome() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Restaurant Tablet PWA</p>
          <h1>Keep the kitchen moving and orders on time.</h1>
          <p className="muted">
            Manage incoming orders, update prep times, and coordinate staff from a
            single tablet-optimized hub.
          </p>
        </div>
        <div className="hero-actions">
          <Button>Open order board</Button>
          <Button variant="secondary">Update menu</Button>
        </div>
      </section>

      <section className="grid">
        {board.map((lane) => (
          <Card key={lane.title} title={lane.title} description={lane.description} />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Prep time controls</h2>
          <p className="muted">
            Adjust estimated prep times and notify riders automatically.
          </p>
        </div>
        <Button variant="ghost">Set prep time</Button>
      </section>
    </main>
  );
}
