(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{42:function(e,t,a){e.exports=a(82)},75:function(e,t,a){},82:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(36),s=a.n(r),c=a(26),l=a.n(c),o=a(5),u=a(6),h=a(8),p=a(7),d=a(9),m=a(37),v=a(11),b=a(85),g=a(87),y=a(86),f=a(28),E=(a(83),a(13)),k=a.n(E),O=a(4),j=a.n(O),S=a(18),C=a(40),_=a(21),D={subscribed:!1,token:"",types:["IT_MANAGER","CODING","GAMING","ICE_BREAKER","WEB_DESIGN","TEMPLE_RUN","VLOG","PAPER_PRESENTATION"],subscribed_types:[]},N={data:[],types:["IT_MANAGER","CODING","GAMING","ICE_BREAKER","WEB_DESIGN","TEMPLE_RUN","VLOG","PAPER_PRESENTATION"]},w=Object(S.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_TOKEN":return Object(_.a)({},e,{subscribed:!0,token:t.payload});case"SET_TYPES":return Object(_.a)({},e,{subscribed_types:t.payload});default:return e}},eventDetail:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_EVENT_DETAIL":return Object(_.a)({},e,{data:t.payload});default:return e}}}),R=[C.a],T=Object(S.e)(w,{},Object(S.d)(S.a.apply(void 0,R))),x=(a(75),"/zxcvbnm"),A=function(e){return{type:"SET_TYPES",payload:e}},M=function(e){return{type:"SET_TOKEN",payload:e}},I=function(e){return{type:"SET_EVENT_DETAIL",payload:e}},B=(a(77),function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"flex-center-group"},i.a.createElement("h1",null,"404 Page Not Found")))}),P=a(3),W=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={subscribed:!1},e.showPermission=e.showPermission.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){this.setState({user:this.props.user}),this.props.user.subscribed&&this.props.history.push("/events")}},{key:"showPermission",value:function(e){var t=this;ve.usePublicVapidKey("BMRMW2uN6M8ZR7WdFHl-N-3u7IU-X2t-ZvgFuDiMC6DrpD2eaL0TQyg6hGiTg9TWuMVGBViFcahKuISZ2ZjHRUU"),ve.requestPermission().then(function(){return t.setState({subscribed:!0}),ve.getToken().then(function(e){e&&(t.props.setToken(e),localStorage.setItem("token",JSON.stringify(e)),t.props.history.push("/subscribe"))}).catch(function(e){return j.a.error({title:"Error:",message:"Some network issue didnt get your token Retry"})})}).catch(function(e){j.a.error({title:"Error:",message:"Some network issue didnt get your token Retry"})})}},{key:"nothing",value:function(e){j.a.error({title:"Error",message:"You didn't gave permission to push message"})}},{key:"render",value:function(){var e=!0===this.state.subscribed?this.nothing:this.showPermission;return i.a.createElement("div",null,i.a.createElement("div",{className:"starter_main_content"},i.a.createElement("h1",{className:"starter_main_head"},"Welcome to our site?"),i.a.createElement("h3",{className:"starter_main_p"},"Subscribe to get notification"),i.a.createElement("button",{className:"starter_subscribe_btn btn",onClick:e},"Subscribe")))}}]),t}(n.Component),G={setToken:M},L=Object(v.b)(function(e){return{user:e.user}},G)(W),V=a(2),q=a.n(V),U=function(e){var t=e.value,a=e.onChange;return i.a.createElement("li",{className:"ls_li",key:t},i.a.createElement("span",{className:"ls_icon"}),i.a.createElement("p",{className:"ls_head"},t),i.a.createElement("label",{className:"switch"},i.a.createElement("input",{type:"checkbox",name:t,id:t,onChange:a}),i.a.createElement("span",{className:"slider round"})))},K=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={types:[],subscribed_types:[]},e.onChangeEvent=e.onChangeEvent.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){var e=this;this.props.user.subscribed||this.props.history.push("/"),this.setState({types:this.props.user.types}),this.setState({subscribed_types:this.props.user.subscribed_types}),setTimeout(function(){0!==e.state.subscribed_types.length&&e.state.subscribed_types.map(function(e){return document.getElementById(e).checked=!0,0})},100)}},{key:"componentWillReceiveProps",value:function(e){this.setState({subscribed_types:e.user.subscribed_types})}},{key:"onChangeEvent",value:function(e){var t=this.props.user.token,a=e.target.name,n=this.state.subscribed_types;e.target.checked?(n.push(a),this.setState({subscribed_types:n}),this.props.setTypes(n),localStorage.setItem("subscribed",n),k.a.post("".concat(x,"/subscribe"),{type:a,token:t}).then(function(e){return j.a.success({title:"Registered",message:"Ull get notification ".concat(a)})}).catch(function(e){return j.a.error({title:"Error",message:"Cannot subscribe Retry"})})):(n=n.filter(function(t){return e.target.name!==t}),this.setState({subscribed_types:n}),this.props.setTypes(n),localStorage.setItem("subscribed",n),k.a.post("".concat(x,"/unsubscribe"),{type:a,token:t}).then(function(e){return j.a.success({title:"Revoked",message:"Registration cancelled you wont\t get any notification"})}).catch(function(e){return j.a.error({title:"Error",message:"Cannot revoke Retry"})}))}},{key:"render",value:function(){var e=this,t=0!==this.state.types.length?this.state.types.map(function(t){return i.a.createElement(U,{value:t,onChange:e.onChangeEvent,key:t})}):i.a.createElement("h1",null,"Loading");return i.a.createElement("div",null,i.a.createElement("ul",{className:"ls_main_ul"},t),i.a.createElement("div",{className:"flex"}))}}]),t}(n.Component);K.propType={user:q.a.object.isRequired,setTypes:q.a.func.isRequired};var z={setTypes:A},F=Object(v.b)(function(e){return{user:e.user}},z)(K),Y=function(e){var t=e.value.map(function(e){return i.a.createElement("li",{className:"ls_li",key:"".concat(e)},e)});return i.a.createElement("div",null,t)},J=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={val:0,jsx:""},e.onSwitch=e.onSwitch.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){var e=this,t=this.props.value.length;setInterval(function(){var a=e.state.val+1;a>=t&&(a=0),e.setState({val:a})},3e3);var a=-1,n=this.props.value.map(function(t){return a+=1,i.a.createElement("div",{className:"switch_content",id:a,onClick:e.onSwitch,key:a},i.a.createElement("div",{className:"switch_list",id:a,onClick:e.onSwitch}))});this.setState({jsx:n})}},{key:"componentWillReceiveProps",value:function(e){var t=this;if(e){var a=-1,n=e.value.map(function(e){return a+=1,i.a.createElement("div",{className:"switch_content",id:a,onClick:t.onSwitch,key:a},i.a.createElement("div",{className:"switch_list",id:a,onClick:t.onSwitch}))});this.setState({jsx:n})}}},{key:"onSwitch",value:function(e){var t=e.target.id;(t=parseInt(t))>=0&&t<this.props.value.length&&this.setState({val:t})}},{key:"render",value:function(){return i.a.createElement("div",null,this.props.value[this.state.val],i.a.createElement("div",{className:"switch_main"},this.state.jsx))}}]),t}(n.Component);J.proptypes={value:q.a.array.isrequired};var Z=J,H=function(e){var t=e.value.map(function(e){return i.a.createElement("div",null,i.a.createElement("h1",null,e.title),i.a.createElement("h2",null,e.desc),i.a.createElement(Y,{value:e.people}))});return i.a.createElement("div",null,i.a.createElement(Z,{value:t}))};H.proptype={value:q.a.array.isRequired};var Q=H,X=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={events:null},e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){this.setState({events:this.props.eventDetail.data})}},{key:"componentWillReceiveProps",value:function(e){e&&this.setState({events:e.eventDetail.data})}},{key:"render",value:function(){var e=this.state.events,t=null!==this.state.events?i.a.createElement("div",null,i.a.createElement(Q,{value:e})):i.a.createElement("div",null,i.a.createElement("h1",null,"Loading"));return i.a.createElement("div",null,i.a.createElement("h1",null,"Event Details"),t)}}]),t}(n.Component),$=Object(v.b)(function(e){return{eventDetail:e.eventDetail}})(X),ee=a(17),te=a(16),ae=a.n(te),ne=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={username:"",password:""},e.onChange=e.onChange.bind(Object(P.a)(Object(P.a)(e))),e.onSubmit=e.onSubmit.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(localStorage.admin&&localStorage.auth){var e=ae()(localStorage.auth),t=Date.now()/1e3;console.log(e,t),e.exp>=t&&this.props.history.push("/admin/dashboard")}}},{key:"onChange",value:function(e){this.setState(Object(ee.a)({},e.target.name,e.target.value))}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),k.a.post("".concat(x,"/admin/login"),{username:this.state.username,password:this.state.password}).then(function(e){if(localStorage.admin){var a=localStorage.admin;a=(a=(a=a.split(".")).filter(function(e){return""!==e}))[0],e.data.success&&e.data.auth===a&&(localStorage.setItem("auth",e.data.token),j.a.success({title:"LOGGED IN",message:"idoit start to edit now"}),t.props.history.push("/admin/dashboard"))}else j.a.error({title:"SOORY!!",message:"Sry buddy your not Authorised to access!.......Ask admin about this error"}),t.props.history.push("/")}).catch(function(e){if(e){var t=e.response.data.data||"Server Error:";j.a.warning({title:"ERROR",message:t})}else j.a.warning({title:"SERVER",message:"Check the server"})})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("h1",null,"Login here"),i.a.createElement("form",{onSubmit:this.onSubmit},i.a.createElement("input",{name:"username",type:"text",value:this.state.username,onChange:this.onChange,className:"input"}),i.a.createElement("input",{name:"password",type:"password",value:this.state.password,onChange:this.onChange,className:"input"}),i.a.createElement("input",{type:"submit",value:"submit",className:"btn"})))}}]),t}(n.Component),ie=function(e){var t=e.types,a=e.changeCurrent;return t.map(function(e){return i.a.createElement("button",{className:"nav_btn_list",onClick:a,name:e.title,key:Math.random()},e.title)})};ie.porpTypes={types:q.a.array.ieRequired,click:q.a.func.isRequired};var re=ie,se=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={current:"",eventDetail:{data:null}},e._redirect=e._redirect.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(localStorage.admin&&localStorage.auth){var e=ae()(localStorage.auth),t=Date.now()/1e3;e.exp<t?this.props.history.push("/admin/login"):this.setState({eventDetail:this.props.eventDetail})}else this.props.history.push("/admin/login")}},{key:"componentWillReceiveProps",value:function(e){e&&this.setState({eventDetail:e.eventDetail})}},{key:"_redirect",value:function(e){"create"===e.target.id?this.props.history.push("/admin/dashboard/create-event"):"update"===e.target.id?this.props.history.push("/admin/dashboard/update-event"):"delete"===e.target.id?this.props.history.push("/admin/dashboard/delete-event"):this.porps.hisory.push("/admin/dashboard")}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"nav_btn"},this.state.eventDetail.data?i.a.createElement(re,{types:this.state.eventDetail.data,changeCurrent:this.changeCurrent}):i.a.createElement("h1",null,"Loading")),i.a.createElement("div",{className:"flex"},i.a.createElement("button",{className:"btn btn-green",onClick:this._redirect,id:"create"},"Create"),i.a.createElement("button",{className:"btn btn-blue",onClick:this._redirect,id:"update"},"Update"),i.a.createElement("button",{className:"btn btn-red",onClick:this._redirect,id:"delete"},"Delete")))}}]),t}(n.Component),ce=Object(v.b)(function(e){return{eventDetail:e.eventDetail}})(se),le=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={title:"",desc:"",people:[],value:""},e.onChange=e.onChange.bind(Object(P.a)(Object(P.a)(e))),e.onSubmit=e.onSubmit.bind(Object(P.a)(Object(P.a)(e))),e.onChangeArray=e.onChangeArray.bind(Object(P.a)(Object(P.a)(e))),e.removeChild=e.removeChild.bind(Object(P.a)(Object(P.a)(e))),e._goBack=e._goBack.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(localStorage.admin&&localStorage.auth){var e=ae()(localStorage.auth),t=Date.now()/1e3;e.exp<t&&this.props.history.push("/admin/login")}else this.props.history.push("/admin/login")}},{key:"onChange",value:function(e){this.setState(Object(ee.a)({},e.target.name,e.target.value))}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),k.a.post("".concat(x,"/admin/create"),{title:this.state.title,desc:this.state.desc,people:this.state.people},{headers:{Authorization:localStorage.auth}}).then(function(e){j.a.success({title:"Saved",message:e.data.success}),t.setState({title:"",desc:"",people:[],value:""}),be()}).catch(function(e){return j.a.error({title:"Error",message:e})})}},{key:"onChangeArray",value:function(e){e.preventDefault();var t=this.state.value,a=this.state.people;a.push(t),this.setState({people:a,value:""})}},{key:"removeChild",value:function(e){var t=this.state.people;t=t.filter(function(t){return t!==e.target.id}),this.setState({people:t})}},{key:"_goBack",value:function(e){this.props.history.push("/admin/dashboard")}},{key:"render",value:function(){var e=this,t=this.state.people.map(function(t){return i.a.createElement("div",{className:"list_group",key:Math.random()},i.a.createElement("li",{className:"list",key:Math.random()},t),i.a.createElement("span",{id:t,className:"list_delete",key:Math.random(),onClick:e.removeChild},"*"))}),a="Title: ".concat(this.state.title),n="Description: ".concat(this.state.desc);return i.a.createElement("div",{className:"flex_group"},i.a.createElement("div",{className:"flex_one"},i.a.createElement("form",{onSubmit:this.onSubmit},i.a.createElement("input",{type:"text",name:"title",value:this.state.title,className:"input",onChange:this.onChange,placeholder:"Title"}),i.a.createElement("input",{type:"text",name:"desc",value:this.state.desc,className:"input",onChange:this.onChange,placeholder:"Description"}),i.a.createElement("div",{className:"input-grp"},i.a.createElement("input",{type:"text",name:"value",value:this.state.value,className:"input input_control",onChange:this.onChange,placeholder:"Add value to array"}),i.a.createElement("button",{className:"input-grp-btn",onClick:this.onChangeArray},"Add")),i.a.createElement("input",{type:"submit",vlaue:"submit",className:"btn btn_flex"}))),i.a.createElement("button",{className:"btn-back btn",onClick:this._goBack},"Back"),i.a.createElement("div",{className:"flex_two"},i.a.createElement("h1",null,a),i.a.createElement("h2",null,n),i.a.createElement("ul",null,t)))}}]),t}(n.Component),oe=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={current:"",eventDetail:null,currentDetail:null,value:""},e.changeCurrent=e.changeCurrent.bind(Object(P.a)(Object(P.a)(e))),e.changeCurrentDetail=e.changeCurrentDetail.bind(Object(P.a)(Object(P.a)(e))),e._removeChild=e._removeChild.bind(Object(P.a)(Object(P.a)(e))),e._addChild=e._addChild.bind(Object(P.a)(Object(P.a)(e))),e.addValue=e.addValue.bind(Object(P.a)(Object(P.a)(e))),e._onSubmit=e._onSubmit.bind(Object(P.a)(Object(P.a)(e))),e._goBack=e._goBack.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(localStorage.admin&&localStorage.auth){var e=ae()(localStorage.auth),t=Date.now()/1e3;e.exp<t?this.props.history.push("/admin/login"):this.setState({eventDetail:this.props.eventDetail})}else this.props.history.push("/admin/login");if(0!==this.props.eventDetail.data.length){var a=this.props.eventDetail;this.setState({current:a.data[0].title,currentDetail:a.data[0]})}}},{key:"componentWillReceiveProps",value:function(e){if(e&&this.setState({eventDetail:e.eventDetail}),0!==e.eventDetail.data.length){var t=e.eventDetail;this.setState({current:t.data[0].title,currentDetail:t.data[0]})}}},{key:"changeCurrent",value:function(e){this.setState({current:e.target.value});var t=this.state.eventDetail.data.filter(function(t){return t.title===e.target.value});this.setState({currentDetail:t[0]})}},{key:"changeCurrentDetail",value:function(e){var t=this.state.currentDetail;t[e.target.name]=e.target.value,this.setState({currentDetail:t})}},{key:"addValue",value:function(e){this.setState(Object(ee.a)({},e.target.name,e.target.value))}},{key:"_removeChild",value:function(e){var t=this.state.currentDetail;t.people=this.state.currentDetail.people.filter(function(t){return t!==e.target.id}),this.setState({currentDetail:t})}},{key:"_addChild",value:function(e){var t=this.state.currentDetail;t.people.push(this.state.value),this.setState({currentDetail:t,value:""})}},{key:"_onSubmit",value:function(e){e.preventDefault(),k.a.post("".concat(x,"/admin/update"),this.state.currentDetail,{headers:{Authorization:localStorage.auth}}).then(function(e){console.log(e.data)}).catch(function(e){return console.log(e.response.data)})}},{key:"_goBack",value:function(e){this.props.history.push("/admin/dashboard")}},{key:"render",value:function(){var e=this,t="";this.state.eventDetail.data&&(t=this.state.eventDetail.data.map(function(e){return i.a.createElement("option",{key:Math.random(),value:e.title},e.title," ")}));var a=this.state.currentDetail?i.a.createElement("div",null,i.a.createElement("input",{type:"text",value:this.state.currentDetail.title,name:"title",className:"input",onChange:this.changeCurrentDetail}),i.a.createElement("input",{type:"text",value:this.state.currentDetail.desc,name:"desc",className:"input",onChange:this.changeCurrentDetail}),i.a.createElement("div",{className:"input-grp"},i.a.createElement("input",{type:"text",name:"value",value:this.state.value,className:"input input_control",onChange:this.addValue,placeholder:"Add value to array"}),i.a.createElement("button",{className:"input-grp-btn",onClick:this._addChild,key:Math.random()},"Add")),i.a.createElement("div",{className:"list_group"},this.state.currentDetail.people.map(function(t){return i.a.createElement("div",{className:"item_grp",key:Math.random()},i.a.createElement("li",{className:"item",key:Math.random()},t),i.a.createElement("button",{className:"input-grp-btn",onClick:e._removeChild,id:t},"Remove"))}))):i.a.createElement("h1",null,"Loading..");return i.a.createElement("div",null,i.a.createElement("button",{className:"btn-back btn",onClick:this._goBack},"Back"),i.a.createElement("div",{className:"btn-blue p-5"},i.a.createElement("select",{className:"input",onChange:this.changeCurrent,value:this.state.current},t)),a,i.a.createElement("div",{className:"flex"},this.state.currentDetail&&i.a.createElement("button",{className:"btn btn-blue",onClick:this._onSubmit},"Update")))}}]),t}(n.Component);oe.proptypes={eventDetail:q.a.object.isRequired};var ue=Object(v.b)(function(e){return{eventDetail:e.eventDetail}})(oe),he=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(h.a)(this,Object(p.a)(t).call(this))).state={current:""},e.onChange=e.onChange.bind(Object(P.a)(Object(P.a)(e))),e.onSubmit=e.onSubmit.bind(Object(P.a)(Object(P.a)(e))),e._goBack=e._goBack.bind(Object(P.a)(Object(P.a)(e))),e}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){if(localStorage.admin&&localStorage.auth){var e=ae()(localStorage.auth),t=Date.now()/1e3;e.exp<t?this.props.history.push("/admin/login"):this.setState({eventDetail:this.props.eventDetail})}else this.props.history.push("/admin/login");0!==this.props.eventDetail.data.length&&this.setState({current:this.props.eventDetail.data[0].title})}},{key:"componentWillReceiveProps",value:function(e){e&&this.setState({eventDetail:e.eventDetail}),0!==e.eventDetail.data.length&&this.setState({current:e.eventDetail.data[0].title})}},{key:"onChange",value:function(e){this.setState({current:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault(),k.a.post("".concat(x,"/admin/delete"),{type:this.state.current},{headers:{Authorization:localStorage.auth}}).then(function(e){j.a.success({title:"deleted",message:e.data.success}),be()}).catch(function(e){return j.a.error({title:"error",message:e.response.data})})}},{key:"_goBack",value:function(e){this.props.history.push("/admin/dashboard")}},{key:"render",value:function(){var e="";return this.state.eventDetail.data&&(e=this.state.eventDetail.data.map(function(e){return i.a.createElement("option",{key:Math.random(),value:e.title},e.title," ")})),i.a.createElement("div",null,i.a.createElement("button",{className:"btn-back btn",onClick:this._goBack},"Back"),i.a.createElement("div",{className:"btn-blue p-5"},i.a.createElement("select",{className:"input",onChange:this.onChange,value:this.state.current},e)),i.a.createElement("div",{className:"flex"},this.state.current&&i.a.createElement("button",{className:"btn btn-blue",onClick:this.onSubmit},"Delete")))}}]),t}(n.Component);he.proptypes={eventDetail:q.a.object.isRequired};var pe=Object(v.b)(function(e){return{eventDetail:e.eventDetail}})(he);if(localStorage.subscribed){var de=localStorage.subscribed;de=de.split(","),T.dispatch(A(de))}if(localStorage.token){var me=localStorage.token;me=JSON.parse(me),T.dispatch(M(me))}f.initializeApp({apiKey:"AIzaSyAF36tTPv2e3s44oebncjDv5gtwcQhv09o",authDomain:"lacker-89773.firebaseapp.com",databaseURL:"https://lacker-89773.firebaseio.com",projectId:"lacker-89773",storageBucket:"lacker-89773.appspot.com",messagingSenderId:"984496280842"});var ve=f.messaging();function be(){return ge.apply(this,arguments)}function ge(){return(ge=Object(m.a)(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("".concat(x,"/eventupdates")).then(function(e){T.dispatch(I(e.data.value))}).catch(function(e){return j.a.warning({title:"RETRY",message:"server did'nt send any data"})});case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}be(),ve.onMessage(function(e){window.location.reload(),j.a.info({title:e.title,body:e.body})});var ye=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(h.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(r)))).state={Login:i.a.createElement(B,null)},a}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){return i.a.createElement(v.a,{store:T},i.a.createElement("div",null,i.a.createElement(b.a,null,i.a.createElement("div",null,i.a.createElement(g.a,null,i.a.createElement(y.a,{exact:!0,path:"/",component:L}),i.a.createElement(y.a,{exact:!0,path:"/subscribe",component:F}),i.a.createElement(y.a,{exact:!0,path:"/events",component:$}),i.a.createElement(y.a,{exact:!0,path:"/admin/login",component:ne}),i.a.createElement(y.a,{exact:!0,path:"/admin/dashboard",component:ce}),i.a.createElement(y.a,{exact:!0,path:"/admin/dashboard/create-event",component:le}),i.a.createElement(y.a,{exact:!0,path:"/admin/dashboard/delete-event",component:pe}),i.a.createElement(y.a,{exact:!0,path:"/admin/dashboard/update-event",component:ue}),i.a.createElement(y.a,{path:"*",component:B}))))))}}]),t}(n.Component);s.a.render(i.a.createElement(ye,null),document.getElementById("root"))}},[[42,2,1]]]);
//# sourceMappingURL=main.785a3094.chunk.js.map