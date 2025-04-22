import React from 'react'
import { useNavigate, useParams, Link, NavLink } from 'react-router-dom'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import useCoursePrivilege from '../../hooks/useCourseprivilege'

const CourseMenu = ({ url, privilege }) => {
  const menuItems = [
    {
      key: 'announcements',
      label: <Link to={`${url}/announcments`}>Announcments</Link>
    },
    {
      key: 'gradebook',
      label: <Link to={`${url}/gradebook`}>GradeBook</Link>
    },
    {
      key: 'discussions',
      label: <Link to={`${url}/discussions`}>Discussions</Link>
    }
  ]

  if (privilege !== 'student') {
    menuItems.push(
      {
        key: 'participants',
        label: <Link to={`${url}/particpants`}>Particpants</Link>
      },
      {
        key: 'settings',
        label: <Link to={`${url}/settings`}>Settings</Link>
      }
    )
  }

  return <Menu items={menuItems} />
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Space>
        <Button
          shape="circle"
          type="secondary"
          onClick={popHistory}
          icon={<ArrowLeftOutlined />}
        />
        <Dropdown
          menu={{ items: <CourseMenu url={url} privilege={privilege} /> }}
          placement="bottom"
        >
          <Button shape="round" style={{ backgroundColor: course.backgroundColor }}>
            <span style={{ fontWeight: 600, color: 'white' }}>{course.name}</span>{' '}
            <DownOutlined style={{ color: 'white' }} />
          </Button>
        </Dropdown>
      </Space>
      <div style={{ display: 'flex', gap: '8px' }}>
        <NavLink to={`${url}/modules`}>
          {(props) => (
            <Button type="text" {...props}>
              Modules
            </Button>
          )}
        </NavLink>
        <NavLink to={`${url}/lectures`}>
          {(props) => (
            <Button type="text" {...props}>
              Lectures
            </Button>
          )}
        </NavLink>
        <NavLink to={`${url}/assignments`}>
          {(props) => (
            <Button type="text" {...props}>
              Assignments
            </Button>
          )}
        </NavLink>
        <NavLink to={`${url}/exams`}>
          {(props) => (
            <Button type="text" {...props}>
              Exams
            </Button>
          )}
        </NavLink>
      </div>
    </div>
  )
}

export default CourseNavigation
