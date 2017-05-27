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
    Modal,
    Card,
    notification
} from 'antd';//导航
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''
        }
    };
    componentDidMount(){
        var myFetchOptions = {
            method:'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey='+this.props.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                comments:json
            });
        });
    };
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            method:'GET'
        };
        var formdata = this.props.form.getFieldsValue();
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid='+localStorage.userid+'&uniquekey='+this.props.uniquekey+'&commnet='+formdata.remark,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            //设置表单的值
            this.props.form.setFieldsValue({'remark':''});
            this.componentDidMount();
        });
    };
    addUserCollection(){
        var myFetchOptions = {
            method:'GET'
        };
        fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid='+localStorage.userid+'&uniquekey='+this.props.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            //收藏成功之后进行全局的提醒
            notification['success']({
                message: 'ReactNews提醒',
                description: '恭喜你，收藏成功'
            });
        });
    };
    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length
        ?
        comments.map((comment,index)=>(
            <Card key={index} title={comment.UserName} extra={<a href="#">发布于：{comment.datetime}</a>}>
                <p>{comment.Comments}</p>
            </Card>
        ))
        :
        '还没有评论';
        return(
            <div class="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                <Input type="textarea" placeholder="说点儿..." {...getFieldProps('remark',{initialValue:''})}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default CommonComments = Form.create({})(CommonComments);
