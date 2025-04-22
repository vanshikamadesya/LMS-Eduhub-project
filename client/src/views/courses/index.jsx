import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Modal,
  Input,
  List,
  Collapse,
  Empty,
} from "antd";
import {
  CaretRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { FlexSectionHeader } from "../style";
import CourseCard from "../../components/CourseCard";
import Spinner from "../../components/Spinner";

import {
  getAllCourses,
  deleteCourse,
  enroll,
  unEnroll,
} from "../../reducers/courseReducer";

const { Title, Text } = Typography;
const { confirm } = Modal;

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const courses = useSelector(
    (state) =>
      state.courses?.data?.filter((course) => course.status !== "archived") ||
      []
  );
  const loading = useSelector((state) => state.courses.loading);

  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const filteredCourses = courses?.filter((course) =>
    course.name.toLowerCase().includes(filter.toLowerCase())
  );

  const removeCourse = (courseId) => {
    dispatch(deleteCourse(courseId));
  };

  const handleEnroll = (courseId, userId) => {
    dispatch(enroll(courseId, userId));
  };

  const handleUnenroll = (courseId, userId) => {
    dispatch(unEnroll(courseId, userId));
  };

  const handleSearch = (value) => {
    setFilter(value);
  };

  const confirmEnrolled = (courseId, userId) => {
    confirm({
      title: "Do you want to enroll in this course?",
      icon: <ExclamationCircleOutlined />,
      content: "You have to enroll in the course to view its content.",
      onOk() {
        handleEnroll(courseId, userId);
      },
    });
  };

  const handleCourseCardClick = (courseId, userId, userEnrolled) => {
    if (userEnrolled) navigate(`/app/course/${courseId}/modules`);
    else confirmEnrolled(courseId, userId);
  };

  const courseList = (
    filteredCourses?.length > 0 ? (
      <List
        grid={{
          gutter: 24,
          column: 3,
          xs: 1,
          sm: 2,
          xxl: 5,
        }}
        dataSource={filteredCourses}
        renderItem={(course) => (
          <List.Item>
            <CourseCard
              course={course}
              removeCourse={() => removeCourse(course.id)}
              handleEnroll={() => handleEnroll(course.id, user._id)}
              handleUnenroll={() => handleUnenroll(course.id, user._id)}
              onClick={() =>
                handleCourseCardClick(course.id, user._id, course.enrolled)
              }
            />
          </List.Item>
        )}
      />
    ) : (
      <Empty
        description={
          <span>
            No courses available.{" "}
            {user?.role === "instructor" && "Create your first course!"}
          </span>
        }
      />
    )
  );

  if (loading) return <Spinner size="large" />;

  return (
    <>
      <FlexSectionHeader>
        <Title level={3}>All Courses</Title>
        <Input.Search
          allowClear
          onSearch={handleSearch}
          placeholder="input search text"
          size="large"
          style={{ width: "300px", alignSelf: "center" }}
        />
      </FlexSectionHeader>

      <div style={{ marginTop: "8px" }}>
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={["1"]}
          ghost
          items={[
            {
              key: "1",
              label: <Text strong>Public Courses</Text>,
              children: courseList,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Courses;
