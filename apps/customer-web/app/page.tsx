import { Button, Card } from "@pidedirecto/ui";
import { formatCurrency } from "@pidedirecto/utils";

const highlights = [
  {
    title: "Discovery",
    description: "Personalized restaurant and cuisine recommendations."
  },
  {
    title: "Fast checkout",
    description: "Saved payment methods with express reorder flows."
  },
  {
    title: "Live tracking",
    description: "Real-time order status and rider location updates."
  }
];

export default function CustomerWebHome() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Customer PWA Web Storefront</p>
          <h1>Everything your customers need to order in seconds.</h1>
          <p className="muted">
            Search, discover, and reorder from trusted restaurants with a fast
            PWA experience.
          </p>
        </div>
        <div className="hero-actions">
          <Button>Start ordering</Button>
          <Button variant="secondary">View promos</Button>
        </div>
      </section>

      <section className="grid">
        {highlights.map((item) => (
          <Card key={item.title} title={item.title} description={item.description} />
        ))}
      </section>

      <section className="panel">
        <div>
          <h2>Promo spotlight</h2>
          <p className="muted">
            Activate a welcome coupon for first-time customers and boost conversion.
          </p>
        </div>
        <div className="promo">
          <span className="promo-label">WELCOME20</span>
          <strong>{formatCurrency(20)} off</strong>
          <Button variant="ghost">Apply</Button>
        </div>
      </section>
    </main>
  );
}
