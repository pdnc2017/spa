import React from 'react';
import TopicList from './component/TopicList';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children ? this.props.children : <TopicList />}
      </div>
    )
  }
}
