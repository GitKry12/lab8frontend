import Link from "next/link";

type Course = { key: string; title: string; credits: number; level: string };

export function StudyPlan({ name, courses, transport }: {
  name: string;
  courses: Course[];
  transport: "REST" | "GraphQL";
}) {
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return (
    <main id="main" className="page">
      <div className="page-heading">
        <div><p className="eyebrow">МОЁ ОБУЧЕНИЕ</p><h1>Мои курсы</h1><p className="subtitle">Всё, что вы изучаете, — в одном месте.</p></div>
        <div className="transport-switch" aria-label="Способ загрузки данных">
          <Link href="/my-courses" prefetch={false} aria-current={transport === "GraphQL" ? "page" : undefined}>GraphQL</Link>
          <Link href="/my-courses-rest" prefetch={false} aria-current={transport === "REST" ? "page" : undefined}>REST</Link>
        </div>
      </div>
      <section className="student-panel" aria-label="Учебный план студента">
        <div className="student-identity"><span className="avatar" aria-hidden="true">{initials}</span><div><p className="small-label">СТУДЕНТ</p><h2>{name}</h2><p>Ваш индивидуальный учебный план</p></div></div>
        <div className="student-stat"><strong>{courses.length.toString().padStart(2, "0")}</strong><span>курса в плане</span></div>
        <div className="student-stat"><strong>{credits}</strong><span>кредитов всего</span></div>
      </section>
      <div className="section-heading"><h2>Выбранные дисциплины</h2><span>{courses.length} курса</span></div>
      <ul className="course-list" data-testid="study-plan">
        {courses.map((course, index) => (
          <li className="course-row" key={course.key}>
            <span className={`course-number tint-${index % 3}`} aria-hidden="true">{(index + 1).toString().padStart(2, "0")}</span>
            <div className="course-info"><p className="small-label">ДИСЦИПЛИНА</p><h3>{course.title}</h3><span className={`level level-${course.level}`}>{course.level}</span></div>
            <div className="credit-count"><strong>{course.credits}</strong><span>кредитов</span></div>
          </li>
        ))}
      </ul>
      {courses.length === 0 && <p className="empty-state">Вы пока не записаны на курсы.</p>}
      <div className="catalog-prompt"><div><h3>Что будете изучать дальше?</h3><p>Все доступные дисциплины — в каталоге курсов.</p></div><Link href="/courses" prefetch={false}>Открыть каталог <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
