import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal } from 'antd'
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
  type,
  item = {},
  onOk,
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
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    title: `${type === 'create' ? '新建商圈' : '修改商圈'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="商圈名称:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '商圈名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="商圈经度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('longitude', {
            initialValue: item.longitude,
            rules: [
              {
                required: true,
                message: '商圈经度未填写',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}}/>)}
        </FormItem>
        <FormItem label="商圈纬度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('latitude', {
            initialValue: item.latitude,
            rules: [
              {
                required: true,
                message: '商圈纬度未填写',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="商圈半径" hasFeedback {...formItemLayout}>
          {getFieldDecorator('radius', {
            initialValue: item.radius,
            rules: [
              {
                required: true,
                message: '商圈半径未填写',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="商圈基本信息" hasFeedback {...formItemLayout}>
          {getFieldDecorator('info', {
            initialValue: item.info,
            rules: [
              {
                required: false,
                message: '商圈基本信息未填写',
              },
            ],
          })(<Input type="textarea" rows={4} />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  type: PropTypes.string,
  item: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
