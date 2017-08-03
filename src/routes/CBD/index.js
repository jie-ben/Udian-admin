import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

function CBD ({ location, dispatch, cbd, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = cbd
  const { field, keyword } = location.query

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `cbd/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'cbd/hideModal',
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
        type: 'cbd/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    ondelete(data){
      dispatch({
        type: 'cbd/deletes',
        payload:{data,pagination}
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
        type: 'cbd/delete',
        payload: {id,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'cbd/showModal',
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
        pathname: '/cbd',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/cbd',
      }))
    },
    onAdd () {
      dispatch({
        type: 'cbd/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'cbd/switchIsMotion' })
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

CBD.propTypes = {
  cbd: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ cbd, loading }) => ({ cbd, loading: loading.models.cbd }))(CBD)
