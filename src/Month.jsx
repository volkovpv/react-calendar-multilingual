/**
 * Created by volkovpv on 11.2015.
 */

var Month = React.createClass({
    render: function(){
        return(
            <td className ={"Day"}>
                {this.props.date.format('MMM')}
            </td>
        );
    }
});

module.exports = Month;