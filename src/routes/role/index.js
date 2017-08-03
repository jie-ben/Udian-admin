import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import Power from './power'

function Role ({ location, dispatch, role, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, PowerVisible, grantRoleItme} = role
  const { field, keyword } = location.query
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `role/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'role/hideModal',
      })
    },
  }
  const PowerProps = {
    visible: PowerVisible,
    grantRoleItme,
    onOk(data){
      dispatch({
        type: 'role/ToPower',
        payload: data,
      })
    },
    handleCancel:function(){
       dispatch({
        type: 'role/hidePower',
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
        type: 'role/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    onPower (data) {
      dispatch({
        type: 'role/grantRole',
        payload: {
          roleId:data
        } ,
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
        type: 'role/delete',
        payload: {id,pagination}
      })
    },
    ondelete (data) {
      dispatch({
        type: 'role/deletes',
        payload: {data,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'role/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }

  const filterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/role',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/role',
      }))
    },
    onAdd () {
      dispatch({
        type: 'role/showModal',
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
  const PowerGen = () =>
    <Power {...PowerProps} />

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <ModalGen />
      <PowerGen />
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ role, loading }) => ({ role, loading: loading.models.role }))(Role)
