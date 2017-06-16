import React from 'react';
import {Link} from 'react-router';
import {Row,Col} from 'antd';//布局
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
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
    notification,
    Upload
} from 'antd';//导航
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import {Router,Route,hashHistory} from 'react-router';
export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state = {
            previewImage:'',
            previewVisible:false,
            usercollection:''
        };
    };
    componentDidMount(){
        var myFetchOptions = {
            method:'GET',
            mode:'cors'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid='+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                usercollection:json
            });
        });
    };
    render(){
        const props = {
            action:'http://newsapi.gugujiankong.com/handler.ashx',
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:'picture-card',
            defaultFileList:[
                {
                    uid:-1,
                    name:'1.png',
                    state:'done',
                    url:'http://sns-img.b0.upaiyun.com/dunzd/1704/1311/31/149373396976341492054297.jpg',
                    thumbUrl:'http://sns-img.b0.upaiyun.com/dunzd/1704/1311/31/149373396976341492054297.jpg'
                },
                {
                    uid:-2,
                    name:'2.png',
                    state:'done',
                    url:'http://sns-img.b0.upaiyun.com/dunzd/1704/1311/30/150166133313521492054249.jpg',
                    thumbUrl:'http://sns-img.b0.upaiyun.com/dunzd/1704/1311/30/150166133313521492054249.jpg'
                }

            ],
            onPreview:(file)=>{
                this.setState({
                    previewImage:file.url,
                    previewVisible:true
                });
            }
        };
        const {usercollection} = this.state;
        const usercollectionList = usercollection.length
        ?
        usercollection.map((uc,index)=>{
            <Card key={index} title={uc.uniquekey} extra={<a target="blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
                <p>{uc.Title}</p>
            </Card>
        })
        :
        '您还没有收藏任何新闻，快去收藏吧~~'; 
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div class="comment">
                                    <Row>
                                        <Col span={24}>
                                            {usercollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">

                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div class="clearfix">
                                    <Upload {...props}>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">上传照片</div>
                                    </Upload>
                                    <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="预览" src={this.state.previewImage}/>
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}></Col>
                </Row>

                <PCFooter />
            </div>
        );
    }
}
