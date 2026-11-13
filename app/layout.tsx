import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Course Catalog · Мои курсы",
  description: "Каталог курсов и учебный план студента. Лабораторная 8.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#main">Перейти к содержимому</a>
        <header className="site-header">
          <Link href="/courses" className="brand" prefetch={false}>
            <span className="brand-mark" aria-hidden="true">c.</span>
            <span>course catalog<small>Учебное пространство</small></span>
          </Link>
          <nav aria-label="Основная навигация">
            <Link href="/courses" prefetch={false}>Каталог</Link>
            <Link href="/my-courses" prefetch={false}>Мои курсы</Link>
          </nav>
          <span className="semester">Advanced Web Technologies</span>
        </header>
        {children}
        <footer className="site-footer"><span>Course Catalog</span><span>Лабораторная 08 · REST & GraphQL</span></footer>
      </body>
    </html>
  );
}
