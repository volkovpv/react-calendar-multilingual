/**
 * Created by volkovpv on 11.2015.
 */

//var Calendar = require('../../../flux/actions/CalendarActions');
var ActionsCalendar = require('../../../flux/actions/ActionsCalendar');

var FonCalendar = React.createClass({
    _closeCalendar: function(){
        ActionsCalendar.showCalendar(false);
    },

    render: function(){
        return(
            <div className="fonCalendar" onClick={this._closeCalendar}></div>
        )
    }
});

module.exports = FonCalendar;