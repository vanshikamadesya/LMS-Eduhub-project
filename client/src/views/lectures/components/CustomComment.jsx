import React from 'react';
import { Avatar, Button, Typography } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const CommentContainer = styled.div`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentBody = styled.div`
  font-size: 14px;
  color: #333;
`;

const CommentActions = styled.div`
  margin-top: 8px;
  text-align: right;
`;

const CustomComment = ({ author, avatar, content, datetime, actions }) => (
    <CommentContainer>
        <CommentHeader>
            <Avatar src={avatar} />
            <div style={{ marginLeft: 8 }}>
                <Typography.Text strong>{author}</Typography.Text>
                <div style={{ fontSize: '12px', color: '#888' }}>
                    {datetime}
                </div>
            </div>
        </CommentHeader>
        <CommentBody>{content}</CommentBody>
        <CommentActions>{actions}</CommentActions>
    </CommentContainer>
);

export default CustomComment;
