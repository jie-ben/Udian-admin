
import { Modal, Button } from 'antd';

class download extends React.Component {
  state = {
    ModalText: '下载条件暂未开通， 敬请期待',
    titleText: '点击确按分页下载。',
    visible: false,
  }
  render() {
    const { confirmLoading, ModalText, titleText } = this.state;
     const { visible, handleCancel,onOk } = this.props;
    return (
      <div>
        <Modal title="下载二维码"
          visible={visible}
          onOk={onOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{ModalText}</p>
          <p>{titleText}</p>
        </Modal>
      </div>
    );
  }
}

export default download