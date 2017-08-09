
import { Form, Icon, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import styles from './List.less'
const FormItem = Form.Item;

class download extends React.Component {
  state = {
  }
  render() {
    const { confirmLoading} = this.state;
    const { visible, handleCancel,onOk,grantRoleItme } = this.props;
    const { getFieldDecorator,validateFields, getFieldsValue } = this.props.form;
    let itm = [];
    function onChange(checkedValues) {
      itm = checkedValues
    }
    function handleSubmit (){
      const data = {
        perId:itm,
        roleId:grantRoleItme.roleId
      }
      onOk(data)
    }

    let xin
    let ItmeArray =[]
    let RowArray = []
    for(xin in grantRoleItme.rolePerMap){
      let RowA = []
      for(let i = 0;i<grantRoleItme.rolePerMap[xin].length;i++){
        RowA.push(<Col span={8}><Checkbox value={grantRoleItme.rolePerMap[xin][i].permissionId}>{grantRoleItme.rolePerMap[xin][i].displayName}</Checkbox></Col>)
        if(grantRoleItme.rolePerMap[xin][i].checked){
          var permissionId = JSON.stringify(grantRoleItme.rolePerMap[xin][i].permissionId)
          ItmeArray.push(permissionId)
        }
      }
      RowArray.push(<Row><p style={{marginTop:10}}>{xin}</p>{RowA}</Row>)
    }
    return (
      <div  >
        <Modal title="设置权限"
          visible={visible}
          onOk={handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className = {styles.checkboxRow}>
            <Checkbox.Group onChange={onChange}  className = {styles.checkboxRow} defaultValue={ItmeArray}>{RowArray}</Checkbox.Group>
          </div>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(download)