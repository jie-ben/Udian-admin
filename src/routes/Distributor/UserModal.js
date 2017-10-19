import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Table } from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  visible,
  onRejectRequest,
  RejectId,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk () {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: RejectId
      }
      console.log(data)
      onRejectRequest(data)
    })
  }

  const modalOpts = {
    title: `拒绝理由`,
    visible,
    onOk: handleOk,
    onCancel,
    width:'300px',
    wrapClassName: 'vertical-center-modal',
  }
  
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="拒绝理由:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('msg', {
            rules: [
              {
                required: true,
                message: '商圈名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
