import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <section className="page-content">
        <h2>Головна</h2>
        <p>Ласкаво просимо на нашу платформу для зберігання та управління медичними картками.</p>
        <div className="card">
          <h3>Що ми пропонуємо?</h3>
          <p>Ми надаємо зручний інтерфейс для ведення медичних записів пацієнтів.</p>
        </div>
        
        <Link href="/patient-info">
          <button>Переглянути інформацію про пацієнта</button>
        </Link>

        <Link href="/virtual-list">
          <button>Віртуальний список пацієнтів</button>
        </Link>

        <Link href="/lazy-patient">
          <button>Ліниве завантаження</button>
        </Link>
      </section>
    </div>
  );
}
