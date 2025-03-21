import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <section className="page-content">
        <h2 className="main-title">Ласкаво просимо на платформу</h2>
        <p className="intro-text">Платформа для зберігання та управління медичними картками пацієнтів.</p>

        <div className="card-container">
          <div className="card">
            <h3>Що ми пропонуємо?</h3>
            <p>Ми надаємо зручний інтерфейс для ведення медичних записів пацієнтів, їх історії хвороб та лікарських рекомендацій.</p>
          </div>
          <div className="card">
            <h3>Інтуїтивно зрозуміло</h3>
            <p>Інтерфейс нашої системи простий та інтуїтивно зрозумілий для користувачів будь-якого рівня технічної підготовки.</p>
          </div>
        </div>

        <div className="cta-container">
          <Link href="/virtual-list">
            <button className="cta-btn">Переглянути пацієнтів</button>
          </Link>

          {/* <Link href="/lazy-patient">
            <button className="cta-btn">Ліниве завантаження</button>
          </Link> */}
        </div>
      </section>
    </div>
  );
}
