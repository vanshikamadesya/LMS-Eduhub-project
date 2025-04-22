import React from 'react'

import { Space } from 'antd'
import ProfileIcon from '../ProfileIcon'
import DropDownNotification from '../DropDownNotification'
import CourseNavigation from '../CourseNavigation'

import styled from 'styled-components'

const FlexedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #fff;
`

const AppHeader = ({ courseNavigation }) => {
  return (
    <FlexedDiv>
      <div style={{ flex: 1 }}>
        {courseNavigation && <CourseNavigation />}
      </div>
      <Space>
        <DropDownNotification />
        <ProfileIcon />
      </Space>
    </FlexedDiv>
  )
}

export default AppHeader
