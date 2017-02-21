import React from 'react';
import { findDOMNode } from 'react-dom';
import {reghandler,regq} from '../lib/client';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {flag:0};
  }
  subm(e){
	const input1 = findDOMNode(this.refs.input1);
    const text1 = input1.value.trim();
	if(!this.state.flag)regq({'name':text1}).then(usr=>{
		this.setState({usr,flag:1});
	})
	else reghandler({'name':text1}).then(d=>{
		console.log('front reg end');
	location='/';
	}).catch(err => console.error(err));
  }
  rese(){
	  this.setState({flag:0});
  }
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-bottom" >
        <div className="container panel panel-primary">
		<form className="form-horizontal"><span className="label label-info">需与系统用户名绑定</span>
          <div className="form-group" style={{marginTop:'25px'}}><label className="col-sm-2 control-label">名字</label><div className="col-sm-10"><input type='text' ref='input1'/></div></div>
			  {this.state.flag?(<p className="bg-warning">请确认书记是否为 {this.state.usr.grader} 再点击确定完成绑定 <a href="#" onClick={this.rese.bind(this)}>点此撤销</a></p>):null}
		  <div className="form-group" style={{marginTop:'25px'}}>
    <div className="col-sm-offset-2 col-sm-10">
      <a className="btn btn-primary" href="#" onClick={e=>this.subm(e)}>确定</a>
    </div>
  </div>
		  </form>
        </div>
      </nav>
    )
  }
}
