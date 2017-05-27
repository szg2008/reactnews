import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import {Router,Route,hashHistory} from 'react-router';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import PCUserCenter from './components/pc_usercenter';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import MobileUserCenter from './components/mobile_usercenter';
import MediaQuery from 'react-responsive';
export default class Root extends React.Component{
    //这里替换了之前的Index，变成了程序的入口
    render(){
        return (
            <div>
                <MediaQuery query='(min-device-width:1224px)'>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                        <Route path="/usercenter" component={PCUserCenter}></Route>
                    </Router>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                <Router history={hashHistory}>
                    <Route path="/" component={MobileIndex}></Route>
                    <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                    <Route path="/usercenter" component={MobileUserCenter}></Route>
                </Router>
                </MediaQuery>
            </div>
        );
    };
}

ReactDOM.render(<Root />,document.getElementById('mainContainer'));
