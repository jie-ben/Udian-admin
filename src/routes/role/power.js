
import { Form, Icon, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
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
      console.log(checkedValues)
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
    for(xin in grantRoleItme.rolePerMap){
      for(let i = 0;i<grantRoleItme.rolePerMap[xin].length;i++){
        if(grantRoleItme.rolePerMap[xin][i].checked){
          var permissionId = JSON.stringify(grantRoleItme.rolePerMap[xin][i].permissionId)
          ItmeArray.push(permissionId)
        }
      }
    }
    return (
      <div>
        <Modal title="设置权限"
          visible={visible}
          onOk={handleSubmit}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
         <Checkbox.Group onChange={onChange} defaultValue={ItmeArray}>
            <Row>
              <p style={{marginTop:10}}>角色管理:</p>
              <Col span={8}><Checkbox value="20">角色列表</Checkbox></Col>
              <Col span={8}><Checkbox value="21">创建角色</Checkbox></Col>
              <Col span={8}><Checkbox value="22">删除角色</Checkbox></Col>
              <Col span={8}><Checkbox value="23">更新角色</Checkbox></Col>
              <Col span={8}><Checkbox value="24">角色授权</Checkbox></Col>
            </Row>
            
            <Row>
              <p style={{marginTop:10}}>用户地址管理</p>
              <Col span={8}><Checkbox value="8">用户地址列表</Checkbox></Col>
              <Col span={8}><Checkbox value="9">新增用户地址</Checkbox></Col>
              <Col span={8}><Checkbox value="10">修改用户地址</Checkbox></Col>
              <Col span={8}><Checkbox value="11">移除用户地址</Checkbox></Col>
            </Row>
            
            <Row>
              <p style={{marginTop:10}}>用户管理</p>
              <Col span={8}><Checkbox value="12">用户列表</Checkbox></Col>
              <Col span={8}><Checkbox value="13">新增用户</Checkbox></Col>
              <Col span={8}><Checkbox value="14">修改用户</Checkbox></Col>
              <Col span={8}><Checkbox value="15">移除用户</Checkbox></Col>
            </Row>
            
            <Row>
              <p style={{marginTop:10}}>用户管理</p>
              <Col span={8}><Checkbox value="1">管理员列表</Checkbox></Col>
              <Col span={8}><Checkbox value="2">新增管理员</Checkbox></Col>
              <Col span={8}><Checkbox value="3">移除管理员</Checkbox></Col>
              <Col span={8}><Checkbox value="4">更新管理员</Checkbox></Col>
              <Col span={8}><Checkbox value="6">帐户授权</Checkbox></Col>
              <Col span={8}><Checkbox value="7">重置管理员密码</Checkbox></Col>
            </Row>
            
            <Row>
              <p style={{marginTop:10}}>用户管理</p>
              <Col span={8}><Checkbox value="16">地区列表</Checkbox></Col>
              <Col span={8}><Checkbox value="17">移除地区</Checkbox></Col>
              <Col span={8}><Checkbox value="18">编辑地区</Checkbox></Col>
              <Col span={8}><Checkbox value="19">新增地区</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </Modal>
      </div>
    );
  }
}
export default Form.create()(download)