/*
* @Author: chengbs
* @Date:   2018-04-09 13:27:30
* @Last Modified by:   chengbs
* @Last Modified time: 2018-04-10 14:50:59
*/
import React, { Component } from 'react'
import { List, InputItem, Button, WhiteSpace, WingBlank, Flex, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import Timer from './timer'
import './style.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      value: '',
      codeDisabled: false,
      codeText: '获取验证码'
    }
  }
  onSubmit = () => { // 表单提交
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue())
      }
    })
  }
  handleOver() {
    this.setState({
      codeDisabled: false,
      codeText: '重新发送'
    })
  }
  getCode() {
    const phoneErr = this.props.form.getFieldError('phone')
    const phone = this.props.form.getFieldValue('phone')
    console.log(phone)
    console.log(phoneErr)
    if (phone === undefined || phone === '') {
      Toast.fail('请输入手机号码', 1)
    } else if (phoneErr !== undefined) {
      Toast.fail('请输入正确格式手机号码', 1)
    }
    if (phoneErr === undefined && phone !== undefined) {
      this.setState({
        codeDisabled: true
      })
      console.log(phone)
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <form>
        <List
          style={{ marginTop: '40px' }}
          renderFooter={() => getFieldError('phone') || getFieldError('code')}
        >
          <InputItem
            {...getFieldProps('phone', {
              rules: [
                { required: true, message: '请输入您的手机号码' },
                { pattern: /^(1[358479]\d{9})$/, message: '请输入正确格式的手机号码' }
              ],
            })}
            clear
            type='number'
            placeholder='请输入您的手机号码'
            error={!!getFieldError('phone')}
            onErrorClick={() => {
              Toast.fail(getFieldError('phone'), 1)
            }}
          >手机号码</InputItem>
          <Flex align='baseline'>
            <InputItem
              {...getFieldProps('code', {
                rules: [
                  { required: true, message: '请输入验证码' },
                ],
              })}
              clear
              placeholder='验证码'
              error={!!getFieldError('code')}
              onErrorClick={() => {
                Toast.fail(getFieldError('code'), 1)
              }}
            >
              验证码
            </InputItem>
            <Button className='codebtn' disabled={this.state.codeDisabled} type='ghost' size='small' onClick={this.getCode.bind(this)}>
              {
                this.state.codeDisabled ? <Timer onOver={this.handleOver.bind(this)} /> : this.state.codeText
              }
            </Button>
          </Flex>
        </List>
        <WingBlank>
          <Button type='primary' style={{ marginTop: '30px', height: '42px', lineHeight: '42px' }} onClick={this.onSubmit}>新用户注册</Button><WhiteSpace />
        </WingBlank>
      </form>
    )
  }
}

const RegisterWrapper = createForm()(Register)
export default RegisterWrapper