import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserList from './UserList'
import UserFilter from './UserFilter'
import UserModal from './UserModal'

function Distributor ({ location, dispatch, distributor, loading }) {
  const { list, pagination, paginationModal, currentItem, walletList, modalVisible, modalType, isMotion,states,RejectId } = distributor
  const { field, keyword } = location.query
  const userModalProps = {
    visible: modalVisible,
    RejectId,
    onRejectRequest (e) {
      dispatch({
        type: 'distributor/RejectRequest',
        payload: {
          data:{
            id: e.id,
            msg: e.msg,
          },
          state:states,
          pagination:pagination
        },
      })
    },
    onCancel(){
      dispatch({
        type: 'distributor/hideModal',
      })
    }
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
    onwallet (id) {
      dispatch({
        type: 'distributor/wallets',
        payload: id,
      })
    },
    onShowModal(e){
      dispatch({
        type: 'distributor/showModal',
        payload:{
          RejectId:e.id
        }
      })
    },
    onDeleteItem (item) {
      dispatch({
        type: 'distributor/delete',
        payload:{
          id:item,
          pagination:pagination,
          state:states,
        }
      })
    },
    onChangeToAdmin (item,e) {
      dispatch({
        type: 'distributor/ChangeToAdmin',
        payload: {
          data:{
            id: item.id,
            state: e,
          },
          state:states,
          pagination:pagination
        },
      })
    },
    
  }

  const userFilterProps = {
    field,
    keyword,
    isMotion,
    onScreen(e){
        dispatch({
        type: 'distributor/query',
        payload: {
          state:e
        },
      })
    }
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

Distributor.propTypes = {
  distributor: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ distributor, loading }) => ({ distributor, loading: loading.models.Distributor }))(Distributor)
