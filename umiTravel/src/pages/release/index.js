import React, { Component } from 'react'
import Editor from '@/components/Common/Editor'
import styles from './index.less'
import { Form, Select, Button, Upload, Icon, Row, Col, DatePicker, Input } from 'antd';
import { connect } from 'dva'
import router from 'umi/router'

const { Option } = Select;
const tags = ['户外', '旅行', '攀岩', '徒步', '钓鱼', '骑行', '滑雪', '登山', '越野', '自驾游', '其他'];
const provinces = ['北京', '安徽', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '湖北', '湖南', '黑龙江', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '天津', '新疆', '云南', '浙江'];
const childOne = tags.map((item, index) => <Option key={item}>{item}</Option>)
const childTwo = provinces.map((item, index) => <Option key={item}>{item}</Option>)

const mapStateToProps = (state, ownProps) => {
  return {
    showUpload: state.post.showUpload,
  }
}

const mapDispatchToProps = {
  // push: routerRedux.push,
  postCreate: query => ({
    type: 'post/postCreate',
    payload: query || {},
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class Release extends Component {
  state = {
    typeSign: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    const { postCreate } = this.props
    const { typeSign: type } = this.state;
    let sessionSign = sessionStorage.getItem('account')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      if (values.cover !== undefined) {
        values.cover = values.cover[0]
      }
      let timestamp = Date.parse(new Date());
      values.create = timestamp
      if (values.start !== undefined && values.end !== undefined) {
        let start = Date.parse(values.start);
        let end = Date.parse(values.end);
        values.start = start
        values.end = end
      }
      values.tags = values.tags.join(',')
      values.account = sessionSign
      let examine, audit;
      if (values.content.includes('操')) {
        examine = 0
        audit = 1
      } else {
        examine = 1
      }
      values.examine = examine
      values.audit = audit
      if (!sessionSign) {
        alert('发布失败，请登录！')
      } else if (values.title == '' || values.tags == '' || values.type == '' || values.content == '') {
        alert('发布失败，内容不允许为空，请输入！')
      } else {
        new Promise((resolve) => {
          if (values.cover) {
            const data = { ...values, mark: 0 }
            const params = { resolve, data }
            postCreate(params)
          } else {
            const data = { ...values, mark: 1 }
            const params = { resolve, data }
            postCreate(params)
          }
        }).then((res) => {
          alert(res.msg)
          if (res.code == 1000) {
            if (type == '0') {
              router.push('/post')
            } else if (type == '1') {
              router.push('/article')
            } else if (type == '2') {
              router.push('/partner')
            } else {
              router.push('/faqs')
            }
          }
        })
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  handleTypeChange = (e) => {
    this.setState({
      typeSign: e
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { typeSign } = this.state
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <div className={styles.release}>
          <div >
            <Form.Item label="类型" hasFeedback>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请选择类型!' }],
              })(
                <Select onChange={this.handleTypeChange}>
                  <Option value="0">分享帖</Option>
                  <Option value="1">游记</Option>
                  <Option value="2">约伴</Option>
                  <Option value="3">问答</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="标签">
              {getFieldDecorator('tags', {
                rules: [
                  { required: true, message: '请选择或填写标签!', type: 'array' },
                ],
              })(
                <Select mode="tags" placeholder="所属/归类" >
                  {childOne}
                </Select>
              )}
            </Form.Item>
            {
              typeSign === '2' ? (<Form.Item label="省份">
                {getFieldDecorator('area', {
                  rules: [
                    { required: true, message: '请选择省份!' },
                  ],
                })(
                  <Select placeholder="区域" >
                    {childTwo}
                  </Select>
                )}
              </Form.Item>)
                : ''
            }

          </div>

          <div>
            {
              typeSign === '2' ? (<Form.Item label="日期范围" style={{ marginBottom: 0 }}>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('start', {
                    rules: [{ required: true, message: '请选择开始日期!' }],
                  })(<DatePicker />)}
                </Form.Item>
                <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                  {getFieldDecorator('end', {
                    rules: [{ required: true, message: '请选择结束日期!' }],
                  })(<DatePicker />)}
                </Form.Item>
              </Form.Item>)
                : ''
            }
            {
              typeSign === '2' ? (<Form.Item label="手机号">
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请填写手机号!' }],
                })(<Input />)}
              </Form.Item>)
                : ''
            }


            <Form.Item label="标题">
              {getFieldDecorator('title', {
                rules: [{ required: true, message: '请输入标题!' }],
              })(<Input />)}
            </Form.Item>

            <Form.Item className={styles.rlEditor}>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容!' }],
              })(<Editor {...this.props} />)}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button className={styles.rlSubmit} type="primary" htmlType="submit">发布</Button>
            </Form.Item>
          </div>
          {
            typeSign == 0 || typeSign == 3 ? "" : (<div>
              <Form.Item label="封面">
                {getFieldDecorator('cover', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="cover" action="/upload.do" listType="picture">
                    <Button style={{ width: 150 }}>
                      <Icon type="upload" />
                      点击上传
                </Button>
                  </Upload>,
                )}
              </Form.Item>
            </div>)
          }
        </div>
      </Form>
    );
  }
}

export default Form.create({ name: 'validate_other' })(Release);
