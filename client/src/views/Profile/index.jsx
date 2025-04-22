import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import './style.css';
import { Form, Input, Card, Button } from 'antd';
import { editProfile } from '../../reducers/authReducer';
import { useDropzone } from 'react-dropzone';
import notificationsService from '../../services/notifications';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dd9woerrp/upload';
const UPLOAD_PRESET = 'unsigned_profile_upload';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [userName, setUserName] = useState(user.username);
  const [photo, setPhoto] = useState(user.photo);
  const [active, setActive] = useState(true);

  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onUserNameChange = (e) => setUserName(e.target.value);
  const onMobileChange = (e) => setMobile(e.target.value);

  const onsave = () => {
    dispatch(
      editProfile({
        name,
        email,
        username: userName,
        mobile,
        photo: typeof photo === 'string' ? photo : '',
      })
    );
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setPhoto(data.secure_url);
      setActive(true);
      console.log('Uploaded to Cloudinary:', data.secure_url);
    } catch (error) {
      console.error('Cloudinary upload error:', error);
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPhoto(file);
    setActive(false);
  };

  const handleUpload = async () => {
    if (photo && typeof photo !== 'string') {
      await uploadToCloudinary(photo);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.png', '.jpeg'] },
    maxSize: 1048576, // 1MB
  });

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Meta avatar={<Avatar size="large" src={photo || user.photo} />} title={user.name} />
          </div>
          <h5 className="card-title">{'Role: ' + user.role}</h5>
          <h5 className="card-text">{'@' + user.username}</h5>
          <p className="card-text">
            {user.email}
            <br />
            <span className="phone">{user.mobile}</span>
          </p>
        </div>
        <span>user's Bio</span>
      </div>

      <Card className="Form">
        <Form size="middle" colon={true} labelAlign="left" layout="vertical">
          <Form.Item label="Name:">
            <Input allowClear className="input" value={name} onChange={onNameChange} />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input allowClear className="input" value={userName} onChange={onUserNameChange} />
          </Form.Item>
          <Form.Item label="Email:">
            <Input allowClear className="input" value={email} onChange={onEmailChange} />
          </Form.Item>
          <Form.Item label="Mobile:">
            <Input allowClear className="input" value={mobile} onChange={onMobileChange} />
          </Form.Item>
          <Form.Item label="Photo:">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one</p>
            </div>
            <button type="button" onClick={handleUpload}>Upload!</button>
          </Form.Item>
          <Button disabled={!active} onClick={onsave} loading={!active}>Save Changes</Button>
          <Button
            className="unsub"
            type="text"
            onClick={() => notificationsService.unsubscribe()}
            title="re-login to subscribe again!!"
          >
            unsubscribe from notifications on all devices
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
