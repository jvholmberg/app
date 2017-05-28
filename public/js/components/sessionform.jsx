'use strict';

import React from 'react';
import DatePicker from './datepicker.jsx';

export default class SessionForm extends React.Component {

  constructor() {
    super();
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div>
        <DatePicker />
      </div>
    );
  }
}
