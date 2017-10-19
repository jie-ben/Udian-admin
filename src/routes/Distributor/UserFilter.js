import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Switch,Select } from 'antd'
import { Search } from '../../components'
const Option = Select.Option;
const UserFilter = ({
  field,
  keyword,
  isMotion,
  onScreen,
}) => {
  const handleChange =(e)=>{
    console.log("eee",e)
    onScreen(e)
  }
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <Select defaultValue="-1" style={{ width: 120 }} onChange={handleChange}>
          <Option value="-1">全部</Option>
          <Option value="0">申请拒绝</Option>
          <Option value="1">新申请</Option>
          <Option value="2">申请中</Option>
          <Option value="3">申请通过</Option>
        </Select>
      </Col>
    </Row>
  )
}

UserFilter.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
}

export default Form.create()(UserFilter)
