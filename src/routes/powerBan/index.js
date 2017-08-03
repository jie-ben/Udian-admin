import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

function PowerBan ({ location, dispatch, powerBan, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion} = powerBan
  const { field, keyword } = location.query
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `powerBan/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'powerBan/hideModal',
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
        type: 'powerBan/showModal',
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
        type: 'powerBan/delete',
        payload: {id,pagination}
      })
    },
    ondelete (data) {
      dispatch({
        type: 'powerBan/deletes',
        payload: {data,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'powerBan/showModal',
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
        pathname: '/powerBan',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/powerBan',
      }))
    },
    onAdd () {
      dispatch({
        type: 'powerBan/showModal',
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

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <ModalGen />
    </div>
  )
}

PowerBan.propTypes = {
  powerBan: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ powerBan, loading }) => ({ powerBan, loading: loading.models.powerBan }))(PowerBan)
