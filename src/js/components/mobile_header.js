import React from 'react';
import {Link} from 'react-router';
import {Row,Col} from 'antd';//布局
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    CheckBox,
    Modal
} from 'antd';//导航
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MobileHeader extends React.Component{
    constructor(){
        super();
        this.state = {
            current:'top',
            modalVisible:false,
            action:'login',
            hasLogined:false,
            userNickName:'',
            userid:0
        }
    };
    //组件加载之前,判断是否已经登录，修改状态
    componentWillMount(){
        if(!!localStorage.userid){
            this.setState({
                hasLogined:true
            });
        }
    };
    setModalVisible(value){
        this.setState({
            modalVisible:value
        });
    };
    handleClick(e){
        //获取点击的menu的key值
        if(e.key == 'register'){
            this.setState({
                current:'register'
            });
            this.setModalVisible(true);
        }else{
            this.setState({
                current:e.key
            });
        }
    };
    handleSubmit(e){
        //向API提交数据
        e.preventDefault();
        var myFetchOptions = {
            method:'GET',
            mode:'cors'
        };
        var formData = this.props.form.getFieldsValue();

        console.log(formData);

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.userName+"&password="+formData.password+"&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions).
        then(response=>response.json()).then(json=>{
            this.setState({
                userNickName:json.NickUserName,
                userid:json.UserId
            });
            localStorage.userid = json.UserId;
            localStorage.userNickName = json.NickUserName;
        });
        if(this.state.action == 'login'){
            this.setState({
                hasLogined:true
            });
        }
        message.success('请求成功!');
        this.setModalVisible(false);
    };
    login(){
        this.setModalVisible(true);
    };
    callback(key){
        if(key ==1){
            this.setState({
                action:'login'
            });
        }else if(key == 2){
            this.setState({
                action:'register'
            });
        }
    };
    logout(){
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({
            hasLogined:false
        });
    };
    render(){
        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
        ?
        <Link to={`/usercenter`}>
            <Icon type="inbox" onClick={this.logout.bind(this)}/>
        </Link>
        :
        <Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileheader">
                <header>
                    <img src="./src/images/logo.png" alt='logo'/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="登录" key="1">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账户" {...getFieldProps('userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('password')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input placeholder="请输入您的账户" {...getFieldProps('r_userName')}/>
                                </FormItem>
                                <FormItem label="密码">
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps('r_password')}/>
                                </FormItem>
                                <FormItem label="确认密码">
                                    <Input type="password" placeholder="请再次输入您的密码" {...getFieldProps('r_confirmPassword')}/>
                                </FormItem>
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}
export default MobileHeader = Form.create({})(MobileHeader);
