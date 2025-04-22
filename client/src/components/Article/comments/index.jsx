import React, { useState, useEffect } from 'react';
import { Avatar, Form, Button, Input, Typography, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, DeleteComment, getArticleData } from '../../../reducers/articlePageReducer';
import { DeleteFilled } from '@ant-design/icons';
import Styles from './index.module.css';

import { DateTime } from 'luxon';

const { TextArea } = Input;

const ArticleComments = (props) => {
  const dispatch = useDispatch();

  const articleId = props.articleId;
  const [submitting, setSubmitting] = useState(false);

  const initalComments = useSelector((state) => state.articlePage.comments);

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const user = useSelector((state) => state.auth.user);

  const addComment = (comment) => {
    dispatch(createComment(articleId, comment));
    setSubmitting(true);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    let date = new Date();
    let datetoString = date.toString();
    let comment = {
      body: value,
      authorPersonId: user._id,
      createdAt: datetoString,
    };
    addComment(comment);
    setSubmitting(false);
    setValue('');
  };

  useEffect(() => {
    dispatch(getArticleData(articleId));
  }, [dispatch, articleId]);

  return (
    <>
      {props.showEditor && (
        <CustomComment
          avatar={<Avatar src={user.photo} alt="Han Solo" />}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}

      {initalComments?.length > 0 && <CommentList comments={initalComments} articleId={articleId} />}
    </>
  );
};

const CommentList = ({ comments, articleId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className={Styles.commentItem}>
          <CustomComment
            avatar={<Avatar src={comment.createdBy?.photo || user.photo} />}
            content={comment.body}
            author={comment.createdBy?.name || user.name}
            datetime={DateTime.fromISO(comment.createdAt).toRelative()}
          />
          {(user._id === comment.authorPersonId || user._id === comment?.createdBy?._id) && (
            <Button
              type="text"
              icon={<DeleteFilled />}
              onClick={() => dispatch(DeleteComment(articleId, comment))}
              className={Styles.deleteButton}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const CustomComment = ({ avatar, content, author, datetime }) => (
  <Card className={Styles.commentCard}>
    <Card.Meta
      avatar={avatar}
      title={<Typography.Text strong>{author}</Typography.Text>}
      description={datetime && <Typography.Text type="secondary">{datetime}</Typography.Text>}
    />
    <Typography.Paragraph>{content}</Typography.Paragraph>
  </Card>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <Form.Item>
    <TextArea rows={4} onChange={onChange} value={value} />
    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
      Add Comment
    </Button>
  </Form.Item>
);

export default ArticleComments;
