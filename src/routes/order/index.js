import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from './UserList'
import UserFilter from './UserFilter'
import UserModal from './UserModal'

function Order ({ location, dispatch, order, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = order
  const { field, keyword } = location.query

  const userModalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `order/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'order/hideModal',
      })
    },
  }

  const userListProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion,
    onPageChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'order/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/order',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/order',
      }))
    },
    onAdd () {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'order/switchIsMotion' })
    },
  }

  const UserModalGen = () =>
    <UserModal {...userModalProps} />

  return (
    <div className="content-inner">
      <UserFilter {...userFilterProps} />
      <UserList {...userListProps} />
      <UserModalGen />
    </div>
  )
}

Order.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ order, loading }) => ({ order, loading: loading.models.order }))(Order)
