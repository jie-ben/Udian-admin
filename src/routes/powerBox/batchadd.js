import { Modal, Button,  Form, Input, InputNumber, } from 'antd';
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
 

const batchadd = ({
  visible,
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
    function handleOk(){
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
        }
        onOk(data)
      })
    }
    return (
      <div>
        <Modal
          title="批量添加"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={handleOk}
          onCancel={onCancel}
        >
          <Form layout="horizontal">
            <FormItem label="箱子批次号:" hasFeedback {...formItemLayout}> 
              {getFieldDecorator('boxLotNo', {
                rules: [
                  {
                    required: true,
                    message: '箱子批次号未填写',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="厂家" hasFeedback {...formItemLayout}>
              {getFieldDecorator('factory', {
                rules: [
                  {
                    required: true,
                    message: '厂家未填写',
                  },
                ],
              })(<Input style = {{width:'100%'}} />)}
            </FormItem>
            <FormItem label="数量" hasFeedback {...formItemLayout}>
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: '厂家未填写',
                  },
                ],
              })(<Input style = {{width:'100%'}} />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
}
export default Form.create()(batchadd)
