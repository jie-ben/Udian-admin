import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'

function WareHouse ({ location, dispatch, wareHouse, loading }) {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion } = wareHouse
  const { field, keyword } = location.query
  const listProps = {
    dataSource: list,
    loading,
    pagination,
    location,
    isMotion,
    onAdd () {
      dispatch({
        type: 'wareHouse/cbd',
        payload: {
          modalType: 'create',
        }
      })
      dispatch(routerRedux.push('/wareHouseCreate'))
    },
    ondelete(data){
      dispatch({
        type: 'wareHouse/deletes',
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
        type: 'wareHouse/delete',
        payload: {id,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'wareHouse/cbd',
        payload: {
          modalType: 'update',
          currentItem: item
        }
      })
      dispatch(routerRedux.push('/wareHouseCreate'))
    },
  }
  const filterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/wareHouse',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/wareHouse',
      }))
    },
    onAdd () {
      dispatch({
        type: 'wareHouse/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'wareHouse/switchIsMotion' })
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
    </div>
  )
}

WareHouse.propTypes = {
  wareHouse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ wareHouse, loading }) => ({ wareHouse, loading: loading.models.wareHouse }))(WareHouse)
