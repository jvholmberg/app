'use strict';

import React from 'react';

export default class SessionForm extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {
    
  }

  componentWillUnmount() {
    pubsub.unsubscribe(this.pubsub_token);
  }

  render() {

    return (
      <h1>Hello World</h1>
    );
  }
}
