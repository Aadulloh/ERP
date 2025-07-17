import * as Yup from "yup";

export const validationSchema = Yup.object({
  title: Yup.string().required("Course title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a whole number")
    .min(0, "Price cannot be less than 0")
    .integer("Price must be an integer")
    .required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  lessons_in_a_week: Yup.number()
    .typeError("Lessons per week must be a whole number")
    .min(1, "Lessons per week must be at least 1")
    .integer("Lessons per week must be an integer")
    .required("Lessons per week is required"),
  lesson_duration: Yup.string().required("Lesson duration is required"),
});
