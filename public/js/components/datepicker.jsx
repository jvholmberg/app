'use strict';

import React from 'react';

export default class DatePicker extends React.Component {

  constructor() {
    super();
    this._loadData.bind(this);
    this._getNameOfDay.bind(this);
    this._getTargetWeekday.bind(this);
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  /*
  * @fn: _loadData()
  * @summary:
  */
  _loadData() {
    let ret = [];

    // Get data for this Month
    let targetMonth = this.props.targetDate.getMonth();
    let daysInThisMonth = this._getDaysInTargetMonth();
    let firstDayOfThisMonth = this._getTargetWeekday(0);
    let lastDayOfThisMonth = this._getTargetWeekday(daysInThisMonth);

    // If first day of month is not Monday then add neccessary data from previous
    if (firstDayOfThisMonth !== 1) {
      this.props.targetDate.setMonth(targetMonth-1);
      let daysInPreviousMonth = this._getDaysInTargetMonth();

      for (let i = 1; i < firstDayOfThisMonth; i++) {
        ret.unshift({
          name: daysInPreviousMonth,
          val: `${this.props.targetDate.getFullYear()}/${targetMonth}/${daysInPreviousMonth}`
        });
        daysInPreviousMonth--;
      }
    }

    // Move targetDate back to this month
    this.props.targetDate.setMonth(targetMonth);

    // Add dates for this month
    for (let i = 1; i <= daysInThisMonth; i++) {
      ret.push({
        name: i,
        val: `${this.props.targetDate.getFullYear()}/${targetMonth+1}/${i}`
      });
    }

    // If last day of next month is not Sunday then add neccessary data from next
    if (lastDayOfThisMonth !== 0) {
      let day = 1;
      for (let i = lastDayOfThisMonth; i < 7; i++) {
        ret.push({
          name: day,
          val: `${this.props.targetDate.getFullYear()}/${targetMonth+2}/${day}`
        });
        day++;
      }
    }
  }
  /*
  * @fn: _getDaysInTargetMonth(), _getTargetWeekday(e)
  * @summary:
  */
  _getDaysInTargetMonth() {
    return new Date(
      this.props.targetDate.getFullYear(),
      this.props.targetDate.getMonth()+1,
      0
    ).getDate();
  }
  _getTargetWeekday(e) {
    if (!e) { e = this.props.targetDate.getDate()}
    return new Date(
      this.props.targetDate.getFullYear(),
      this.props.targetDate.getMonth(),
      e
    ).getDay();
  }
  /*
  * @fn: _getNameOfDay(e), _getNameOfMonth(e)
  * @summary: Zero-indexed, returns name of day/month.
  * @default: Returns name of targeted day/month.
  */
  _getNameOfDay(e) {
    if (!e) { e = this.props.targetDate.getDay(); }
    e = e % 7;
    return [
      { full: 'Sunday', short: 'Sun', min: 'Su'},
      { full: 'Monday', short: 'Mon', min: 'Mo'},
      { full: 'Tuesday', short: 'Tue', min: 'Tu'},
      { full: 'Wednesday', short: 'Wed', min: 'We'},
      { full: 'Thursday', short: 'Thu', min: 'Th'},
      { full: 'Friday', short: 'Fri', min: 'Fr'},
      { full: 'Saturday', short: 'Sat', min: 'Sa'}
    ][e];
  }
  _getNameOfMonth(e) {
    if (!e) { e = this.props.targetDate.getMonth(); }
    e = e % 12;
    return [
      { full: 'January', short: 'Jan'},
      { full: 'February', short: 'Feb'},
      { full: 'March', short: 'Mar'},
      { full: 'April', short: 'Apr'},
      { full: 'May', short: 'May'},
      { full: 'June', short: 'Jun'},
      { full: 'July', short: 'Jul'},
      { full: 'August', short: 'Aug'},
      { full: 'September', short: 'Sep'},
      { full: 'October', short: 'Oct'},
      { full: 'November', short: 'Nov'},
      { full: 'December', short: 'Dec'}
    ][e];
  }
  /*
  * @fn: _getAllWeekdayNames(e)
  * @summary: Get names of all weekdays in different formats (full, short, min)
  */
  _getAllWeekdayNames(e) {
    switch (e) {
      case 'short':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        break;
      case 'min':
        return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      default:
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }
  }
  /*
  * @fn: _setTargetDate(e)
  * @summary: Sets targeted day, month & year
  */
  _setTargetDate() {
    console.error('_setTargetDate() Not Implemented');
  }
  _getFormattedDate(y, m, d) {
    return `${y}/${m < 10 ? `0${m}` : m}/${d < 10 ? `0${d}` : d}`
  }

  render() {
    this._loadData();
    return (
      <div>
        <label>
          label
          <input type='date' />
        </label>
      </div>
    );
  }
}

DatePicker.defaultProps = {
  currentDate: new Date(),
  targetDate: new Date()
};
