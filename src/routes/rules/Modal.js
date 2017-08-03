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
    title: `${type === 'create' ? '添加规则' : '修改规则'}`,
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="区间最大时间:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('endHour', {
            initialValue: item.endHour,
            rules: [
              {
                required: true,
                message: '请填写正确区间',
              },
            ],
          })(<InputNumber min={0} max={24} style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="区间最小时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('startHour', {
            initialValue: item.startHour,
            rules: [
              {
                required: true,
                message: '请填写正确区间',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}}/>)}
        </FormItem>
        <FormItem label="最大费用" hasFeedback {...formItemLayout}>
          {getFieldDecorator('maxFee', {
            initialValue: item.maxFee,
            rules: [
              {
                required: true,
                message: '请填写正确费用',
              },
            ],
          })(<InputNumber min={0} max={24} style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="免费时间" hasFeedback {...formItemLayout}>
          {getFieldDecorator('freeHour', {
            initialValue: item.freeHour,
            rules: [
              {
                required: true,
                message: '请填写正确时间',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="费率" hasFeedback {...formItemLayout}>
          {getFieldDecorator('rate', {
            initialValue: item.rate,
            rules: [
              {
                required: true, 
                message: '请填写正确费率',
              },
            ],
          })(<InputNumber min={1} max={100000} style = {{width:'100%'}} />)}
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
