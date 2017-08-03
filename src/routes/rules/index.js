import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

function Rules ({ location, dispatch, rules, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = rules
  const { field, keyword } = location.query

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `rules/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'rules/hideModal',
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
        type: 'rules/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    ondelete(data){
      dispatch({
        type: 'rules/deletes',
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
        type: 'rules/delete',
        payload: {id,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'rules/showModal',
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
        pathname: '/rules',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/rules',
      }))
    },
    onAdd () {
      dispatch({
        type: 'rules/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'rules/switchIsMotion' })
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

Rules.propTypes = {
  rules: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ rules, loading }) => ({ rules, loading: loading.models.rules }))(Rules)
