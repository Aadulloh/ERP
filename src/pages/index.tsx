import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const NotFound = lazy(() => import("./not-found/not-found"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Groups = lazy(() => import("./groups/groups"));
const Courses = lazy(() => import("./courses/course"));
const Branches = lazy(() => import("./branches/branch"));
const ProtectChildrem = lazy(() => import("./protect-routes/layout-protect"));
const LoginChildren = lazy(() => import("./protect-routes/layout-protect"));

export {
  SignIn,
  SignUp,
  NotFound,
  TeacherLayout,
  StudentLayout,
  AdminLayout,
  Groups,
  Courses,
  Branches,
  ProtectChildrem,
  LoginChildren
};
