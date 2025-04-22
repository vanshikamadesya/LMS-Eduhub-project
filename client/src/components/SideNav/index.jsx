import React from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'

import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined
} from '@ant-design/icons'

import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'
import Logo from '../Logo'

const SideNav = (props) => {
  const { collapsed, onCollapse } = props
  const { Sider } = Layout

  let currentPath = useLocation().pathname

  // dummy fix for side nav highlight
  if (currentPath.includes('/app/course/'))
    currentPath = currentPath.replace('/app/course/', '/app/courses/')

  const menuItems = [
    {
      key: '/app/dashboard',
      icon: <DashboardOutlined />,
      label: <NavLink to="/app/dashboard">Dashboard</NavLink>
    },
    {
      key: '/app/courses',
      icon: <ImBooks />,
      label: <NavLink to="/app/courses">Courses</NavLink>
    },
    {
      key: '/app/calendar',
      icon: <CalendarOutlined />,
      label: <NavLink to="/app/calendar">Calendar</NavLink>
    },
    {
      key: '/app/articles',
      icon: <RiArticleLine />,
      label: <NavLink to="/app/articles">Articles</NavLink>
    },
    {
      key: '/app/acheivements',
      icon: <CrownOutlined />,
      label: <NavLink to="/app/acheivements">Achievements</NavLink>
    },
    {
      key: '/app/archives',
      icon: <HddOutlined />,
      label: <NavLink to="/app/archives">Archives</NavLink>
    },
    {
      key: '/app/profile',
      icon: <UserOutlined />,
      label: <NavLink to="/app/profile">Profile</NavLink>
    }
  ]

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="lg"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}
    >
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => (window.location = 'https://gp-eduhub.github.io/')}
      >
        <Logo collapsed={collapsed} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[currentPath]}
        items={menuItems}
      />
    </Sider>
  )
}

export default SideNav
