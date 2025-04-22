import React from 'react'
import { Dropdown, Avatar, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../../reducers/authReducer'

const ProfileIcon = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  const clickHandler = ({ key }) => {
    if (key === 'SIGN_OUT') {
      dispatch(logout())
    }
  }

  const menuItems = [
    {
      key: 'PROFILE',
      label: <NavLink to="/app/profile">My Profile</NavLink>,
    },
    {
      key: 'SIGN_OUT',
      label: 'Sign out',
    },
  ];
  
  const menu = <Menu onClick={clickHandler} items={menuItems} />;
  
  return (
    <Dropdown
      style={{}}
      menu={menu}
      trigger={['click']}
      placement="topRight"
      arrow
    >
      <Avatar src={user.photo} style={{ cursor: 'pointer' }}></Avatar>
    </Dropdown>
  )
}

export default ProfileIcon
