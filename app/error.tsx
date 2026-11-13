"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main id="main" className="page"><section className="error-panel"><p className="eyebrow">ДАННЫЕ НЕДОСТУПНЫ</p><h1>Не удалось загрузить курсы</h1><p>Попробуйте ещё раз через несколько секунд.</p><button onClick={reset}>Повторить</button><Link href="/courses" prefetch={false}>Вернуться в каталог</Link></section></main>;
}
