export interface CourseFormValues {
  title: string;
  description: string;
  price: number;
  duration: string;
  lessons_in_a_week: number;
  lesson_duration: string;
}

export interface Course extends CourseFormValues {
  id: number;
}
