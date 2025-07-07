export interface CourseFormValues {
  title: string;
  description: string;
  price: number;
  duration: string;
  lessons_in_a_week: number;
  lesson_duration: string;
}

export interface Group extends CourseFormValues {
  id: number;
}
