/**
 * Created by volkovpv on 08.2015.
 */
var _month = true;

var moment      = require('moment'),
    Day         = require('./Day'),
    DayOfWeek   = require('./DayOfWeek'),
    Week        = require('./Week'),
    Month       = require('./Month');

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
        onSelect: React.PropTypes.func.isRequired
    },

    getInitialState : function() {
        return {
            date: null,
            month: moment()
        }
    },

    _handleClick : function(event) {
        var date = event.target.getAttribute('data-date');

        this.props.onSelect(date);
        this.setState({
            date: moment(date)
        });
    },

    _previous : function() {
        var period = _month?'years':'month';
        this.setState({
            month: moment(this.state.month).subtract(1, period)
        });
    },

    _next : function() {
        var period = _month?'years':'month';
        this.setState({
            month: moment(this.state.month).add(1, period)
        });
    },

    render : function() {
        var classes             = ['addCalendar', this.props.className].join(' '),
            today               = moment(),
            date                = this.state.date,
            month               = this.state.month,
            startOfWeekIndex    = 1,
            currentDay          = month.clone().startOf('month').day(startOfWeekIndex),
            endDay              = month.clone().endOf('month').day(7),
            elements            = [],
            days                = [],
            week                = 1,
            daysOfWeek          = [],
            day                 = currentDay.clone(),
            actionStyle         = {},
            dayOfWeekKey        = null,
            isCurrentMonth      = null,
            isCurrentYear       = null,
            weekKey             = null,
            i                   = 1,
            k                   = 1;


        var currentMonth        = month.clone().startOf('year').month(0),
            endMonth            = month.clone().endOf('year').month(11),
            months              = [];

        actionStyle = {
            cursor: 'pointer'
        };

        for (var j = 0; j < 7; j++) {
            dayOfWeekKey = 'dayOfWeek' + (j);
            daysOfWeek.push(<DayOfWeek key={dayOfWeekKey} date={day.clone()} />);
            day.add(1, 'days');
        }


        while(currentMonth.isBefore(endMonth)){
            console.log(currentMonth.isBefore(endMonth));
            currentMonth.add(1, 'month');
            isCurrentYear = currentMonth.isSame(month, 'year');
            months.push(
                <Month key ={k++}/>
            );
        }






        while (currentDay.isBefore(endDay)) {
            //console.log(currentDay.isBefore(endDay));
            isCurrentMonth = currentDay.isSame(month, 'month');
            days.push(
                <Day key            ={i++}
                     date           ={currentDay.clone()}
                     selected       ={date}
                     month          ={month}
                     today          ={today}
                     isCurrentMonth ={isCurrentMonth}
                     handleClick    ={this._handleClick} />
            );

            currentDay.add(1, 'days');

            if (currentDay.day() === 1) {
                weekKey = 'week' + week++;
                elements.push(<Week key={weekKey}>{days}</Week>);
                days = [];
            }
        }

        return (
            <div className="calendar">
                <table className={classes}>

                    <thead>
                        <tr className="month-header">
                            <th className="previous" onClick={this._previous} style={actionStyle}>«</th>
                            <th colSpan="5">
                                <span className="month">{(_month === false)?month.format('MMMM'):null}</span> <span className="year">{month.format('YYYY')}</span>
                            </th>
                            <th className="next" onClick={this._next} style={actionStyle}>»</th>
                        </tr>
                    </thead>


                    {(_month === false)?<thead><tr className="days-header">{daysOfWeek}</tr></thead>:null}


                    <tbody>
                        {elements}
                    </tbody>

                </table>
            </div>
        );
    }
});

module.exports = Calendar;