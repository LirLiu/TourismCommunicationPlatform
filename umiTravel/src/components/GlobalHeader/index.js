import React, { Component } from 'react';
import { Icon, Dropdown, Input, Button, Divider, Avatar } from 'antd';
import styles from './index.less';
import router from 'umi/router';
import Link from 'umi/link'
import { connect } from 'dva'
const { Search } = Input;

const mapStateToProps = (state, ownProps) => {
    return {
        adminInfo: state.admin.adminInfo,
    }
}
const mapDispatchToProps = {
    // push: routerRedux.push,
    getSearchList: query => ({
        type: 'post/getSearchList',
        payload: query || {},
        // loading: true,
    }),
    getSearchPost: query => ({
        type: 'post/getSearchPost',
        payload: query || {},
        // loading: true,
    }),
}
@connect(mapStateToProps, mapDispatchToProps)
class GlobalHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: false,//搜索栏触发标志
            sessionSign: false,
        }
        this.searchRef = React.createRef();
    }

    componentDidMount() {
        setInterval(() => {
            let session = sessionStorage.getItem('account')
            if (session) {
                this.setState({
                    sessionSign: true
                })
            } else {
                this.setState({
                    sessionSign: false
                })
            }
        }, 1000);
    }

    handleSearch = (val) => {
        const { getSearchList, getSearchPost } = this.props;
        const params = { field: val }
        const path = window.location.pathname
        if (path == '/') {
            getSearchList(params)
        } else {
            if (path == '/post') {
                const params = { field: val, type: 0 }
                getSearchPost(params)
            } else if (path == '/article') {
                const params = { field: val, type: 1 }
                getSearchPost(params)
            } else if (path == '/partner') {
                const params = { field: val, type: 2 }
                getSearchPost(params)
            } else if (path == '/faqs') {
                const params = { field: val, type: 3 }
                getSearchPost(params)
            }
        }
    }

    handleSearchBlur = () => {
        this.setState({
            version: false,
        });
    };

    handleSearchShow = () => {
        this.setState({
            version: true,
        }, () => {
            this.searchRef.current.focus();
        });
    };

    handleLoginPush = () => {//登录事件
        router.push('/login');

    }

    handleRegisterPush = () => {//注册事件
        router.push('/register')
    }

    handleSessionOut = () => {
        const path = window.location.pathname
        sessionStorage.clear()
        if (path == '/personal') {
            router.push('/')
        }
        if (path == '/admin/manage') {
            router.push('/admin')
        }
        this.setState({
            variable: false
        })
    }

    handleTypeGo = (index) => {
        if (index == 0) {
            router.push('/')
        } else if (index == 1) {
            router.push('/post')
        } else if (index == 2) {
            router.push('/article')
        } else if (index == 3) {
            router.push('/partner')
        } else if (index == 4) {
            router.push('/faqs')
        } else if (index == 5) {
            router.push('/other')
        }
    }

    render() {
        const path = window.location.pathname
        const { version, sessionSign } = this.state;
        const { adminInfo, userInfo } = this.props
        const links = ['首页', '分享帖', '游记', '约伴', '问答', '其他']

        return (
            <div className={styles.globalHeader}>
                <div className={styles.headerMain}>
                    <div>
                        <span>旅游交流网</span>
                        {
                            path == '/admin' || path == '/admin/manage' ? ''
                                : (<ul>
                                    {
                                        links.map((item, index) => <li key={index} onClick={this.handleTypeGo.bind(null, index)}><a>{item}</a></li>)
                                    }
                                </ul>)
                        }
                    </div>
                    <div>
                        <div>
                            {
                                version === true ? <Search
                                    ref={this.searchRef}
                                    placeholder="请输入"
                                    onSearch={this.handleSearch}
                                    style={{ width: '250px' }}
                                // onBlur={this.handleSearchBlur}
                                /> : <Icon type="filter" onClick={this.handleSearchShow} />
                            }
                            {
                                sessionSign === false ? (<div style={{ display: 'inline-block' }}>
                                    <Button type='link' onClick={this.handleLoginPush}>登录</Button>
                                    <Divider type="vertical" />
                                    <Button type='link' onClick={this.handleRegisterPush}>注册</Button>
                                </div>)
                                    : (path == '/admin' || path == '/admin/manage' ? (<div style={{ display: 'inline-block' }}>
                                        {
                                            adminInfo.a_avatar ? <Avatar style={{ margin: '0 10px' }} shape="square" src={adminInfo.a_avatar} />
                                                : <Avatar style={{ margin: '0 10px' }} shape="square" icon="user" />
                                        }
                                        <Icon type="import" onClick={this.handleSessionOut} />
                                    </div>)
                                        : (<div style={{ display: 'inline-block' }}>
                                            <Link to={`/personal`}><Avatar style={{ margin: '0 10px' }} shape="square" icon="user" /></Link>
                                            <Icon type="import" onClick={this.handleSessionOut} />
                                        </div>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default GlobalHeader