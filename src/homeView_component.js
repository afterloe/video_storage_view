"use strict";

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="homeView">
                <div className="wrap0">
                    <div className="banner">
                        <ul id="outer0" className="outer_0">
                            <li className="outer0 ani">
                                <p className="container">
                                    <span>
                                        <img src="images/agent.png" alt=""/>
                                        <img src="images/The aperture.png" alt=""/>
                                        <img src="images/Light spot.png" alt=""/>
                                        <img src="images/personalise.png" alt=""/>
                                    </span>
                                    <span>基于人工智能技术的边缘计算终端</span>
                                    <span>
                                        <img src="images/line.png" alt=""/>
                                    </span>
                                </p>
                            </li>
                            <li className="outer0">
                                <p className="container">
                                    <span>
                                        <img src="images/5.png" alt=""/>
                                    </span>
                                    <span>数 字 化 时 代</span>
                                    <span>你需要的更多也更少</span>
                                    <span>更多协作 / 更多个性 / 更多智能 / 更少操作</span>
                                    <span></span>
                                    <span>
                                        <img src="images/left.png" alt=""/>
                                    </span>
                                    <span>
                                        <img src="images/right.png" alt=""/>
                                    </span>
                                    <span>
                                        <img src="images/on.png" alt=""/>
                                    </span>
                                    <span>
                                        <img src="images/xia.png" alt=""/>
                                    </span>
                                </p>
                            </li>
                            <li className="outer0">
                                <p className="container">
                                    <span>人</span>
                                    <span>永远是所有业务的关键</span>
                                    <span>着眼于人 / 激发无限</span>
                                    <span>
                                       <img src="images/Dynamic effect2.png" alt=""/>
                                    </span>
                                    <span>
                                       <img src="images/dynamic-effect0.png" alt=""/>
                                    </span>
                                    <span>
                                        <img src="images/dynamic-effect0.1.png" alt=""/>
                                    </span>
                                    <span>
                                        <img src="images/Dynamic effect1.png" alt=""/>
                                    </span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="wrap1">
                    <div class="container">
                        <div class="row r_first">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <p>LeechBox™ 边缘计算终端</p>
                            </div>
                        </div>
                        <div class="row r_two">
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">强大内置应用</p>
                                <p class="h_content">内置社交、工具、存储、搜索、APP管理、流程六大应用，适合在各种复杂工作环境中使用</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">应用市场</p>
                                <p class="h_content">内置应用市场，不同行业的开发者上传了数量众多的碎片化应用，供用户根据业务需要选择使用</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">自制APP</p>
                                <p class="h_content">基于自主研发的可视化APP制作工具，通过简单的拖拽操作即可制作APP，快速满足业务需要</p>
                            </div>
                            <div class="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <p class="h_title">支持企业部署</p>
                                <p class="h_content">拥有成熟整套部署技术，企业购买后可部署至内部使用，助力企业实现数字化</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap2">
                    <div className="container">
                        <div className="row r_first">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <p>基于角色/个性化定制/零门槛/自由共享</p>
                            </div>
                        </div>
                        <div className="row r_two">
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <h1><a href="#wrap3"><img src="images/banner2-1.png"
                                                          data-scroll-reveal="enter top over 2s and move 15px"/></a>
                                </h1>
                                <p>功能盒子</p>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <h1><a href="#wrap4"><img src="images/banner2-2.png"
                                                          data-scroll-reveal="enter top over 2s and move 15px after 0.4s"/></a>
                                </h1>
                                <p>流程盒子</p>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <h1><a href="#wrap5"><img src="images/banner2-3.png"
                                                          data-scroll-reveal="enter top over 2s and move 15px after 0.8s"/></a>
                                </h1>
                                <p>聚合盒子</p>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6">
                                <h1><a href="#wrap6"><img src="images/banner2-4.png"
                                                          data-scroll-reveal="enter top over 2s and move 15px after 1.2s"/></a>
                                </h1>
                                <p>强大组件库</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap3">
                    <div className="protect">
                        <div className="top">
                            <div className="div_zero">功能APP</div>
                            <div className="div_eight">基于应用碎片化理念，工作中每一项活动都包含若干功能点通过<a href="#">[TRU定制功能APP]</a>进行自由组合，让个人和团队工作更高效
                            </div>
                        </div>
                        <div className="bottom">
                            <ul id="outer" className="outer_2">
                                <li className="outer"><img src="images/banner3-4.png" alt=""/></li>
                                <li className="outer"><img src="images/banner3-3.png" alt=""/></li>
                                <li className="outer"><img src="images/banner3-2.png" alt=""/></li>
                                <li className="outer"><img src="images/banner3-1.png" alt=""/></li>
                            </ul>
                            <ul id="inner" className="inner_2">
                                <li className="gl inner"></li>
                                <li className="inner"></li>
                                <li className="inner"></li>
                                <li className="inner"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="wrap4">
                    <div className="main">
                        <p data-scroll-reveal="enter top over 2s and move 5px">支持本地工具调用</p>
                        <p data-scroll-reveal="wait 0.3s,then enter top over 2s and move 5px">支持应用上下文</p>
                        <p data-scroll-reveal="enter top over 2s and move 5px">支持团队协作</p>
                        <p data-scroll-reveal="wait 0.3s,then enter top over 2s and move 5px">智能节点提醒</p>
                        <p><img src="images/banner4-2.png" alt=""/></p>
                        <div className="div_first">
                            <div className="p_three" id="02">流程APP</div>
                            <div className="p_four">工作中流程随处可见，将流程产品化是大势所趋。TRU拥有自己研发的强大流程引擎，强力支持各种流程APP的定制和运行</div>
                        </div>
                    </div>
                </div>
                <div className="wrap5">
                    <div className="main_1">
                        <div className="top_1" id="03">
                            聚合APP
                        </div>
                        <div className="bottom_1">
                            <ul id="outer_1" className="outer_3">
                                <li className="outer_1"><img src="images/banner5-1.png" alt=""/></li>
                                <li className="outer_1"><img src="images/banner5-2.png" alt=""/></li>
                                <li className="outer_1"><img src="images/banner5-3.png" alt=""/></li>
                            </ul>
                            <ul id="inner_1" className="inner_3">
                                <li className="gl_1 inner_1"></li>
                                <li className="inner_1"></li>
                                <li className="inner_1"></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="wrap6">
                    <div id="wrap6" className="wrap6">
                        <div className="d1"></div>
                        <div className="d2"></div>
                        <div className="contain">
                            <div className="p_five" id="04">强大组件库</div>
                            <div className="p_six">众多专业开发者制作发布了丰富的UI组件和服务组件，业务人员只需通过下载这些组件，通过可视化的拖拉拽方式即可定制符合业务场景的APP
                            </div>
                            <div className="p_seven"><a href="<%= locals.truPath %>"></a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
