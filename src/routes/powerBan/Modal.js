import React from 'react'
import PropTypes from 'prop-types'
import styles from './Modal.less'
import config from '../../utils/config.js'
import { Form, Input, InputNumber, Radio, Modal,Upload,Icon,Select } from 'antd'
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
        <FormItem label="箱号:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('boxNo', {
            initialValue: item.boxNo,
            rules: [
              {
                required: true,
                message: '箱号未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="批次号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('lotNo', {
            initialValue: item.lotNo,
            rules: [
              {
                required: true,
                message: '批次号未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="场所编号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('warehouseNo', {
            initialValue: item.warehouseNo,
            rules: [
              {
                required: true,
                message: '场所编号未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
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
