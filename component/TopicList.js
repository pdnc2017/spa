import React from 'react';
import {loginUser,qry1,qry2} from '../lib/client';

export default class TopicList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
	  loginUser()
      .then(user => {
		  console.log('logcheck');
		  if(user.count==0)location='/login';
		  else {if(user.grade==0)this.setState({user});
		  else location='/panel';}
		  })
      .catch(err => console.error(err));
  }
	q1() {
    qry1()
      .then(dsp => this.setState({dsp}))
      .catch(err => console.error(err));
  }
  q2() {
    qry2().then(dsp => this.setState({dsp}))
      .catch(err => console.error(err));
  }
  render() {
    const list = this.state.dsp ? this.state.dsp.list : [];
	const usr =this.state.user?this.state.user:{};
    return (
      <div>
	  {this.state.user?(
	  <div>
	  <nav className="navbar navbar-default navbar-fixed-bottom" >
	  <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.q1.bind(this)}>历史状态查询</button>
	  <button type="button" className="btn btn-default btn-lg btn-block" onClick={this.q2.bind(this)}>明细查询</button>
	  </nav>
	  <ul className="list-group">
	  {list.map((item, i) => {
            return (
              <li key={i} className="list-group-item">
				  {item.time} <span style={{float:'right'}}>{item.stat}</span>
              </li>
            )
          })}
	  </ul>
	  </div>
	):(<span>initial</span>)}        
      </div>
    )
  }
}
