import { Modal, Button,  Form, Input, InputNumber, Radio  } from 'antd';
import PropTypes from 'prop-types'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
}
 

const state = ({
  visible,
  onOk,
  onCancel,
  defaultValue,
  boxNo,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  console.log("defaultValue==",defaultValue)
  let handleFormLayout = ''
  const handleFormLayoutChange = (e) => {
      handleFormLayout = e.target.value
    }
    function handleOk(){
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          boxNo:boxNo,
          status:handleFormLayout =='' ?defaultValue:handleFormLayout
        }
        onOk(data)
      })
    }
    return (
      <div>
        <Modal
          title="修改状态"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={handleOk}
          onCancel={onCancel}
        >
          <Form layout="horizontal" style ={{textAlign:'center'}}>
            <RadioGroup defaultValue= {JSON.stringify(defaultValue)} style = {{ marginTop:30,marginBotton:30,}} size="large" onChange={ handleFormLayoutChange }>
              <RadioButton value="0">未激活</RadioButton>
              <RadioButton value="1">正常</RadioButton>
              <RadioButton value="2">使用中</RadioButton>
              <RadioButton value="3">异常</RadioButton>
              <RadioButton value="4">维修中</RadioButton>
            </RadioGroup>
          </Form>
        </Modal>
      </div>
    );
}

state.propTypes = {
  form: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  defaultValue: PropTypes.string,
  boxNo: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

export default Form.create()(state)
