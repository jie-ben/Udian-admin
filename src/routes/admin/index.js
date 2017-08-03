import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import Account from './account'
function Admin ({ location, dispatch, admin, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion,AccountVisible,accountList, AccountId} = admin
  const { field, keyword } = location.query
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `admin/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'admin/hideModal',
      })
    },
  }
  const modalAccount = {
    list:accountList,
    AccountId,
    visible:AccountVisible,
    onOk (data) {
      console.log(data)
      dispatch({
        type: 'admin/grantAdmin',
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'admin/hideAccount',
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion,
    onAdd () {
      dispatch({
        type: 'admin/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
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
        type: 'admin/delete',
        payload: {id,pagination}
      })
    },
    ondelete (data) {
      dispatch({
        type: 'admin/deletes',
        payload: {data,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'admin/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    Account(id){
      dispatch({
        type: 'admin/account',
        payload:id,
      })
    }
  }

  const filterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/admin',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/admin',
      }))
    },
    onAdd () {
      dispatch({
        type: 'admin/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'power/switchIsMotion' })
    },
  }

  const ModalGen = () =>
    <Modal {...modalProps} />
  const ModalAccount = ()=> <Account {...modalAccount}/>
  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <ModalGen />
      <ModalAccount />
    </div>
  )
}

Admin.propTypes = {
  admin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ admin, loading }) => ({ admin, loading: loading.models.admin }))(Admin)
