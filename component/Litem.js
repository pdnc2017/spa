import React from 'react';

export default class Litem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
    handleChange() {
        let isDone = !this.props.isdone;
        this.props.todocheck(this.props.index, isDone);
  }

  render() {
	  let tline = this.props.isdone ? {textDecoration: 'line-through'} : {textDecoration: 'none'};
    return (
			<div >
				  <dt><a href="#" className="list-group-item" onClick={this.handleChange.bind(this)}>
				  <span>
				  {this.props.isdone?<span className="badge">·</span>:null}
				  </span>{this.props.name}</a></dt> 
				  <dd className="list-group-item" style={tline}>{this.props.value}</dd>
              </div>
    )
  }
}
