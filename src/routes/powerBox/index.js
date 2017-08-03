import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import Download from './download'
import Batchadd from './batchadd'
import State from './stateModal'
function PowerBox ({ location, dispatch, powerBox, loading }) {
  const { list, listbank, pagination, currentItem, modalVisible, modalType, isMotion,wareList,downVisible, addVisible, stateVisible, boxNo, defaultValue }= powerBox
  const { field, keyword } = location.query
  console.log("wareList",wareList)
  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    ware:wareList,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `powerBox/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'powerBox/hideModal',
      })
    },
  }
  const downProps = {
    visible: downVisible,
    handleCancel(){
      dispatch({
        type:'powerBox/hideDown'
      })
    },
    onOk (data) {
      var page = sessionStorage.getItem("page");
      const { query, pathname } = location
      if(page==null){
        dispatch({
          type: 'powerBox/download',
          payload: {
            ...query
          },
        })
      }else{
        dispatch({
          type: 'powerBox/download',
          payload: {
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          },
        })
      } 
    },
  }
  const stateProps = {
    visible: stateVisible,
    boxNo,
    defaultValue,
    onOk(data){
      dispatch({
        type: 'powerBox/updateState',
        payload:{
          boxNo:data.boxNo,
          status:data.status,
        }
      })
    },
    onCancel (data) {
      dispatch({
        type: 'powerBox/hideState',
      })
    },
  }
  const batchProps ={
    visible: addVisible,
    onOk (data) {
      dispatch({
        type: `powerBox/batchadd`,
        payload: {
          amount:data.amount,
          boxLotNo:data.boxLotNo,
          factory:data.factory,
        },
      })
    },
    onCancel () {
      dispatch({
        type: 'powerBox/hideadd',
      })
    },
  }
  const listProps = {
    dataSource: list,
    Renderlist: listbank,
    loading,
    pagination,
    location,
    isMotion,
    onAdd () {
      dispatch({
        type: 'powerBox/ware',
        payload: {
          modalType: 'create',
        },
      })
    },
    // download(){
    //   var page = sessionStorage.getItem("page");
    //   const { query, pathname } = location
    //   if(page==null){
    //     dispatch({
    //       type: 'powerBox/download',
    //       payload: {
    //         ...query
    //       },
    //     })
    //   }else{
    //     dispatch({
    //       type: 'powerBox/download',
    //       payload: {
    //         ...query,
    //         page: page.current,
    //         pageSize: page.pageSize,
    //       },
    //     })
    //   }      
    // },
    batchAdd(){
      dispatch({
        type:'powerBox/showAdd'
      })
    },
    StateModal(data){
      dispatch({
        type:'powerBox/showState',
        payload:{
          boxNo:data.boxNo,
          defaultValue:data.val
        }
      })
    },
    download(){
      dispatch({
        type:'powerBox/showDown'
      })
    },
    onPageChange (page) {
      sessionStorage.setItem("page",page)
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
        type: 'powerBox/delete',
        payload: {id,pagination}
      })
    },
    ondelete (data) {
      dispatch({
        type: 'powerBox/deletes',
        payload: {data,pagination}
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'powerBox/ware',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    querybank(powerboxNo){
      dispatch({
        type: 'powerBox/bank',
        payload: {
          boxNo: powerboxNo
        },
      })
    }
  }

  const filterProps = {
    field,
    keyword,
    isMotion,
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/powerBox',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/powerBox',
      }))
    },
    onAdd () {
      dispatch({
        type: 'powerBox/showModal',
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
 const ModalState= () =>
    <State {...stateProps} />

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      <ModalGen />
      <Download {...downProps} />
      <Batchadd {...batchProps} />
      <ModalState/>
    </div>
  )
}

PowerBox.propTypes = {
  powerBox: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ powerBox, loading }) => ({ powerBox, loading: loading.models.powerBox }))(PowerBox)
