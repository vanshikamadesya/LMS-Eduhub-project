import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="The page you are looking for doesn't exist."
      extra={<Button type="primary"><Link to="/app">Back to Home</Link></Button>}
    />
  );
};

export default NotFoundPage;
