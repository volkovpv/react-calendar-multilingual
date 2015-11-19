/**
 * Created by volkovpv on 11.2015.
 */

var Month = React.createClass({
    render: function(){
        var classes = ['Day'];
        if (this.props.today.isSame(this.props.date, 'month')) {
            classes.push('today');
        }
        var style = {
            cursor: 'pointer'
        };
        if (!this.props.isCurrentYear) {
            classes.push('other-month');
        }
        return(
            <td className ={classes.join(' ')}
                style       ={style}
                data-date   ={this.props.date.toISOString()}
                data-day    ={this.props.date.format('MMM')}
                onClick     ={this.props.handleClick}>
                {this.props.date.format('MMM')}
            </td>
        );
    }
});

module.exports = Month;