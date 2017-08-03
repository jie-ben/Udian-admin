import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import config from '../../utils/config.js'
import styles from './List.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'
import {isEmptyObject} from '../../utils/index.js'
import wareHouse from '../../../assets/wareHouse.png'
const confirm = Modal.confirm

class list extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    loadingDel: false,
  };
  constructor(props) {
        super(props);
    }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    return selectedRowKeys
  }
  render() {
    const {
        loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location, onAdd, ondelete
      } = this.props
   const start = () => {
    this.setState({ loadingDel: true });
    let dataStr = ''

    for(let i = 0; i<this.state.selectedRowKeys.length; i ++){
      if(i !== this.state.selectedRowKeys.length - 1 ){
        dataStr += this.state.selectedRowKeys[i] + ","
      }else{
        dataStr += this.state.selectedRowKeys[i] 
      }
    }
    ondelete(dataStr)    
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loadingDel: false,
      });
    }, 1000);
  }
    const label =(text)=>{
      if(text.indexOf("label") >=0){
        let address = JSON.parse(text).label
        return address
      }else{
        return text  
      }
    }
    const imgurl =(text) =>{
      if(text !== "string" || text == undefined){
        return wareHouse 
      }else{
        return config.IMGURL + text
      }
    }
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width:'100',
        fixed: 'left',
      },{
        title: '省市区',
        dataIndex: 'province',
        key: 'province',
        width:'150',
        render:(text) =><span>{label(text)}</span>
      },{
        title: '所属商圈',
        dataIndex: 'cbd',
        width:'100',
        key: 'cbd',
      },{
        title: '详细位置',
        dataIndex: 'address',
        key: 'address',
        width:'300',
      },{
        title: '行业',
        dataIndex: 'industry',
        key: 'industry',
        width:'100',
      },{
        title: '联系人',
        dataIndex: 'contract',
        key: 'contract',
        width:'100',
      },{
        title: '联系人电话',
        dataIndex: 'contractTel',
        key: 'contractTel',
        width:'150',
      },{
        title: '联系人手机',
        dataIndex: 'contractMobile',
        key: 'contractMobile',
        width:'150',
      },{
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width:'200',
      },{
        title: '图片',
        dataIndex: 'logo',
        key: 'logo',
        width:'200',
        render: (text) => <img src={ imgurl(text)} height="60" />
      },{
        title: '创建日期',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width:'150',
        render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
      }, {
        title: '操作',
        key: 'operation',
        width: '100',
        fixed: 'right',
        render: (text, record) => {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' }]} />
        },
      },
    ]
    const getBodyWrapperProps = {
      page: location.query.page,
      current: pagination.current,
    }

    const getBodyWrapper = body => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }


    const handleMenuClick = (record, e) => {
      if (e.key === '1') {
        onEditItem(record)
      } else if (e.key === '2') {
        confirm({
          title: '您确定要删除这条记录吗?',
          onOk () {
            onDeleteItem(record.id)
          },
        })
      }
    }


    const { loadingDel, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" size="large" onClick={onAdd}>添加</Button>
          <Button type="primary" size="large" onClick={start} disabled={!hasSelected} loading={loadingDel} style={{ marginLeft: 8 }} >批量删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `您选择了 ${selectedRowKeys.length} 项记录` : ''}</span>
        </div>
        <Table
          rowSelection={rowSelection}
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 1850 }}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          onChange={onPageChange}
          pagination={pagination}
          simple
          rowKey={record => record.id}
          getBodyWrapper={getBodyWrapper}
        />
      </div>
    );
  }
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default list
