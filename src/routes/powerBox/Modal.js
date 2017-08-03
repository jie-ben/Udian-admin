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
  ware = [],
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

      let tempData = {...getFieldsValue()}
      let warehouseName = ';'
      console.info("ware==",ware)
      let warehouse = tempData.warehouse
      for(let i = 0; i<ware.length; i++){
        if(warehouse == ware[i].id){
          warehouseName = ware[i].name
        }
      }
      const data = {
        ...getFieldsValue(),
        warehouseName:warehouseName,
        key: item.key,
      }
      onOk(data)
    })
  }
  const wareChildren = [];
      for (let i = 0; i < ware.length; i++) {
          wareChildren.push(<Option key={ware[i].id}>{ware[i].name}</Option>);
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
        <FormItem label="箱子批次号:" hasFeedback {...formItemLayout}> 
          {getFieldDecorator('boxLotNo', {
            initialValue: item.boxLotNo,
            rules: [
              {
                required: true,
                message: '箱子批次号未填写',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="编号:" hasFeedback {...formItemLayout}>
          {getFieldDecorator('powerboxNo',  {
            initialValue: item.powerboxNo,
            rules: [
              {
                required: false,
                message: '箱子编号未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} disabled="disabled"  />)}
        </FormItem>
        <FormItem label="厂家" hasFeedback {...formItemLayout}>
          {getFieldDecorator('factory', {
            initialValue: item.factory,
            rules: [
              {
                required: true,
                message: '厂家未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="纬度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('latitude', {
            initialValue: item.latitude,
            rules: [
              {
                required: true,
                message: '纬度未填写',
              },
            ],
          })(<Input style = {{width:'100%'}} />)}
        </FormItem>
        <FormItem label="经度" hasFeedback {...formItemLayout}>
          {getFieldDecorator('longitude', {
            initialValue: item.longitude ,
            rules: [
              {
                required: true,
                message: '经度未填写',
              },
            ],
          })(<Input rows={4} />)}
        </FormItem>
        <FormItem label="场所" hasFeedback {...formItemLayout}>
          {getFieldDecorator('warehouse', {
            initialValue: item.warehouse,
            rules: [
              {
                required: false,
                message: '详细地址未填写',
              },
            ],
          })(<Select>{wareChildren}</Select>)}
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
