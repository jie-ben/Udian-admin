import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'

const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location }) {
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
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
  const orderTime =(text) =>{
    return text == "" ? text +"分" : "无"
  }
  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },{
      title: '订单序列号',
      dataIndex: 'orderSerial',
      key: 'orderSerial',
    }, {
      title: '使用时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      render:(text) => <span>{orderTime(text)}</span>
    },  {
      title: '金额',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render:(text) => <span>{text/100}元</span>
    }, {
      title: '充电箱编号',
      dataIndex: 'powerBoxNo',
      key: 'powerBoxNo',
    }, {
      title: '充电宝编号',
      dataIndex: 'powerBankNo',
      key: 'powerBankNo',
    }, {
      title: '租借场所',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
    }, {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      render:(text) => <span>{orderType(text)}</span>
    }, {
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[ { key: '2', name: '删除' }]} />
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: pagination.current,
  }

  const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1200 }}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        pagination={pagination}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list
