
import { Form, Icon, Input, Button, Checkbox, Modal, Row, Col } from 'antd';

class Account extends React.Component {
  render() {
    const { visible, onCancel,onOk,list,AccountId } = this.props;
    let selectdata = []
    //循环授权出ID
    for(let x = 0 ;x< list.length;x++){
      if(list[x].checked){
        selectdata.push(list[x].roleId)
      }
    }
    let itm = [];
    function onChange(checkedValues) {
      itm = checkedValues
      console.log(checkedValues)
    }
    function handleSubmit (){
      const data = {
        perId:AccountId,
        roleId: itm,
      }
      onOk(data)
    }
    const AccounChildren = []
    for(let i =0;i<list.length;i++){
      AccounChildren.push(<Col span={8}><Checkbox value={list[i].roleId}>{list[i].roleName}</Checkbox></Col>)
    }
    return (
      <div>
        <Modal title="设置权限"
          visible={visible}
          onOk={handleSubmit}
          onCancel={onCancel}
        >
          <Checkbox.Group onChange={onChange} defaultValue={selectdata}>
            <Row>{AccounChildren}</Row>
          </Checkbox.Group>
        </Modal>
      </div>
    );
  }
}
export default Account