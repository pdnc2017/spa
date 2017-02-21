import React from 'react';
import { findDOMNode } from 'react-dom';
import {requestp,qry3,notifys,arranges} from '../lib/client';
import Litem from './Litem';

export default class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
	  requestp()
      .then(user => {
		  const addi=user.pop();
		  console.log(addi);
		  this.setState({user,addi});
		  })
      .catch(err => console.error(err));
  }
    todocheck(ind, e) {
    this.state.user[ind].isdone = e;
	this.setState({user:this.state.user});
  }
  usrset(){
	  this.setState({user: this.state.user.map((item) => {
                    item.value='';
					item.isdone=false;
                    return item;
                })
			});
  }
  q3() {
    qry3().then(dsp => {
		this.setState({user: this.state.user.map((item,i) => {
                    item.name=dsp[i].name
					item.value=dsp[i].latest;
					item.isdone=false;
                    return item;
                })
			});
	})
      .catch(err => console.error(err));
  }
  notif(id){
	 var trans=[];
	 var tmp=this.state.user
	 for(var i=0;i<tmp.length;i++){
		 if(!tmp[i].value)continue;
		 trans.push({'name':tmp[i].name,'value':tmp[i].value});
	 }
	 if(id==0)notifys(trans).then(this.usrset()).catch(err => console.error(err));
	 else arranges(trans).then(d=>{this.setState({addi:d});this.usrset()}).catch(err => console.error(err));
  }
  subm(e){
	const inputNode = findDOMNode(this.refs.input);
    const text = inputNode.value.trim();
    this.setState({user: this.state.user.map((item) => {
                    if(item.isdone) item.value=text;
					item.isdone=false;
                    return item;
                })
			});
    inputNode.value = '';
  }
  render() {
    return (
      <div>
	  <nav className="navbar navbar-default navbar-fixed-bottom" >
	  <ul className="nav navbar-nav text-right">
	  <li><a href="#" onClick={this.q3.bind(this)}>最新缴费查询</a></li>
	  <li role="presentation" className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">安排<span className="caret"></span></a>
		  {this.state.addi?(<ul className="dropdown-menu dropdown-menu-right">
			<li>
				  <a href="#" onClick={this.notif.bind(this,1)}>{this.state.addi.name}</a>
              </li>
	  </ul>):null}
	  </li>
	  <li><a href="#" onClick={this.notif.bind(this,0)}>通知</a></li>
	  <li><input type='text' ref='input'/></li>
	  <li><a href="#" className="btn btn-default" onClick={e=>this.subm(e)}>发出</a></li></ul>
	  </nav>
	  {this.state.user?(
        <dl className="dl-horizontal ">
	  {this.state.user.map((item, i) => {
            return <Litem key={i} {...item} index={i} todocheck={this.todocheck.bind(this)}/>
          })}
	  </dl>
	   ):null}
     </div>
    )
  }
}
