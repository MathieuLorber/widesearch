import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({
        actions: bindActionCreators(TodoActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            call: 'not done'
        }
    }

    componentDidMount() {
    }

    call() {
        this.setState({
            call: 'done'
        });
        chrome.extension.getBackgroundPage().console.log('call');
        chrome.extension.getBackgroundPage().
        // fetch('https://mail.google.com/mail/u/0/x/1eowxh50q8uof-/?s=q&q=test&nvp_site_mail=Search',
        //     {
        //         method: 'POST',
        //         credentials: 'include'
        //     })
        //     .then(response => {
        //         this.setState({
        //             call: 'fetch ok'
        //         });
        //         let r = response.html();
        //         chrome.extension.getBackgroundPage().console.log(r);
        //     });
        fetch('https://twitter.com/search?q=test&src=typd',
            {
                method: 'GET',
                credentials: 'include',
                mode: 'no-cors'
            })
            .then(response => {
                this.setState({
                    call: 'fetch ok'
                });
                let r = response.html();
                chrome.extension.getBackgroundPage().console.log(r);
            });
        // .then(fetchedData => {
        //     store.dispatch(updateHistogramData(date, fetchedData));
        // });
    }

    render() {
        const {todos, actions} = this.props;

        return (
            <div className={style.normal}>
                <button onClick={this.call.bind(this)}>call</button>
                <br />
                {this.state.call}
                <Header addTodo={actions.addTodo}/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        );
    }
}
