(window.webpackJsonpweb=window.webpackJsonpweb||[]).push([[0],{22:function(t,e,a){t.exports=a.p+"static/media/itching.ad9f77ba.csv"},26:function(t,e,a){t.exports=a(41)},31:function(t,e,a){},32:function(t,e,a){},34:function(t,e){},35:function(t,e,a){},36:function(t,e,a){},39:function(t,e,a){},40:function(t,e,a){},41:function(t,e,a){"use strict";a.r(e);var n=a(2),r=a.n(n),i=a(21),o=a.n(i),c=a(24),u=a(6),l=a(7),s=a(9),p=a(8),f=a(10),d=(a(31),a(1)),h=a(45),v=a(18),y=a(13),m=a(0),g=(a(32),function(t){function e(){return Object(u.a)(this,e),Object(s.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.renderAxis()}},{key:"componentDidUpdate",value:function(){this.renderAxis()}},{key:"renderAxis",value:function(){var t="axis".concat(this.props.orient),e=y[t]().scale(this.props.scale).tickSize(-this.props.tickSize).tickPadding([12]).ticks(this.props.ticks);Object(m.f)(this.axisElement).call(e)}},{key:"render",value:function(){var t=this;return r.a.createElement("g",{className:"Axis Axis-".concat(this.props.orient),ref:function(e){t.axisElement=e},transform:this.props.translate})}}]),e}(n.Component)),k=function(t){var e=t.scales,a=t.margins,n=t.svgDimensions,i=t.ticksX,o=t.ticksY,c=n.height,u=n.width,l={orient:"Bottom",scale:e.xScale,translate:"translate(0, ".concat(c-a.bottom,")"),tickSize:c-a.top-a.bottom,ticks:i},s={orient:"Left",scale:e.yScale,translate:"translate(".concat(a.left,", 0)"),tickSize:u-a.left-a.right,ticks:o};return r.a.createElement("g",null,r.a.createElement(g,l),r.a.createElement(g,s))},b=(a(3),function(t){function e(t){var a;return Object(u.a)(this,e),a=Object(s.a)(this,Object(p.a)(e).call(this,t)),console.log(t),a}return Object(f.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props,e=t.scales,a=t.margins,n=t.data,i=t.svgDimensions,o=t.rowHeight,c=t.index,u=e.xScale,l=(e.yScale,e.rScale),s=i.height;console.log("data ",this.props.data);var p=n.values.map((function(t,e){return r.a.createElement("circle",{key:"key-"+t.key+t.key,cx:u(t.key),cy:s-a.bottom-1.4*o-c*o*1.4,r:l(t.value),fill:"rgb(65, 44, 201, 0.7)"})}));return r.a.createElement("g",null,p)}}]),e}(n.Component)),C=a(12),E=a.n(C);var O=function(){return Math.floor(20*Math.random())},D=function(){return[{key:"Apples",values:[{key:"2004",value:O()},{key:"2005",value:O()},{key:"2006",value:O()},{key:"2007",value:O()},{key:"2008",value:O()},{key:"2009",value:O()},{key:"2010",value:O()}]},{key:"COs",values:[{key:"2004",value:O()},{key:"2005",value:O()},{key:"2006",value:O()},{key:"2007",value:O()},{key:"2008",value:O()},{key:"2009",value:O()},{key:"2010",value:O()}]},{key:"Oranges",values:[{key:"2004",value:O()},{key:"2005",value:O()},{key:"2006",value:O()},{key:"2007",value:O()},{key:"2008",value:O()},{key:"2009",value:O()},{key:"2010",value:O()}]},{key:"Pears",values:[{key:"2004",value:O()},{key:"2005",value:O()},{key:"2006",value:O()},{key:"2007",value:O()},{key:"2008",value:O()},{key:"2009",value:O()},{key:"2010",value:O()}]},{key:"Kiwis",values:[{key:"2004",value:O()},{key:"2005",value:O()},{key:"2006",value:O()},{key:"2007",value:O()},{key:"2008",value:O()},{key:"2009",value:O()},{key:"2010",value:O()}]}]},j=function(t){var e=["x","y","z"],a=void 0!==t.key?1:2,n=function(){if(1===a)return d.w(t)[0]}(),r=function(){if(1===a)return d.u(t.values,(function(t){return t.value}))}(),i=function(){if(2===a)return t.map((function(t){return t.key}))}(),o=function(){if(2===a){var e={};return d.m(t).values().forEach((function(t){var a=t.key;t.values.forEach((function(t){e[a]="undefined"===typeof e[a]?0:e[a],e[a]+=t.value}))})),e}}(),c=function(){if(2===a)return d.n(d.w(o))}(),u=1===a?Object.keys(t.values[0]):Object.keys(t[0].values[0]),l=function(){if(1===a)return d.w(t.values).map((function(t){return t.key}));var e=[];return d.m(t).values().forEach((function(t){var a=[];t.values.forEach((function(t,e){a[e]=t.key})),e=function(t,e){for(var a=[],n=t.concat(e),r=n.length,i={};r--;){var o=n[r];i[o]||(a.unshift(o),i[o]=!0)}return a}(a,e)})),e}(),s=function(){if(2===a){var e={};return d.m(t).values().forEach((function(t){t.values.forEach((function(t){var a=t.key;e[a]="undefined"===typeof e[a]?0:e[a],e[a]+=t.value}))})),e}}(),p=function(){if(2===a)return d.n(d.w(s))}(),f=function(){return 1===a?d.p(t.values,(function(t){return+t.value})):(d.m(t).values().forEach((function(t){t.values.forEach((function(t){e="undefined"===typeof e?t.value:d.p([e,+t.value])}))})),+e);var e}(),h=function(){var e;return 1===a?e=d.n(t.values,(function(t){return+t.value})):d.m(t).values().forEach((function(t){t.values.forEach((function(t){e="undefined"!==typeof e?d.n([e,+t.value]):+t.value}))})),e}(),v=[f,h],y=function(){var n={};return 1===a?(e.forEach((function(e){n[e]=d.p(t.values,(function(t){return+t[e]}))})),n):(d.m(t).values().forEach((function(t){t.values.forEach((function(t){e.forEach((function(e){n[e]=e in n?d.p([n[e],+t[e]]):t[e]}))}))})),n)}(),m=function(){var n={};return 1===a?(e.forEach((function(e){n[e]=d.n(t.values,(function(t){return+t[e]}))})),n):(d.m(t).values().forEach((function(t){t.values.forEach((function(t){e.forEach((function(e){n[e]=e in n?d.n([n[e],+t[e]]):t[e]}))}))})),n)}(),g=function(){var t={};return e.forEach((function(e){t[e]=[y[e],m[e]]})),t}(),k=function(t){var e=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0},b=function(){var e=0;return 2===a&&d.m(t).values().forEach((function(t){t.values.forEach((function(t){e=d.n([e,k(t.value)])}))})),e>20?20:e}(),C=function(){var t=h-f;return[.15,.4,.55,.9].map((function(e){return Number((f+e*t).toFixed(b))}))}();return{summary:function(){return{dataType:a,rowKey:n,rowTotal:r,rowKeys:i,rowTotals:o,rowTotalsMax:c,rowValuesKeys:u,columnKeys:l,columnTotals:s,columnTotalsMax:p,valueMin:f,valueMax:h,valueExtent:v,coordinatesMin:y,coordinatesMax:m,coordinatesExtent:g,maxDecimalPlace:b,thresholds:C}},rotate:function(){var e=t.map((function(t){return t.key}));return t[0].values.map((function(t){return t.key})).map((function(a,n){return{key:a,values:e.map((function(e,a){var r=Object.assign({},t[a].values[n]);return r.key=e,r}))}}))}}}(D()).summary(),w=j.rowKeys,x=j.columnKeys,T={top:50,right:15,bottom:100,left:60},M={width:800,height:500},B=d.n(D()[1].values,(function(t){return t.value})),S=Object(h.a)().domain(x).range([T.left,M.width-T.right]).padding(1),A=Object(h.a)().domain(w).range([M.height-T.bottom,T.top]).padding(1),I=Object(v.a)().domain([0,B]).range([2,24]),H=(r.a.Component,a(34),a(43)),P=a(22),L=a.n(P),N=function(t){return E()("".concat(t.split("T")[0]),"YYYYMMDDxxx").format("YYYY-MM-DD").split("T")[0]},R=function(t,e){var a=t.split("T")[1].slice(0,-1),n=e||t.split(";")[1].split(";")[0];return E.a.utc("".concat(a),"HH:mm:ss").utcOffset(n).format("HH:mm:ss")},U=function(t){var e=t.map((function(e){return{date:N(e[t.columns[0]]),time:R(e[t.columns[0]],e[t.columns[1]])}}));return e.unshift({date:N(t.columns[0]),time:R(t.columns[0],t.columns[1])}),V(e)},Y=function(t,e){var a=t[e];return K(a)},z=function(t){var e=[];return t.map((function(t){e.push(t.value)})),d.o(e)},K=function(t){console.log("groupByHours ",t);for(var e=[],a=0;a<24;a++)e.push({key:a,value:0,class:0});return t.filter((function(t){var a=parseInt(t.split(":")[0]);e.some((function(t){return t.key===a}))&&e[a].value++})),e},V=function(t){return t.reduce((function(t,e){return t[e.date]=t[e.date]||[],t[e.date].push(e.time),t}),{})},F=(a(35),650-10-10),G=650-20-20,q=100,J=Math.min(F,G)/2-6,W=(d.v("%I %p"),2*Math.PI),$=Object(H.a)().range([q,J]),X=function(t){function e(){var t,a;Object(u.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(r)))).renderRadial=function(){var t=Object(v.a)();"Midnight Up"===a.props.clockConfig?t.range([0,W]):t.range([0+Math.PI,W+Math.PI]);var e=d.l().angle((function(e){return t(e.key)})).radius((function(t){return $(t.value)})).curve(a.props.lineType),n=a.props.dataDayHours;console.log("LINE ",a.props.clockConfig);var r=d.s(a.refs.svgElem),i=r.selectAll(".radial").data(n);i.exit().classed("radial",!1).attr("opacity",.8).transition().attr("opacity",0).remove();i.enter().append("g").attr("transform","translate("+F/2+","+G/2+")").classed("radial",!0);i.exit().classed("radial",!1).attr("opacity",.8).transition().attr("opacity",0).remove(),console.log("data ",n);var o=z(n);t.domain(d.j(n,(function(t){return t.key}))),$.domain(d.j(n,(function(t){return t.value})));d.t(".radial").append("path").datum(n).attr("fill","url(#gradientRainbow)").attr("stroke","#213946").attr("stroke-width",1).attr("z-index",200).attr("d",e);var c=d.r().domain([0,4.5,9]).range(["#F5D801","#74D877","#2A4858"]).interpolate(d.k),u=(d.t(".radial").append("defs").append("radialGradient").attr("id","gradientRainbow").attr("gradientUnits","userSpaceOnUse").attr("cx","0%").attr("cy","0%").attr("r","45%").selectAll("stop").data(d.q(10)).enter().append("stop").attr("offset",(function(t,e){return e/9*50+40+"%"})).attr("stop-color",(function(t){return c(t)})),d.t(".radial").append("g").attr("text-anchor","middle")),l=u.selectAll(".radial").data($.ticks(5)).enter().append("g");l.append("circle").attr("fill","none").attr("stroke","#D8D8D8").attr("opacity",.5).attr("r",(function(t){return $(t)})),u.append("circle").attr("fill","none").attr("stroke","#2A41E5").attr("stroke-width",3).attr("r",(function(){return $(o)})),u.append("circle").attr("fill","white").attr("stroke","black").attr("opacity",1).attr("r",(function(){return $($.domain()[0])})),l.append("text").attr("y",(function(t){return-$(t)})).attr("dy","0.35em").text((function(t,e){return 0===t?"":t}));var s=r.selectAll(".radial").append("g").selectAll(".radial").data(t.ticks(24)).enter().append("g").attr("text-anchor","middle").attr("transform",(function(e){return"rotate("+(180*t(e)/Math.PI-90)+")translate("+q+",0)"}));s.append("line").attr("x2",-5).attr("stroke","#595D5C"),s.append("text").attr("transform",(function(e){var a=t(e.key);return a<Math.PI/2||a>3*Math.PI/2?"rotate(90)translate(0,22)":"rotate(-90)translate(0, -15)"})).text((function(t){return t})).style("font-size",10).attr("color","#595D5C").attr("opacity",1)},a}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(t){t!==this.props&&(d.s("svg").selectAll("*").remove(),this.renderRadial())}},{key:"componentDidMount",value:function(){this.renderRadial()}},{key:"render",value:function(){return r.a.createElement("div",{className:"radialContainer center"},r.a.createElement("svg",{width:650,height:650,ref:"svgElem"}))}}]),e}(r.a.Component),Q=a(44),Z=(a(36),20),_=40,tt=800-_-20,et=400-Z-30,at=Object(h.a)().range([0,tt]).padding(.1),nt=Object(v.a)().range([et,0]),rt=function(t){function e(){return Object(u.a)(this,e),Object(s.a)(this,Object(p.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(t){t!==this.props&&(d.s("svg").selectAll("*").remove(),this.renderBarChart())}},{key:"componentDidMount",value:function(){this.renderBarChart()}},{key:"renderBarChart",value:function(){var t=this.props.dataDayHours,e=Object(h.a)().rangeRound([0,tt]).domain(t.map((function(t){return t.key}))).padding(.1),a=Object(v.a)().range([et,0]).domain([d.p(t,(function(t){return t.value})),d.n(t,(function(t){return t.value}))]).nice(),n=d.s(this.refs.svgElemBar),r=n.append("g").attr("transform","translate(".concat(_,", ").concat(Z,")")),i=n.append("defs"),o=d.r().domain([0,4.5,9]).range(["#2A4858","#74D877","#F5D801"]).interpolate(d.k);i.append("linearGradient").attr("id","bg-gradient").attr("x1","0%").attr("y1","0%").attr("x2","0%").attr("y2","100%").attr("gradientUnits","userSpaceOnUse").selectAll("stop").data(d.q(10)).enter().append("stop").attr("offset",(function(t,e){return e/9*50+10+"%"})).attr("stop-color",(function(t){return o(t)}));i.append("clipPath").attr("id","clip-bar-rects").selectAll("bar").data(t).enter().append("rect").attr("x",(function(t){return e(t.key)})).attr("y",(function(t){return a(t.value)})).attr("width",e.bandwidth()).attr("height",(function(t){return et-a(t.value)})),r.append("g").attr("clip-path","url(#clip-bar-rects)").append("rect").attr("x",0).attr("y",0).attr("width",tt).attr("height",et).style("fill","url(#bg-gradient)");var c=d.a(e),u=d.b(a).ticks(5);r.append("g").attr("class","axis").attr("transform","translate(0, ".concat(et,")")).call(c).selectAll("text").style("text-anchor","start").style("alignment-baseline","middle").attr("transform","translate(-3)"),r.append("g").attr("class","axis").call(u)}},{key:"renderBarChartBasic",value:function(){var t=this.props.dataDayHours;console.log("barchart data ",t);var e=d.s(this.refs.svgElemBar),a=["#F5D801","#74D877","#2A4858"],n=Object(Q.a)().domain([0,a.length-1,d.n(t,(function(t){return t.value}))]).range(a);at.domain(t.map((function(t){return t.key}))),nt.domain([d.p(t,(function(t){return t.value})),d.n(t,(function(t){return t.value}))]).nice(),e.selectAll(".bar").data(t).enter().append("rect").attr("class","bar").attr("x",(function(t){return at(t.key)})).attr("width",at.bandwidth()).attr("y",(function(t){return nt(t.value)})).attr("height",(function(t){return et-nt(t.value)})).attr("fill",(function(t){return n(t.value)})),e.append("g").attr("transform","translate(0,"+et+")").call(d.a(at)),e.append("g").call(d.b(nt))}},{key:"render",value:function(){return r.a.createElement("div",{className:"radialContainer center"},r.a.createElement("svg",{width:800,height:400,ref:"svgElemBar"}))}}]),e}(r.a.Component),it=a(19),ot=a.n(it),ct=(a(38),a(39),function(t){function e(){var t;return Object(u.a)(this,e),(t=Object(s.a)(this,Object(p.a)(e).call(this))).state={chartType:"Radial"},t}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"onDropdownChange",value:function(t){this.props.setDate(t.value)}},{key:"onLineChange",value:function(t){"Basis"===t.value&&this.props.setLineType(d.d,"Basis"),"Linear"===t.value&&this.props.setLineType(d.h,"Linear"),"Bundle"===t.value&&this.props.setLineType(d.e,"Bundle"),"Cardinal"===t.value&&this.props.setLineType(d.f,"Cardinal"),"Catmull"===t.value&&this.props.setLineType(d.g,"Catmull"),"Natural"===t.value&&this.props.setLineType(d.i,"Natural")}},{key:"onClockConfigChange",value:function(t){"Midnight Up"===t.value&&this.props.setClockConfig("Midnight Up"),"Midnight Down"===t.value&&this.props.setClockConfig("Midnight Down")}},{key:"onButtonClick",value:function(t){console.log(t.target.name),this.props.setChartType(t.target.name)}},{key:"render",value:function(){var t=this,e=Object.keys(this.props.dayInsights)[0],a=["Cardinal","Linear","Basis","Bundle","Catmull","Natural"],n=["Midnight Up","Midnight Down"],i=this.props.firstValue||e,o=this.props.secondValue||a[0],c=this.props.configValue||n[0];return r.a.createElement("div",{className:"menu"},r.a.createElement("h1",null,"Daily insights"),r.a.createElement("div",{className:"btnsHolder"},"Graph type",r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("button",{className:"Radial"===this.props.chartType?"btn btn-active":"btn-normal btn",onClick:function(e){return t.onButtonClick(e)},name:"Radial"},"Radial"),r.a.createElement("button",{className:"BarChart"===this.props.chartType?"btn btn-active":"btn btn-normal",onClick:function(e){return t.onButtonClick(e)},name:"BarChart"},"Bar chart")),"Day",r.a.createElement(ot.a,{options:Object.keys(this.props.dayInsights),onChange:function(e){return t.onDropdownChange(e)},value:i,placeholder:"Select an option"}),"Radial"===this.props.chartType&&r.a.createElement("div",null,r.a.createElement("p",null,"Line type"),r.a.createElement(ot.a,{options:a,onChange:function(e){return t.onLineChange(e)},value:o,placeholder:"Select an option"}),r.a.createElement("p",null,"Clock configuration"),r.a.createElement(ot.a,{options:n,onChange:function(e){return t.onClockConfigChange(e)},value:c,placeholder:"Select an option"})),"BarChart"===this.props.chartType&&r.a.createElement("div",null))}}]),e}(n.Component));a(40);function ut(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function lt(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ut(a,!0).forEach((function(e){Object(c.a)(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ut(a).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var st=function(t){function e(t){var a;return Object(u.a)(this,e),(a=Object(s.a)(this,Object(p.a)(e).call(this,t))).state={currentDay:"2017-02-25",lineType:d.f,chartType:"Radial",clockConfig:"Midnight Up"},a}return Object(f.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;d.c(L.a).then((function(e){var a=Y(U(e),t.state.currentDay),n=U(e);t.setState({data:e,dataDayHours:a,dayInsights:n})}))}},{key:"setDate",value:function(t){var e=t,a=Y(U(this.state.data),t);this.setState((function(t){return lt({},t.lineType,{},t.lineTypeStr,{},t.clockConfig,{currentDay:e,dataDayHours:a})}))}},{key:"setLineType",value:function(t,e){console.log("set line type ",e),this.setState((function(a){return lt({},a.clockConfig,{lineType:t,lineTypeStr:e})}))}},{key:"setClockConfig",value:function(t){console.log("set clock config type ",t),this.setState({clockConfig:t})}},{key:"setChartType",value:function(t){console.log("set chart type ",t),this.setState((function(e){return lt({},e.lineType,{},e.lineTypeStr,{},e.currentDay,{},e.dataDayHours,{},e.clockConfig,{chartType:t})}))}},{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"menuContainer"},this.state.dayInsights&&r.a.createElement(ct,{dayInsights:this.state.dayInsights,setDate:function(e){return t.setDate(e)},setLineType:function(e,a){return t.setLineType(e,a)},setClockConfig:function(e){return t.setClockConfig(e)},configValue:this.state.clockConfig,firstValue:this.state.currentDay,secondValue:this.state.lineTypeStr,chartType:this.state.chartType,setChartType:function(e){return t.setChartType(e)}})),r.a.createElement("div",{className:"chartContainer"},this.state.dataDayHours&&"Radial"===this.state.chartType&&r.a.createElement(X,{currentDay:this.state.currentDay,dataDayHours:this.state.dataDayHours,dayInsights:this.state.dayInsights,lineType:this.state.lineType,clockConfig:this.state.clockConfig}),this.state.dataDayHours&&"BarChart"===this.state.chartType&&r.a.createElement(rt,{currentDay:this.state.currentDay,dataDayHours:this.state.dataDayHours,dayInsights:this.state.dayInsights,lineType:this.state.lineType})))}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(st,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.bc1a8fb7.chunk.js.map