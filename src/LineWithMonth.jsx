/**
 * Created by volkovpv on 11.2015.
 */

var LineWithMonth = React.createClass({
    render: function(){
        return(
            <tr className="Week">{this.props.children}</tr>
        );
    }
});

module.exports = LineWithMonth;