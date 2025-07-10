import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("./not-found/not-found"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const ProtectedLogIn = lazy(() => import("./protect/login-protect"));
const ProtectedLogOut = lazy(() => import("./protect/logout-protect"));
const Course = lazy(() => import("./courses/course"));


export {
  SignIn,
  SignUp,
  NotFound,
  TeacherLayout,
  StudentLayout,
  AdminLayout,
  Groups,
  ProtectedLogIn,
  ProtectedLogOut,
  Course
};
