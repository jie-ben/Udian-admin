import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Modal from './Modal'

function WareHouseCreate ({ location, dispatch, wareHouse }) {

  const { currentItem, modalVisible, modalType, cbdList } = wareHouse

  const wareHouseCreateProps = {
    item: modalType === 'create' ? {} : currentItem,
    type: modalType,
    cbd: cbdList,
    visible: modalVisible,
    onOk (data) {
      dispatch({
        type: `wareHouse/${modalType}`,
        payload: data
      })
    },
    onCancel () {
      console.info('取消');
      dispatch(routerRedux.push('/wareHouse'))
    }
  }

  return (
    <div className='content-inner'>
      <Modal {...wareHouseCreateProps}/>
    </div>
  )
}

function mapStateToProps ({ wareHouse }) {
  return { wareHouse }
}

export default connect(mapStateToProps)(WareHouseCreate)