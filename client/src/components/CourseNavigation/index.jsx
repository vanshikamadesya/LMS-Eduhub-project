import React from 'react'
import { useNavigate, useParams, Link, NavLink } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import useCoursePrivilege from '../../hooks/useCourseprivilege'

const CourseMenu = ({ url, privilege }) => {
  return (
    <Menu>
      <Menu.Item>
        <Link to={`${url}/announcments`}>Announcments</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/gradebook`}>GradeBook</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/discussions`}>Discussions</Link>
      </Menu.Item>
      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/particpants`}>Particpants</Link>
        </Menu.Item>
      )}
      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/settings`}>Settings</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

const CourseNavigation = () => {
  const { id } = useParams()
  const url = `/app/course/${id}`

  const navigate = useNavigate()
  const course = useSelector((state) =>
    state.courses.data.find((course) => course.id === id)
  )

  const { privilege } = useCoursePrivilege(id)

  const popHistory = () => {
    navigate(-1)
  }

  if (!course) return null

  return (
    <>
      <Space>
        <Button
          shape="circle"
          type="secondary"
          onClick={popHistory}
          icon={<ArrowLeftOutlined />}
        />
        <Dropdown
          overlay={<CourseMenu url={url} privilege={privilege} />}
          placement="bottomCenter"
        >
          <Button shape="round" style={{ backgroundColor: course.backgroundColor }}>
            <span style={{ fontWeight: 600, color: 'white' }}>{course.name}</span>{' '}
            <DownOutlined style={{ color: 'white' }} />
          </Button>
        </Dropdown>
      </Space>
      <NavLink to={`${url}/modules`}>
        <Button type="text">Modules</Button>
      </NavLink>
      <NavLink to={`${url}/lectures`}>
        <Button type="text">Lectures</Button>
      </NavLink>
      <NavLink to={`${url}/assignments`}>
        <Button type="text">Assignments</Button>
      </NavLink>
      <NavLink to={`${url}/exams`}>
        <Button type="text">Exams</Button>
      </NavLink>
    </>
  )
}

export default CourseNavigation
