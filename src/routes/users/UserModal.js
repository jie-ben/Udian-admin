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
  onpage,
  wallet = [],
  onCancel,
  paginationModal,
}) => {
  const modalOpts = {
    title: `消费明显`,
    visible,
    onOk: onCancel,
    onCancel,
    width:'70%',
    wrapClassName: 'vertical-center-modal',
  }
  const orderType =(e)=>{
    let orderType = ""
    switch(e)
    {
        case 0:
            orderType = "借电扣款"
            break;
        case 1:
            orderType = "充值押金"
            break;
        case 2:
            orderType = "充值余额"
            break;
    }
    return orderType
  }
  const walletcolumns = [{
    title: '用户姓名',
    dataIndex: 'userName',
    key: 'userName',
  }, {
    title: '金额操作类型',
    dataIndex: 'balanceType',
    key: 'balanceType',
    render:(text) => <span>{text =orderType(text)}</span>
  },{
    title: '操作金额',
    dataIndex: 'useBalance',
    key: 'useBalance',
    render:(text) => <span>{text =  text/100}元</span>
  }, {
    title: '操作前金额',
    dataIndex: 'useBeforeBalance',
    key: 'useBeforeBalance',
    render:(text) => <span>{text =  text/100}元</span>
  }, {
    title: '操作后金额 ',
    dataIndex: 'useAfterBalance',
    key: 'useAfterBalance',
    render:(text) => <span>{text =  text/100}元</span>
  }, {
    title: '钱包记录号',
    dataIndex: 'walletSerial',
    key: 'walletSerial',
  },  {
    title: '操作时间',
    dataIndex: 'operatorTime',
    key: 'operatorTime',
    render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
  }, {
    title: '该笔操作是否成功',
    dataIndex: 'resultStatus',
    key: 'resultStatus',
    render:(text) => <span>{text = text == 0 ? '失败' :'成功' }</span>
  }];
  const onChange =(e)=>{
    const data = {
      openid:wallet[0].openId,
      current:e.current,
      pageSize:e.pageSize
    }
    onpage(data)
  }
  return (
    <Modal {...modalOpts}>
      <Table
      dataSource={wallet} 
      columns={walletcolumns} 
      pagination = {paginationModal}
      onChange = {onChange}
      />
    </Modal>
  )
}

modal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
