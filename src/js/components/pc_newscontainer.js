import React from 'react';
import {Row,Col} from 'antd';//布局
import {Tabs,Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
const TabPane = Tabs.TabPane;
export default class PCNewsContainer extends React.Component{
    render(){
        const setttings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        };
        return (
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} class="container">
                        <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...setttings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                    <div><img src="./src/images/carousel_5.jpg"/></div>
                                    <div><img src="./src/images/carousel_6.jpg"/></div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="100px" />
                        </div>
                        <Tabs class='tabs_news'>
                            <TabPane tab="新闻" key="1">
                                <PCNewsBlock count={15} type="top" width="100%" bordered="false" minHeight="700px" />
                            </TabPane>
                            <TabPane tab="国际" key="2">
                                <PCNewsBlock count={5} type="guoji" width="100%" bordered="false" minHeight="700px" />
                            </TabPane>
                            <TabPane tab="娱乐" key="3">
                                <PCNewsBlock count={5} type="yule" width="100%" bordered="false" minHeight="700px" />
                            </TabPane>
                            <TabPane tab="体育" key="4">
                                <PCNewsBlock count={5} type="tiyu" width="100%" bordered="false" minHeight="700px" />
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={9} type="yule" width="100%" cardTitle="娱乐头条" imageWidth="130px" />
                            <PCNewsImageBlock count={18} type="keji" width="100%" cardTitle="科技头条" imageWidth="130px" />
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}
