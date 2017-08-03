import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Switch } from 'antd'
import { Search } from '../../components'

const UserFilter = ({
  field,
  keyword,
  onSearch,
  onAdd,
  isMotion,
  switchIsMotion,
}) => {
  const searchGroupProps = {
    field,
    keyword,
    size: 'large',
    select: true,
    selectOptions: [{ value: 'nickName', name: '昵称' }, { value: 'mobile', name: '电话' }],
    selectProps: {
      defaultValue: field || 'nickName',
    },
    onSearch: (value) => {
      onSearch(value)
    },
  }
  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
        <Search {...searchGroupProps} />
      </Col>
      <Col lg={{ offset: 8, span: 8 }} md={12} sm={8} xs={24} style={{ marginBottom: 16, textAlign: 'right' }}>
        {/* <Switch style={{ marginRight: 16 }} defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'动画开'} unCheckedChildren={'动画关'} /> */}
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
