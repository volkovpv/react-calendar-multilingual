/**
 * Created by volkovpv on 11.2015.
 */

var Day = React.createClass({

    propTypes: {
        handleClick: React.PropTypes.func.isRequired,
        date: React.PropTypes.object.isRequired,
        //month: React.PropTypes.object.isRequired,
        today: React.PropTypes.object.isRequired,
        selected: React.PropTypes.object
    },

    render : function() {
        var classes = ['Day'];
        if (this.props.today.isSame(this.props.date, 'day')) {
            classes.push('today');
        }
        if (this.props.selected && this.props.selected.isSame(this.props.date, 'day')) {
            classes.push('selected');
        }
        var style = {
            cursor: 'pointer'
        };
        if (!this.props.isCurrentMonth) {
            classes.push('other-month');
        }
        return (
            <td className   ={classes.join(' ')}
                style       ={style}
                data-date   ={this.props.date.toISOString()}
                data-day    ={this.props.date.format('D')}
                onClick     ={this.props.handleClick}>

                {this.props.date.format('D')}
            </td>
        );
    }
});


module.exports = Day;