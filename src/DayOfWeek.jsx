/**
 * Created by volkovpv on 11.2015.
 */

var DayOfWeek = React.createClass({
    render : function() {
        return <th className="DayOfWeek">{this.props.date.format('dd')}</th>
    }
});

module.exports = DayOfWeek;