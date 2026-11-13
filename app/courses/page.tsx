import Link from "next/link";
import { getJson } from "@/lib/api";

type Course = { id: string; title: string; description: string; credits: number; level: string; isElective: boolean };

export default async function CoursesPage() {
  const courses = await getJson<Course[]>("/courses?sort=title");
  return (
    <main id="main" className="page">
      <div className="page-heading"><div><p className="eyebrow">УЧЕБНАЯ ПРОГРАММА</p><h1>Каталог курсов</h1><p className="subtitle">Выберите направление, которое хочется изучать.</p></div><Link className="text-link" href="/my-courses" prefetch={false}>Мой учебный план ↗</Link></div>
      <div className="catalog-grid">{courses.map((course, index) => (
        <article key={course.id} className="catalog-card">
          <div className="card-top"><span className={`course-number tint-${index % 3}`} aria-hidden="true">{(index + 1).toString().padStart(2, "0")}</span><span className="small-label">{course.isElective ? "ЭЛЕКТИВНЫЙ" : "ОБЯЗАТЕЛЬНЫЙ"}</span></div>
          <h2>{course.title}</h2><p>{course.description}</p>
          <div className="card-bottom"><span className={`level level-${course.level}`}>{course.level}</span><span>{course.credits} кредитов</span></div>
        </article>
      ))}</div>
    </main>
  );
}
