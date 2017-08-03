import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { AnimTableBody } from '../../components'
import { DropOption } from '../../components'

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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const {
        loading, dataSource, pagination, onPageChange, onDeleteItem, onEditItem, isMotion, location, onAdd,ondelete
      } = this.props
  const start = () => {
      this.setState({ loadingDel: true });
      // ajax request after empty completing
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
    const columns = [
      {
        title: '商圈名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '商圈经度',
        dataIndex: 'longitude',
        key: 'longitude',
      }, {
        title: '商圈纬度',
        dataIndex: 'latitude',
        key: 'latitude',
      },{
        title: '商圈半径',
        dataIndex: 'radius',
        key: 'radius',
        render:(text) => <span>{text = text + '米'}</span>
      },{
        title: '商圈基本信息',
        dataIndex: 'info',
        key: 'info',
      }, {
        title: '创建日期',
        dataIndex: 'createdDate',
        key: 'createdDate',
        render:(text) => <span>{text = new Date(text).toLocaleString()}</span>
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
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
          <Button type="primary" size="large" onClick={start} disabled={!hasSelected} loading={loadingDel} style={{ marginLeft: 8 }}>批量删除</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `您选择了 ${selectedRowKeys.length} 项记录` : ''}</span>
        </div>
        <Table
          rowSelection={rowSelection}
          className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
          bordered
          scroll={{ x: 1200 }}
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
