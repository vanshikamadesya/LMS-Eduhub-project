import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import { getAllNotifications } from "./reducers/notificationsReducer";
import SideNav from "./components/SideNav";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Registeration from "./pages/Registeration";
import ForgetPassword from "./pages/ForgetPassword";
import Courses from "./views/courses";
import Articles from "./views/articles";
import MyArticle from "./views/articles/myArticles/myArticles";
import MyBookMarks from "./views/articles/myBookMarks/myBookMarks";
import ArticlePage from "./views/ArticlePage";
import Profile from "./views/Profile";
import Exams from "./views/exams";
import { AssessmentCreation, Submissions } from "./views/exams";
import Lectures from "./views/lectures";
import Modules from "./views/modules";
import AssessmentTaking from "./views/assessmentTaking";
import DiscussionFeed from "./views/discussions";
import AnnouncementsFeed from "./views/announcements";
import Dashboard from "./views/dashboard";
import CourseCalendar from "./views/courseCalendar";
import GradeBook from "./views/gradeBook";
import NotFoundView from "./views/NotFoundView";
import Grader from "./views/assessmentGrading";

import "./App.css";

import AppHeader from "./components/AppHeader";
import CourseParticipants from "./views/courseParticipants";
import Assignments from "./views/assignments";
import CourseSettings from "./views/courseSettings";
import Achievements from "./views/achievements";
import CourseRoute from "./components/CourseRoute";
import Archives from "./views/archives";

// public routes redirect to /app if authenticated
// private routes redirect to login if not authenticated
const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/Register" element={<Registeration />} />
      <Route
        path="/ForgetPassword"
        element={<PublicRoute component={<ForgetPassword />} />}
      />
      <Route path="/login/*" element={<Login />} />

      {/* Private routes */}
      <Route
        path="/app/*"
        element={<PrivateRoute component={<AuthenticatedApp />} />}
      />

      {/* Future landing page redirect to app for now */}
      <Route path="/" element={<Navigate to="/app" />} />

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const AuthenticatedApp = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Content } = Layout;

  const location = useLocation();

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const currentLocationIS = (pathToMatch) => {
    const match = matchPath(location.pathname, pathToMatch);
    if (!match) return false;
    return true;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideNav collapsed={collapsed} onCollapse={onCollapse} />

      <Layout
        id="encklclkrmvlkemvklmvrekmv"
        style={{
          marginLeft: collapsed === true ? 80 : 200,
          transition: "margin-left .2s",
          width: "100%",
        }}
      >
        <AppHeader courseNavigation={currentLocationIS("/app/course/:id")} />

        <Content style={{ padding: "20px 32px", height: "100%" }}>
          <Routes>
            {/* Redirect to courses page for now */}
            <Route path="*" element={<Navigate to="courses" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<CourseCalendar />} />
            <Route path="courses" element={<Courses />} />
            {/* <Route path="course/:courseId/modules" element={<CourseRoute><Modules /></CourseRoute>}/> */}
            <Route 
              path="course/:courseId/*" 
              element={
                <CourseRoute>
                  <Routes>
                    <Route path="modules" element={<Modules />} />
                    <Route path="lectures" element={<Lectures />} />
                    <Route path="lectures/:lectureId" element={<Lectures />} />
                    <Route path=""/>
                  </Routes>
                </CourseRoute>
              }
            />



            {/* <CourseRoute
              path="/app/course/:courseId/assessment/:assessmentId/submissions"
              element={<Submissions />}
            />
            <CourseRoute
              path="/app/course/:courseId/assessment/:assessmentId/grade"
              element={<Grader />}
            />
            <CourseRoute
              path="/app/course/:courseId/exams/create"
              element={<AssessmentCreation assessmentType="Exam" />}
            />
            <CourseRoute
              path="/app/course/:courseId/assignments/create"
              element={<AssessmentCreation assessmentType="Assignment" />}
            />
            <CourseRoute
              path="/app/course/:courseId/exams"
              element={<Exams />}
            />
            <CourseRoute
              path="/app/course/:courseId/assignments"
              element={<Assignments />}
            />
            <CourseRoute
              path="/app/course/:courseId/lectures/:lectureId"
              element={<Lectures />}
            />
            <CourseRoute
              path="/app/course/:courseId/lectures"
              element={<Lectures />}
            />
            <CourseRoute
              path="/app/course/:courseId/exam/:assessmentId"
              element={<AssessmentTaking assessmentType="Exam" />}
            />
            <CourseRoute
              path="/app/course/:courseId/assignment/:assessmentId"
              element={<AssessmentTaking assessmentType="Assignment" />}
            />
            <CourseRoute
              path="/app/course/:courseId/discussions"
              element={
                <DiscussionFeed courseId={location.pathname.split("/")[3]} />
              }
            />
            <CourseRoute
              path="/app/course/:courseId/gradebook"
              element={<GradeBook courseId={location.pathname.split("/")[3]} />}
            />
            <CourseRoute
              path="/app/course/:courseId/announcments"
              element={
                <AnnouncementsFeed courseId={location.pathname.split("/")[3]} />
              }
            />
            <CourseRoute
              path="/app/course/:courseId/particpants"
              element={<CourseParticipants />}
            />
            <CourseRoute
              path="/app/course/:courseId/settings"
              element={<CourseSettings />}
            /> */}

            <Route path="/app/articles/:id" element={<ArticlePage />} />
            <Route path="/app/articles" element={<Articles />} />
            <Route path="/app/myarticle" element={<MyArticle />} />
            <Route path="/app/myBookMarks" element={<MyBookMarks />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/archives" element={<Archives />} />
            <Route path="/app/acheivements" element={<Achievements />} />
            <Route path="/app/*" element={<NotFoundView />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
