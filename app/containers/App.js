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
        };
    }

    componentDidMount() {
    }

    // cookie() {
    //     this.setState({
    //         call: 'done'
    //     });
    //     chrome.extension.getBackgroundPage().console.log(chrome.cookies.get);
    //     chrome.cookies.get({
    //         url: 'https://mail.google.com',
    //         name: 'GMAIL_AT'
    //     }, (cookie) => {
    //         console.log(cookie)
    //         // this.setState({
    //         //     gmailCookie: cookie.value
    //         // });
    //         // this.doCall();
    //     });
    // }

    call() {
        chrome.extension.getBackgroundPage().console.log('call');
        chrome.extension.getBackgroundPage().fetch('https://mail.google.com/mail/u/0/x/nimportequoi', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            credentials: 'include',
            body: 'ie=UTF-8&s=q&q=truc&nvp_site_mail=Search&at=' + this.state.gmailCookie
            // JSON.stringify({
            //     ie: 'UTF-8',
            //     s: 'q',
            //     q: 'test',
            //     nvp_site_mail: 'Search',
            //     at: 'AF6bupMUDZDjyGUfwC8e4c3PzlF0vFLRWA'
            // })
        }).then(response => {
            return response.text();
        }).then(html => {
            this.$element.innerHTML = html;
            let val = document.forms.f.elements['at'].value;
            this.$element.innerHTML = null;
            chrome.extension.getBackgroundPage().console.log(val);
            this.call2(val);
        });
    }

    call2(val) {
        chrome.extension.getBackgroundPage().fetch('https://mail.google.com/mail/u/0/x/nimportequoi/?s=q&q=test&nvp_site_mail=Search',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                credentials: 'include',
                body: 'ie=UTF-8&s=q&q=truc&nvp_site_mail=Search&at=' + val
                // JSON.stringify({
                //     ie: 'UTF-8',
                //     s: 'q',
                //     q: 'test',
                //     nvp_site_mail: 'Search',
                //     at: 'AF6bupMUDZDjyGUfwC8e4c3PzlF0vFLRWA'
                // })
            }).then(response => {
            return response.text();
        }).then(html => {
            this.$results.innerHTML = html;
        });
        // fetch('https://twitter.com/search?q=test&src=typd',
        //     {
        //         method: 'GET',
        //         credentials: 'include',
        //         mode: 'no-cors'
        //     })
        //     .then(response => {
        //         this.setState({
        //             call: 'fetch ok'
        //         });
        //         let r = response.text();
        //         chrome.extension.getBackgroundPage().console.log(r);
        //     });
        // .then(fetchedData => {
        //     store.dispatch(updateHistogramData(date, fetchedData));
        // });
    }

    render() {
        const {todos, actions} = this.props;

        return (
            <div className={style.normal}>
                <div style={{display: 'none'}} ref={c => this.$element = c}/>
                <div ref={c => this.$results = c}/>
                <button onClick={this.call.bind(this)}>call</button>
                <br />
                {this.state.call}
                <Header addTodo={actions.addTodo}/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        );
    }
}
