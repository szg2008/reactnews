import React from 'react';
import {Card} from 'antd';
import {Router,Route,Link} from 'react-router';
export default class PCNewsBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            news:''
        };
    };
    componentWillMount(){
        var myFetchOptions = {
            method:'GET',
            mode:'cors'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then(json=>this.setState({
            news:json
        }));
    };
    render(){
        const {news} = this.state;
        const newsList = news.length
        ?
        news.map((newsItem,index)=>(
            <li key={index}>
                <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                    {newsItem.title}
                </Link>
            </li>
        ))
        :
        '没有加载到任何新闻';
        const styleObj = {
            minHeight:this.props.minHeight
        };
        return (
            <div class="topNewsList" style={styleObj}>
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        );
    }
}
