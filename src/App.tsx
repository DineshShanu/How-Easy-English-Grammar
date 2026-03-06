import React, { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Shell from "./components/Shell";
import { AppStateProvider, useAppState } from "./state/AppState";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Lessons = lazy(() => import("./pages/Lessons"));
const Lesson = lazy(() => import("./pages/Lesson"));
const Quizzes = lazy(() => import("./pages/Quizzes"));
const Vocabulary = lazy(() => import("./pages/Vocabulary"));
const DailyChallenge = lazy(() => import("./pages/DailyChallenge"));

const Blog = lazy(() => import("./pages/Blog"));
const Worksheets = lazy(() => import("./pages/Worksheets"));
const Tips = lazy(() => import("./pages/Tips"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

function LessonRoute() {
  const { lessonId } = useParams();
  return <Lesson key={lessonId} />;
}

function RouteLoading() {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80 dark:text-slate-200">
        Loading…
      </div>
    </div>
  );
}

function Authed({ children }: Readonly<{ children: React.ReactNode }>) {
  const { state } = useAppState();
  if (!state.session.userId) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Shell>
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              <Route
                path="/dashboard"
                element={
                  <Authed>
                    <Dashboard />
                  </Authed>
                }
              />
              <Route
                path="/lessons"
                element={
                  <Authed>
                    <Lessons />
                  </Authed>
                }
              />
              <Route
                path="/lessons/:lessonId"
                element={
                  <Authed>
                    <LessonRoute />
                  </Authed>
                }
              />
              <Route
                path="/quizzes"
                element={
                  <Authed>
                    <Quizzes />
                  </Authed>
                }
              />
              <Route
                path="/vocabulary"
                element={
                  <Authed>
                    <Vocabulary />
                  </Authed>
                }
              />
              <Route
                path="/daily-challenge"
                element={
                  <Authed>
                    <DailyChallenge />
                  </Authed>
                }
              />
              <Route
                path="/contact"
                element={
                  <Authed>
                    <ContactUs />
                  </Authed>
                }
              />

              <Route path="/blog" element={<Blog />} />
              <Route path="/worksheets" element={<Worksheets />} />
              <Route path="/tips" element={<Tips />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Shell>
      </BrowserRouter>
    </AppStateProvider>
  );
}
