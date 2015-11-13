/**
 * Created by volkovpv on 12.11.2015.
 */

window.React = require('react');
window.ReactDOM = require('react-dom');

var Calendar = require('./Calendar');

var consoleLog = function(date){
    console.log(date);
};

ReactDOM.render(
    <Calendar onSelect={consoleLog}/>,
    document.getElementById('mainBody')
);