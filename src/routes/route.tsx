import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
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
  LoginChildren,
} from "@pages";
const App = lazy(() => import("../App"));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            // <LoginChildren>
              <SignIn />
            // </LoginChildren>
          }
        />
        <Route path="sign-up" element={<SignUp />} />

        <Route
          path="admin"
          element={
            <ProtectChildrem>
              <AdminLayout />
            </ProtectChildrem>
          }
        >
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Courses />} />
          <Route path="branches" element={<Branches />} />
        </Route>

        <Route path="teacher" element={<TeacherLayout />}></Route>
        <Route path="student" element={<StudentLayout />}></Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
