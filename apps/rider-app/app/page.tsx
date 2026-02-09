import { Button, Card } from "@pidedirecto/ui";

const shifts = [
  { title: "Assignments", description: "5 deliveries in your queue." },
  { title: "Earnings", description: "Today: $86.40 across 9 drops." },
  { title: "Availability", description: "You are online in Zone 4." }
];

export default function RiderHome() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Rider PWA</p>
          <h1>Stay on route with live dispatch updates.</h1>
          <p className="muted">
            Accept assignments, get turn-by-turn navigation, and track earnings
            in real time.
          </p>
        </div>
        <div className="hero-actions">
          <Button>Go online</Button>
          <Button variant="secondary">View navigation</Button>
        </div>
      </section>

      <section className="grid">
        {shifts.map((shift) => (
          <Card key={shift.title} title={shift.title} description={shift.description} />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Next pickup</h2>
          <p className="muted">La Pizzeria · 1240 Mission St · Ready in 6 min</p>
        </div>
        <Button variant="ghost">Start route</Button>
      </section>
    </main>
  );
}
