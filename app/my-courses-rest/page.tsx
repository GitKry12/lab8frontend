import { StudyPlan } from "@/components/study-plan";
import { getJson } from "@/lib/api";

type Student = { id: number; name: string; email: string };
type Enrollment = { id: number; courseId: string };
type Course = { id: string; title: string; credits: number; level: string };

export default async function MyCoursesRestPage() {
  const [student, enrollments] = await Promise.all([
    getJson<Student>("/students/2"),
    getJson<Enrollment[]>("/students/2/enrollments"),
  ]);
  const courses = await Promise.all(enrollments.map((e) => getJson<Course>(`/courses/${e.courseId}`)));
  return <StudyPlan name={student.name} transport="REST"
    courses={courses.map((course) => ({ key: course.id, ...course }))} />;
}
