import { Button, Result } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const CourseRoute = ({ children }) => {
  const { courseId } = useParams();
  const courses = useSelector((state) => state?.courses?.data);

  const specificCourse = courses?.find((course) => course.id === courseId);

  if (!specificCourse?.enrolled) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }

  return children;
};
export default CourseRoute;
