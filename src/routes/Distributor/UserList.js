import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onwallet, isMotion, location,onDeleteItem, onChangeToAdmin,onShowModal }) {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'contactName',
      key: 'contactName',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '地址',
      dataIndex: 'location',
      key: 'location',
    },{
      title: '资源',
      dataIndex: 'description',
      key: 'description',
    },{
      title: '等级',
      dataIndex: 'grade',
      key: 'grade',
    },{
      title: '收益占比',
      dataIndex: 'proportion',
      key: 'proportion',
      render:(text) => <span>{text}%</span>
    },{
      title: '申请状态',
      dataIndex: 'status',
      key: 'status',
      render:(text) => <span>{onStatus(text)}</span>
    },{
      title: '创建时间',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '审核中' },{ key: '2', name: '审核通过' },{ key: '3', name: '拒绝申请' },{ key: '4', name: '删除' }]} />
      },
    }
  ]
  const onStatus = (n) =>{
    let text
    switch (n)
    {
      case 0:
          text = '申请拒绝'
          break;
      case 1:
          text = '新申请'
          break;
      case 2:
          text = '审核中'
          break;
      case 3:
          text = '审核通过'
          break;    
    }
    return text
  }
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onChangeToAdmin(record,2)
    } else if (e.key === '2'){
      onChangeToAdmin(record,3)
    } else if (e.key === '3') {
      onShowModal(record)
    }else if (e.key === '4') {
      confirm({
        title: '您确定要删除这条记录吗?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
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
