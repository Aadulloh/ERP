import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  SignIn,
  SignUp,
  NotFound,
  TeacherLayout,
  StudentLayout,
  AdminLayout,
  Groups,
  ProtectedLogIn,
  Course,
} from "@pages";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <ProtectedLogIn>
              <SignIn />
            </ProtectedLogIn>
          }
        />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="groups" element={<Groups />} />
          <Route path="courses" element={<Course />} />
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
