import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Button, Input, Typography } from "antd";
import Spinner from "../../../components/Spinner";
import {
  getAllComments,
  createComment,
  deleteComment,
} from "../../../reducers/lectureCommentsReducer";
import CustomComment from "./CustomComment";
import styled from "styled-components";
import { DateTime } from "luxon";

export const Container = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 20px;
`;

const CommentForm = (props) => {
  const { addComment, avatar } = props;
  const { courseId } = useParams();

  const course = useSelector((state) =>
    state.courses?.data?.find((course) => course.id === courseId)
  );

  const { status } = course || { status: "published" };

  const handleSubmit = (values) => {
    addComment({ comment: values.comment });
  };

  return (
    <CustomComment
      avatar={avatar}
      content={
        <Form onFinish={handleSubmit}>
          <Form.Item name="comment" rules={[{ required: true }]}>
            <Input.TextArea allowClear={true} rows={4} />
          </Form.Item>
          <Form.Item>
            {status !== "archived" && (
              <Button htmlType="submit" type="primary">
                Add Comment
              </Button>
            )}
          </Form.Item>
        </Form>
      }
    />
  );
};

const LectureComments = (props) => {
  const dispatch = useDispatch();
  const { selectedLecture } = props;
  const { courseId } = useParams();

  const comments = useSelector((state) => state.lectureComments.data.comments);
  const loading = useSelector((state) => state.lectureComments.loading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAllComments(courseId, selectedLecture.id));
  }, [courseId, selectedLecture, dispatch]);

  if (loading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  const addComment = (moduleItemId, comment) => {
    dispatch(createComment(courseId, moduleItemId, comment));
  };

  const removeComment = (moduleItemId, commentId) => {
    dispatch(deleteComment(courseId, moduleItemId, commentId));
  };

  const getActions = (
    currentUserId,
    commentAuthorId,
    moduleItemId,
    commentId
  ) => {
    if (currentUserId === commentAuthorId)
      return [
        <Typography.Text
          onClick={() => removeComment(moduleItemId, commentId)}
          type="danger"
        >
          Delete
        </Typography.Text>,
      ];
    return [];
  };

  return (
    <Container>
      <Typography.Title level={4}>Comments</Typography.Title>
      <div style={{ padding: "0px 8px" }}>
        {comments.map((comment) => (
          <CustomComment
            key={comment.id}
            author={comment.user.name}
            avatar={comment.user.photo}
            content={comment.comment}
            datetime={DateTime.fromISO(comment.updatedAt).toRelative()}
            actions={getActions(
              user._id,
              comment.user._id,
              selectedLecture.id,
              comment.id
            )}
          />
        ))}
      </div>
      <CommentForm
        avatar={<Avatar src={user.photo} />}
        addComment={(comment) => {
          addComment(selectedLecture.id, comment);
        }}
      />
    </Container>
  );
};

export default LectureComments;
