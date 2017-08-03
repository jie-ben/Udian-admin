import React, { PropTypes } from 'react'
import { Form, Input, Button, Upload, Icon, Cascader, Modal, Select, InputNumber} from 'antd'
import { routerRedux } from 'dva/router';
import moment from 'moment';
import styles from './Modal.less'
import { Link } from 'dva/router'
import config from '../../utils/config.js'
import Regions from '../../utils'
const FormItem = Form.Item
const Option = Select.Option;
const optionsRegions = Regions.regions.regions.data;
let region = '';



function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
}

//地区选择后的触发事件
function onChangeSelect(value, selectedOptions) {
  region = {label:'',value:[]};
  for(let i = 0; i < selectedOptions.length; i ++){
      
      region.label += selectedOptions[i].label + '/';
      region.value.push(selectedOptions[i].value)

  }
}


const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}

class modal extends React.Component {
    state = {};
    constructor(props) {
        super(props);
    }


    handleChange = (info) => {
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
      }
    }

    cbdHandleChange = (value) => {
      console.log(value);  // { key: "lucy", label: "Lucy (101)" }
    }

  render() {
      const {
        type,
        item = {},
        cbd = [],
        onOk,
        onCancel,
        form: {
          getFieldDecorator,
          validateFields,
          getFieldsValue
        }
      } = this.props
      const cbdChildren = [];
      for (let i = 0; i < cbd.length; i++) {
          cbdChildren.push(<Option key={cbd[i].id}>{cbd[i].name}</Option>);
          
      }

      function handleSubmit(e){      

        e.preventDefault();
        validateFields((errors) => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
            key: item.key,
            province:JSON.stringify(region)
          }
          onOk(data)
        })
      }

      var imageUrl = '';
      if(this.state.imageUrl){
        var imageUrl = this.state.imageUrl;
      }else{
        var imageUrl = config.IMGURL + this.props.item.logo;
      }

       function onChange(value, dateString) {
          console.log('Selected Time: ', value);
          console.log('Formatted Selected Time: ', dateString);
        }

      
      return (
          <Form onSubmit={handleSubmit}>

            <FormItem {...formItemLayout} label="场所管理">
              <span className="ant-form-text">{type === 'create' ? '新建场所' : '修改场所'}</span>
            </FormItem>

            <FormItem label='场所名称:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message: '场所名称未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>

             <FormItem label='所在省市区:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('province', {
                initialValue: (type === 'create' ? '' :JSON.parse(item.province).value),
                rules: [
                  {
                    required: true,
                    message: '所在省市区未填写'
                  }
                ]
              })(<Cascader
                  options={optionsRegions}
                  onChange={onChangeSelect}
                  placeholder= {item.province}
                  showSearch
                />)}
            </FormItem>

            <FormItem label='详细位置:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: item.address,
                rules: [
                  {
                    required: true,
                    message: '详细位置未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label='所属商圈:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('cbd', {
                initialValue: item.cbd + "",
                rules: [
                  {
                    required: true,
                    message: '所属商圈未选择'
                  }
                ]
              })(
                <Select onChange={this.cbdHandleChange}>
                  {cbdChildren}
                </Select>
              )}
            </FormItem>

            <FormItem label='所属行业:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('industry', {
                initialValue: item.industry,
                rules: [
                  {
                    required: true,
                    message: '所属行业未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label='联系人:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('contract', {
                initialValue: item.contract,
                rules: [
                  {
                    required: false,
                    message: '联系人未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label='联系人电话:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('contractTel', {
                initialValue: item.contractTel,
                rules: [
                  {
                    required: false,
                    message: '联系人电话未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem label='联系人手机:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('contractMobile', {
                initialValue: item.contractMobile,
                rules: [
                  {
                    required: false,
                    message: '联系人手机未填写'
                  }
                ]
              })(<Input />)}
            </FormItem>


            <FormItem label='备注:' hasFeedback {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
                rules: [
                  {
                    required: false,
                    message: '备注未填写'
                  }
                ]
              })(<Input type="textarea" rows={4}/>)}
            </FormItem>

            <FormItem {...formItemLayout} label="图片">
              {getFieldDecorator('logo', {
                initialValue: item.logo,
                rules: [
                  {
                    required: true,
                    message: '图片未填加'
                  }
                ]
              })(
                <Upload
                  className={styles.uploader}
                  name="imageFile"
                  showUploadList={false}
                  action= {config.IMGUPURL}
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {
                    imageUrl ?
                      <img src={imageUrl} alt="" className={styles.avatar} /> :
                      <Icon type="plus" className={styles.trigger} />
                  }
                </Upload>
              )}
            </FormItem>
            <FormItem wrapperCol={{ span: 16, offset: 8 }}>
              <Button type="primary" htmlType="submit" style={{margin:8}}>提交</Button>
              <Button htmlType="reset" onClick={onCancel}>取消</Button>
            </FormItem>

          </Form>
      )
    
  }
}

export default Form.create()(modal)
