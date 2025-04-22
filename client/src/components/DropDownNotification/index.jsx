import React from 'react';
import { Dropdown, List, Badge, Avatar, Space, Typography } from 'antd';
import { BellFilled, AlertTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { delAll, del } from '../../reducers/notificationsReducer';
import { DateTime } from 'luxon';
import './DropDownNotification.css';

const { Text } = Typography;

function getNoticeData(data) {
  return data.map((item) => {
    let avatar;

    if (item.type === 'follow' || item.type === 'bookmark') {
      avatar = 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png';
    } else if (item.type === 'like') {
      avatar = 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png';
    } else if (item.type === 'comment') {
      avatar = 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png';
    } else if (item.type === 'admin') {
      avatar = 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png';
    } else if (item.type === 'alert') {
      avatar = <AlertTwoTone />;
    }

    return {
      id: item._id,
      avatar: avatar,
      title: item.type,
      description: item.data,
      datetime: DateTime.fromISO(item.updatedAt).toRelative(),
    };
  });
}

const DropDownNotification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const data = getNoticeData(notifications);

  const onItemClick = (itemId) => {
    dispatch(del(itemId));
  };

  const notificationList = (
    <div style={{ maxHeight: 300, overflowY: 'auto', width: 300, padding: 8 }}>
      {data.length > 0 ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={() => onItemClick(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <List.Item.Meta
                  avatar={
                    typeof item.avatar === 'string' ? (
                      <Avatar src={item.avatar} />
                    ) : (
                      item.avatar
                    )
                  }
                  title={item.title}
                  description={
                    <>
                      <div>{item.description}</div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.datetime}
                      </Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <div
            style={{
              textAlign: 'center',
              padding: '8px 0',
              borderTop: '1px solid #f0f0f0',
              cursor: 'pointer',
              fontWeight: 500,
              color: '#1890ff',
            }}
            onClick={() => dispatch(delAll())}
          >
            Clear All
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 10px' }}>
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            alt="no notifications"
            style={{ width: 80, marginBottom: 10 }}
          />
          <div>You have viewed all notifications</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="dropdown-div">
      <Dropdown menu={notificationList} placement="bottomRight" trigger={['click']}>
        <Badge count={notifications.length} overflowCount={99}>
          <BellFilled style={{ fontSize: 20, cursor: 'pointer' }} />
        </Badge>
      </Dropdown>
    </div>
  );
};

export default DropDownNotification;
