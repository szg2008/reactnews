import React from 'react';
import {Link} from 'react-router';
import {Row,Col} from 'antd';//布局
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal,
    Card,
    notification
} from 'antd';//导航
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router,Route,hashHistory} from 'react-router';
export default class MobileUserCenter extends React.Component{
    render(){
        return (
            <div>
                <MobileHeader />
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">

                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">

                            </TabPane>
                            <TabPane tab="头像设置" key="3">

                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>

                <MobileFooter />
            </div>
        );
    }
}
