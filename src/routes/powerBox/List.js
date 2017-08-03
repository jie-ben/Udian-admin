import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Badge, Menu, Dropdown, Icon } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'

const confirm = Modal.confirm
//expandedRowKeys
class list extends React.Component {
  state = {
    selectedRowKeys: [],  // Check here to configure the default column
    expandedRowKeys:[],
    loadingDel: false,
  };

  constructor(props) {
        super(props);
    }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }
  render() {
    const { expandedRowKeys } = this.state
    const {
        loading, dataSource, Renderlist, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location, onAdd,ondelete, download, batchAdd, querybank, StateModal
      } = this.props 
     const expandedRowRender = () => {
      const columns = [
        {
         title: '充电宝编号',
         dataIndex: 'powerbankNo',
         key: 'powerbankNo' 
       },{ 
          title: '当前电量', 
          dataIndex: 'power', 
          key: 'power',
          render:(text) => <span>{text}%</span> 
        },{ 
          title: '租用状态', 
          dataIndex: 'status', 
          key: 'status', 
          render: (text) => <span>{text == 0 ? '已借' : '待借'}</span> 
        },{ 
          title: '备用信息', 
          dataIndex: 'remark',
          key: 'remark' 
        },
      ];
      const data = [];
      for (let i = 0; i < Renderlist.length; ++i) {
        data.push({
          key: i,
          powerbankNo: Renderlist[i].powerbankNo,
          power:Renderlist[i].power,
          status:Renderlist[i].status,
          upgradeNum: Renderlist[i].upgradeNum,
        });
      }
      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      );
    };
    
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


        });
      }, 1000);
  }
  const statusxiu =(text) =>{
      let sta = ''
      switch(text)
      {
        case 0:
          sta = '未激活'
          break;
        case 1:
          sta ='正常'
          break; 
        case 2:
          sta = '使用'
          break;
        case 3:
          sta ='异常'
          break;
        case 4:
          sta= '维修中'
          break;
      }
    return sta
  }
    const columns = [
      {
        title: '箱子批次号',
        dataIndex: 'boxLotNo',
        key: 'boxLotNo',
      },{
        title: '箱子编号',
        dataIndex: 'powerboxNo',
        key: 'powerboxNo',
      },{
        title: '场所',
        dataIndex: 'warehouseName',
        key: 'warehouseName'
      }, {
        title: '纬度',
        dataIndex: 'latitude',
        key: 'latitude',
      }, {
        title: '经度',
        dataIndex: 'longitude',
        key: 'longitude',
      },{
        title: '厂家',
        dataIndex: 'factory',
        key: 'factory',
      },{
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render:(text) =><span>{text =  statusxiu(text)}</span>
      },{
        title: '创建日期',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => {
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '编辑' }, { key: '2', name: '删除' },{ key: '3', name: '状态' }]} />
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
      }else if(e.key ==="3"){
        let data = {
          boxNo:record.powerboxNo,
          val:record.status
        }
        StateModal(data)
      }
    }
    const { loadingDel, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const onExpandedRowsChange =(e,x)=>{
      let xid = e ? [x.id] : []
      this.setState({ expandedRowKeys:xid });
      let powerboxNo = x.powerboxNo
      e ? querybank(powerboxNo):""
    }
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" size="large" onClick={onAdd}>添加</Button>
          <Button type="primary" size="large" onClick={batchAdd} style={{marginLeft:8}}>批量添加</Button>
          <Button type="primary" size="large" onClick={download} style={{marginLeft:8}}>批量下载二维码</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `您选择了 ${selectedRowKeys.length} 项记录` : ''}</span>
        </div>
        <Table
          rowSelection={rowSelection}
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 100 }}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          expandedRowRender={expandedRowRender}
          onExpand = {onExpandedRowsChange}
          expandedRowKeys = {expandedRowKeys}
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

