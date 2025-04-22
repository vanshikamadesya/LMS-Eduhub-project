import {
  Collapse,
  List,
  Space,
  Button,
  Typography,
  Form,
  Modal,
  Input
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import ModuleItem from './ModuleItem'
import ModuleItemForm from './ModuleItemForm'

const ModuleList = (props) => {
  const {
    module,
    instructorAccess,
    editModule,
    removeModule,
    addModuleItem,
    removeModuleItem
  } = props

  const [editModalActive, setEditModalActive] = useState(false)
  const [form] = Form.useForm()

  const loadingUpload = module.loadingUpload

  const handleCancel = () => {
    setEditModalActive(false)
  }

  const items = [
    {
      key: '1',
      label: <Typography.Text strong>{module.title}</Typography.Text>,
      extra: instructorAccess && (
        <Space
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditModalActive(true)
            }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={() => removeModule(module.id)}
          />
        </Space>
      ),
      children: (
        <>
          <List
            locale={{ emptyText: 'no items' }}
            dataSource={module.moduleItems}
            renderItem={(item) => (
              <ModuleItem
                removeModuleItem={removeModuleItem}
                item={item}
                instructorAccess={instructorAccess}
              />
            )}
          />
          <ModuleItemForm
            addModuleItem={addModuleItem}
            instructorAccess={instructorAccess}
            loadingUpload={loadingUpload}
          />
        </>
      )
    }
  ]

  return (
    <>
      <Modal
        title="Edit Module"
        open={editModalActive}
        onOk={form.submit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Submit
          </Button>
        ]}
      >
        <Form
          name="edit Module"
          form={form}
          onFinish={editModule}
          requiredMark={false}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            name="title"
            label="Course Module"
            rules={[
              {
                required: true,
                message: 'Please enter the module name'
              }
            ]}
          >
            <Input placeholder="New Module Name" />
          </Form.Item>
        </Form>
      </Modal>

      <Collapse
        style={{
          borderRadius: '10px',
          width: '100%',
          fontSize: '16px',
          border: '0px'
        }}
        defaultActiveKey={['1']}
        expandIconPosition={'start'}
        items={items}
      />
    </>
  )
}

export default ModuleList
