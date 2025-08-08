import { Route, Routes } from "react-router-dom";

// Import the AuthenticatedRoute and UnauthenticatedRoute components
import { AuthenticatedRoute, UnauthenticatedRoute } from "./AuthenticatedRoute";

// Import components
import Register from "@/pages/auth/Register";
import { NotFound } from "@/pages/Not-found";
import { Profile } from "@/pages/dashboard/Profile";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Articles from "@/pages/dashboard/articles/MainArticles";
import Category from "@/pages/dashboard/category/Category";
import CreateArticles from "@/pages/dashboard/articles/CreateArticles";
import DetailArticles from "@/pages/dashboard/articles/DetailArticles";
import Comments from "@/pages/dashboard/comments/Comments";

const AppRouter = () => {
  return (
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />

      {/* Register page */}
      <Route
        path="/register"
        element={
          <UnauthenticatedRoute>
            <Register />
          </UnauthenticatedRoute>
        }
      />
      {/* Login page */}
      <Route
        path="/login"
        element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        }
      />

      {/* Protected routes */}
      <Route element={<MainLayout />}>
        <Route
          path="/articles"
          element={
            <AuthenticatedRoute>
              <Articles />
            </AuthenticatedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/articles/create"
          element={
            <AuthenticatedRoute>
              <CreateArticles />
            </AuthenticatedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/articles/:documentId"
          element={
            <AuthenticatedRoute>
              <DetailArticles />
            </AuthenticatedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/category"
          element={
            <AuthenticatedRoute>
              <Category />
            </AuthenticatedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/comments"
          element={
            <AuthenticatedRoute>
              <Comments />
            </AuthenticatedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/profile"
          element={
            <AuthenticatedRoute>
              <Profile />
            </AuthenticatedRoute>
          }
        />
      </Route>

      {/* Route if url doesn't exists*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
