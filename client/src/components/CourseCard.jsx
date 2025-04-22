import React from 'react'

import { Button, Card, Dropdown, Menu } from 'antd'

const CourseImage = ({ image, backgroundColor }) => {
  if (!image)
    return (
      <div style={{ backgroundColor: `${backgroundColor}`, height: 256 }}></div>
    )

  return (
    <img
      style={{
        maxHeight: 256,
        objectFit: 'cover',
        objectPosition: 'top'
      }}
      alt="course img"
      src={image}
    />
  )
}

const CardContent = (props) => {
  const {
    description,
    enrolled,
    onEnroll,
    onUnenroll,
    loadingEnroll,
    disableEnroll
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {description}
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        style={{
          marginTop: '20px',
          alignSelf: 'flex-end'
        }}
      >
        {!disableEnroll && (
          <>
            {!enrolled && (
              <Button loading={loadingEnroll} onClick={() => onEnroll()}>
                Enroll
              </Button>
            )}

            {enrolled && (
              <Button loading={loadingEnroll} onClick={() => onUnenroll()}>
                Unenroll
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const CourseCard = (props) => {
  const {
    course,
    onClick,
    handleEnroll,
    handleUnenroll,
    removeCourse,
    disableEnroll
  } = props
  const { enrolled, privilege } = course

  const loadingEnroll = course.loadingEnroll

  const menuItems = [
    ...(privilege === 'student' ? [
      {
        key: 'review',
        label: 'Review Course'
      }
    ] : []),
    ...(privilege === 'instructor' || privilege === 'admin' ? [
      {
        key: 'delete',
        label: 'Delete Course',
        danger: true,
        onClick: removeCourse
      }
    ] : [])
  ]

  return (
    <Card
      hoverable
      variant="borderless"
      cover={
        <CourseImage
          image={course.image}
          backgroundColor={course.backgroundColor}
        />
      }
      onClick={onClick}
    >
      <Card.Meta
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {course.name}
            <span
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {enrolled && !disableEnroll && (
                <Dropdown.Button
                  placement="bottom"
                  type="text"
                  menu={{ items: menuItems }}
                ></Dropdown.Button>
              )}
            </span>
          </div>
        }
        description={
          <CardContent
            loadingEnroll={loadingEnroll}
            description={course.description}
            enrolled={enrolled}
            onEnroll={handleEnroll}
            onUnenroll={handleUnenroll}
            disableEnroll={disableEnroll}
          />
        }
      />
    </Card>
  )
}

export default CourseCard
