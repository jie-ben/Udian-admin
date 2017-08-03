import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import config from '../../utils/config.js'
import { Form, Input, InputNumber, Radio, Modal,Upload,Icon,Select, Mention  } from 'antd'
const FormItem = Form.Item
const Option = Select.Option;

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
    title: `${type === 'create' ? '新建充电柜' : '修改充电柜'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="账号名称:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: '账号名称未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="真实名字" hasFeedback {...formItemLayout}>
          {getFieldDecorator('realName', {
            initialValue: item.realName,
            rules: [
              {
                required: true,
                message: '真实名字未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                message: '手机号未填写',
              },
            ],
          })(<InputNumber  style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="座机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [
              {
                required: true,
                message: '座机号未填写',
              },
            ],
          })(<InputNumber  style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                message: '邮箱未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="管理员类型" hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message: '管理员类型未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
                message: '密码未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="描述" hasFeedback {...formItemLayout}>
          {getFieldDecorator('description', {
            initialValue: item.description,
            rules: [
              {
                required: false,
                message: '密码未填写',
              },
            ],
          })(<Input type="textarea"  style = {{width:'100%'}} />)}
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
