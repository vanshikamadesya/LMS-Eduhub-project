import { Divider, message, Typography, Upload } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  addQuestion,
  markForEdit,
  removeQuestion,
  replaceQuestion
} from '../../../reducers/assessmentCreationReducer'
import QuestionList from './QuestionList'

import { InboxOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'

const { Dragger } = Upload
const { Title } = Typography

const AssessmentQuestionsSection = (props) => {
  const dispatch = useDispatch()

  const { courseId } = useParams()

  const {
    title,
    setTitle,
    questions,
    controlledQuestionType,
    files,
    setFiles
  } = props

  const createQuestion = () => {
    dispatch(addQuestion())
  }
  const updateQuestion = (question) => {
    dispatch(replaceQuestion(question))
  }
  const deleteQuestion = (question) => {
    dispatch(removeQuestion(question))
  }
  const draftQuestion = (question) => {
    dispatch(markForEdit(question))
  }

  const handleFileRemove = async (removedFile) => {
    let cloudinaryURL = ''
    if (!removedFile.error) {
      setFiles(
        files.filter((file) => {
          if (file.uid === removedFile.uid) cloudinaryURL = file.url
          return file.uid !== removedFile.uid
        })
      )
      // Remove file from Cloudinary
      const publicId = cloudinaryURL.split('/').pop().split('.')[0]
      await removeFileFromCloudinary(publicId)
    }
  }

  const handleFileSubmit = ({ file, onSuccess, onError }) => {
    uploadFileToCloudinary(file)
      .then((url) => {
        setFiles(files.concat([{ name: file.name, url: url, uid: file.uid }]))
        onSuccess()
      })
      .catch((error) => {
        console.error(error)
        onError(error)
      })
  }

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'unsigned_profile_upload')
    formData.append('cloud_name', 'dd9woerrp')

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dd9woerrp/upload',
        {
          method: 'POST',
          body: formData
        }
      )
      const data = await response.json()
      return data.secure_url // This is the URL you can store
    } catch (error) {
      throw new Error('File upload failed')
    }
  }

  const removeFileFromCloudinary = async (publicId) => {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/resources/image/upload/${publicId}`, // Replace with Cloudinary API URL
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${btoa('your_cloud_name:your_api_secret')}` // Authentication (replace with your API credentials)
          }
        }
      )
      await response.json()
    } catch (error) {
      console.error('Error deleting file from Cloudinary', error)
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#fafafa',
        width: '95%',
        margin: '0 auto',
        borderRadius: '10px',
        padding: '20px 20px'
      }}
    >
      <Title editable={{ onChange: setTitle }} level={3}>
        {title}
      </Title>

      <Divider />

      {controlledQuestionType === 'online' && (
        <QuestionList
          questions={questions}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          draftQuestion={draftQuestion}
          createQuestion={createQuestion}
        />
      )}

      {controlledQuestionType === 'file' && (
        <Dragger
          onChange={(info) => {
            const { status } = info.file
            if (status === 'done')
              message.success(`${info.file.name} file uploaded successfully.`)
            else if (status === 'error')
              message.error(`${info.file.name} file upload failed.`)
          }}
          customRequest={handleFileSubmit}
          onRemove={handleFileRemove}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      )}
    </div>
  )
}

export default AssessmentQuestionsSection
