import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import styles from './UserList.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'


const confirm = Modal.confirm

function list ({ loading, dataSource, pagination, onPageChange, onDeleteItem, onwallet, isMotion, location }) {
  const handleMenuClick = (record) => {
      onwallet(record)
  }


  const columns = [
    {
      title: '头像',
      dataIndex: 'logo',
      key: 'logo',
      width: 64,
      className: styles.avatar,
      render: (text) => <img alt={'avatar'} width={24} src={text} />,
    },{
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      render:(text) => <span>{text/100}</span>
    }, {
      title: '押金',
      dataIndex: 'deposit',
      key: 'deposit',
      render:(text) => <span>{text/100}</span>
    }, {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (text) => <span>{text
            ? '男'
            : '女'}</span>,
    }, {
      title: '电话',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '住址',
      dataIndex: 'province',
      key: 'province',
    }, {
      title: '创建时间',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => <a onClick={() => handleMenuClick(record)}>消费明显</a>
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
