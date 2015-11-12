/**
 * Created by volkovpv on 08.2015.
 */

window.React = require('react');

var _month = true;

var Day = require('./Day'),
    DayOfWeek = require('./DayOfWeek'),
    Week = require('./Week'),
    moment = require('moment');

moment.locale('ru', {
    months : "Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь".split("_"),
    monthsShort : "Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек".split("_"),
    weekdays : "Воскресенье_Понедельник_Вторник_Среда_Четверг_Пятница_Суббота".split("_"),
    weekdaysShort : "Вск_Пнд_Втр_Срд_Чтв_Птн_Сбт".split("_"),
    weekdaysMin : "Вс_Пн_Вт_Ср_Чт_Пт_Сб".split("_"),
    longDateFormat : {
        L : "DD.MM.YYYY"
    }
});

var Calendar = React.createClass({
    propTypes: {
        onSelect: React.PropTypes.func.isRequired,
        date: React.PropTypes.object,
        month: React.PropTypes.object
    },

    getDefaultProps : function() {
        return {
            month: moment()
        }
    },

    getInitialState : function() {
        var date = this.props.date;
        var month;
        if (date) {
            month = this.props.date;
        } else {
            month = this.props.month;
        }
        return {
            date: date,
            month: month
        }
    },

    handleClick : function(event) {
        var date = event.target.getAttribute('data-date');
        this.props.onSelect(date);
        this.setState({
            date: moment(date)
        });
    },

    previous : function() {
        this.setState({
            month: moment(this.state.month).subtract(1, 'month')
        });
    },

    next : function() {
        this.setState({
            month: moment(this.state.month).add(1, 'month')
        });
    },

    render : function() {
        var classes = ['addCalendar', this.props.className].join(' ');

        var actionStyle = {
            cursor: 'pointer'
        };

        var today = moment();

        var date = this.state.date;
        var month = this.state.month;

        var startOfWeekIndex = 1;

        var current = month.clone().startOf('month').day(startOfWeekIndex);
        var end = month.clone().endOf('month').day(7);

        var elements = [];
        var days = [];
        var week = 1;
        var i = 1;
        var daysOfWeek = [];
        var day = current.clone();
        for (var j = 0; j < 7; j++) {
            var dayOfWeekKey = 'dayOfWeek' + (j);
            daysOfWeek.push(<DayOfWeek key={dayOfWeekKey} date={day.clone()} />);
        day.add(1, 'days');
    }
    while (current.isBefore(end)) {
    var isCurrentMonth = current.isSame(month, 'month');
    days.push(
    <Day key={i++}
    date={current.clone()}
    selected={date}
    month={month}
    today={today}
    isCurrentMonth={isCurrentMonth}
    handleClick={this.handleClick} />
    );
    current.add(1, 'days');
    if (current.day() === 1) {
        var weekKey = 'week' + week++;
        elements.push(<Week key={weekKey}>{days}</Week>);
        days = [];
    }
    }
    return (
        <div className="calendar">
        <table className={classes}>
        <thead>
        <tr className="month-header">
        <th className="previous" onClick={this.previous} style={actionStyle}>«</th>
    <th colSpan="5">
        <span className="month">{month.format('MMMM')}</span> <span className="year">{month.format('YYYY')}</span>
    </th>
    <th className="next" onClick={this.next} style={actionStyle}>»</th>
    </tr>
    </thead>
    <thead>
    <tr className="days-header">{daysOfWeek}</tr>
        </thead>
        <tbody>
        {elements}
        </tbody>
        </table>
        </div>
    );
    }
});

module.exports = Calendar;