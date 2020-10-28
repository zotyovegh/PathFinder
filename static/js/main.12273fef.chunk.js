(this["webpackJsonppath-finder"]=this["webpackJsonppath-finder"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(8),s=n.n(o),r=n(3),l=n(4),u=n(6),c=n(5),d=n(2);n(14);function f(t){return t.data.start?"cell-start":t.data.end?"cell-end":""}var h=function(t){return i.a.createElement("div",{className:"cell ".concat(f(t)),id:"cell-".concat(t.data.row,"-").concat(t.data.col),onMouseDown:function(e){e.preventDefault(),t.onMouseDown(t.data)},onMouseEnter:function(){return t.onMouseEnter(t.data)},onMouseUp:function(){return t.onMouseUp(t.data)},onContextMenu:function(t){t.preventDefault()}},i.a.createElement("div",{className:"num ",id:"num-".concat(t.data.row,"-").concat(t.data.col)},t.data.distance===1/0?"":t.data.distance))},g=(n(15),n(1));function v(t){"path"===t?p():"grid"===t&&function(t){p(),window.gridComponent.setState({grid:m(t),startRow:t.startR,startCol:t.startC,endRow:t.endR,endCol:t.endC});var e,n=Object(g.a)(window.gridComponent.state.grid);try{for(n.s();!(e=n.n()).done;){var a,i=e.value,o=Object(g.a)(i);try{for(o.s();!(a=o.n()).done;){var s=a.value;s.end||s.start||b("cell","cell cell-empty",s)}}catch(r){o.e(r)}finally{o.f()}}}catch(r){n.e(r)}finally{n.f()}}(window.gridComponent.props),window.gridComponent.setState({status:"pending"})}function p(){for(var t=window.gridComponent.state.grid,e=0;e<window.gridComponent.props.rows;e++)for(var n=0;n<window.gridComponent.props.columns;n++){var a=t[e][n];a.visited=!1,a.distance=1/0,a.previous=null,a.f=1/0,a.g=1/0,a.h=1/0,a.neighbors=[],b("num","num",a),a.isWall||a.end||a.start||b("cell","cell cell-empty",a),!a.isWall||a.end||a.start||b("cell","cell cell-wall",a)}window.gridComponent.setState({grid:t})}function m(t){for(var e=[],n=0;n<t.rows;n++){e.push([]);for(var a=0;a<t.columns;a++)e[n].push({id:0,row:n,col:a,start:!1,end:!1,distance:1/0,visited:!1,isWall:!1,previous:null,f:1/0,g:1/0,h:1/0,neighbors:[]})}return e[t.startR][t.startC].start=!0,e[t.endR][t.endC].end=!0,e}function w(t){for(var e=[],n=t;null!==n;)e.unshift(n),n=n.previous;return e}function C(t){var e=t,n=window.gridComponent.state.grid;e.isWall=!e.isWall,e.isWall?b("cell","cell cell-wall-animated",t):b("cell","cell cell-empty",t),b("num","num",e),e.visited=!1,n[t.row][t.col]=e,window.gridComponent.setState({grid:n},(function(){"finished"===window.gridComponent.state.status&&(p(),window.gridComponent.doAlgorithm("fast"))}))}function b(t,e,n){document.getElementById("".concat(t,"-").concat(n.row,"-").concat(n.col)).className=e}function y(t){for(var e=function(e){setTimeout((function(){if(e!==t.length){var n=t[e];n.start||n.end||(b("cell","cell cell-path-animated",n),window.gridComponent.state.previousVisualization&&b("num","num num-path",n))}else window.gridComponent.setState({status:"finished"})}),20*e)},n=0;n<=t.length;n++)e(n)}function S(t){for(var e=0;e<t.length;e++){var n=t[e];n.start||n.end||(b("cell","cell cell-path",n),window.gridComponent.state.previousVisualization&&b("num","num num-path",n))}}function E(t){v("path");var e,n=JSON.parse(JSON.stringify(t)),a=[],i=[],o=Object(g.a)(n);try{for(o.s();!(e=o.n()).done;){var s,r=e.value,l=Object(g.a)(r);try{for(l.s();!(s=l.n()).done;){s.value.isWall=!0}}catch(c){l.e(c)}finally{l.f()}}}catch(c){o.e(c)}finally{o.f()}for(z(n[1][1],n,i);i.length;){var u=W(i);u[1].isWall&&(u[0].isWall=!1,u[1].isWall=!1,a.push(u[0]),a.push(u[1]),z(u[1],n,i))}!function(t){var e,n=Object(g.a)(t);try{for(n.s();!(e=n.n()).done;){var a,i=e.value,o=Object(g.a)(i);try{for(o.s();!(a=o.n()).done;){var s=a.value;s.distance=1/0,s.f=1/0,s.g=1/0,s.h=1/0}}catch(c){o.e(c)}finally{o.f()}}}catch(c){n.e(c)}finally{n.f()}window.gridComponent.setState({grid:t})}(n),function(t,e){window.gridComponent.setState({status:"running"});var n,a=Object(g.a)(t);try{for(a.s();!(n=a.n()).done;){var i,o=n.value,s=Object(g.a)(o);try{for(s.s();!(i=s.n()).done;){var r=i.value;r.end||r.start||b("cell","cell cell-wall",r)}}catch(c){s.e(c)}finally{s.f()}}}catch(c){a.e(c)}finally{a.f()}for(var l=function(t){setTimeout((function(){t!==e.length?e[t].end||e[t].start||b("cell","cell cell-empty",e[t]):window.gridComponent.setState({status:"finished"})}),8*t)},u=0;u<=e.length;u++)l(u)}(n,a)}function z(t,e,n){var a=t.col,i=t.row;if(i>1&&e[i-2][a].isWall){var o=e[i-1][a];n.push([o,e[i-2][a]])}if(a<e[0].length-2&&e[i][a+2].isWall){var s=e[i][a+1];n.push([s,e[i][a+2]])}if(i<e.length-2&&e[i+2][a]){var r=e[i+1][a];n.push([r,e[i+2][a]])}if(a>1&&e[i][a-2]){var l=e[i][a-1];n.push([l,e[i][a-2]])}}function W(t){var e=Math.floor(Math.random()*t.length),n=t[e];return t.splice(e,1),n}var M=0;function O(t,e,n,a){var i=[],o=t.col,s=t.row;"DOWN"===n||"START"===n?(j(s,o,e,i),R(s,o,e,i),k(s,o,e,i),A(s,o,e,i),a&&(V(s,o,e,i),D(s,o,e,i),N(s,o,e,i),T(s,o,e,i))):"UP"===n&&(k(s,o,e,i),A(s,o,e,i),j(s,o,e,i),R(s,o,e,i),a&&(N(s,o,e,i),T(s,o,e,i),V(s,o,e,i),D(s,o,e,i)));for(var r=0,l=i;r<l.length;r++){var u=l[r];u.distance=t.distance+1,u.previous=t,u.id=M,M++}}function j(t,e,n,a){if(t>0){var i=n[t-1][e];i.visited||null!==i.previous||a.push(i)}}function R(t,e,n,a){if(e<n[0].length-1){var i=n[t][e+1];i.visited||null!==i.previous||a.push(i)}}function k(t,e,n,a){if(t<n.length-1){var i=n[t+1][e];i.visited||null!==i.previous||a.push(i)}}function A(t,e,n,a){if(e>0){var i=n[t][e-1];i.visited||null!==i.previous||a.push(i)}}function V(t,e,n,a){if(t>0&&e<n[0].length-1){var i=n[t-1][e+1];if(n[t-1][e].isWall&&n[t][e+1].isWall)return;i.visited||null!==i.previous||a.push(i)}}function D(t,e,n,a){if(e<n[0].length-1&&t<n.length-1){var i=n[t+1][e+1];if(n[t+1][e].isWall&&n[t][e+1].isWall)return;i.visited||null!==i.previous||a.push(i)}}function N(t,e,n,a){if(t<n.length-1&&e>0){var i=n[t+1][e-1];if(n[t+1][e].isWall&&n[t][e-1].isWall)return;i.visited||null!==i.previous||a.push(i)}}function T(t,e,n,a){if(e>0&&t>0){var i=n[t-1][e-1];if(n[t][e-1].isWall&&n[t-1][e].isWall)return;i.visited||null!==i.previous||a.push(i)}}function P(t,e,n){var a=w(e);"slow"===n?("finished"===window.gridComponent.state.status&&p(),window.gridComponent.setState({status:"running"}),function(t,e){for(var n=function(n){var a=t[n];if(n===t.length)return setTimeout((function(){y(e)}),10*n),{v:void 0};setTimeout((function(){a.start&&window.gridComponent.state.previousVisualization&&b("num","num num-start",a),a.end&&window.gridComponent.state.previousVisualization&&b("num","num num-end",a),a.isWall||a.start||a.end||(b("cell","cell cell-visited-animated",a),window.gridComponent.state.previousVisualization&&b("num","num num-visited",a))}),10*n)},a=0;a<=t.length;a++){var i=n(a);if("object"===typeof i)return i.v}}(t,a)):"fast"===n&&function(t,e){for(var n=0;n<=t.length-1;n++){var a=t[n];a.start&&window.gridComponent.state.previousVisualization?b("num","num num-start",a):a.end?(window.gridComponent.state.previousVisualization&&b("num","num num-end",a),S(e)):a.isWall||a.start||a.end||(b("cell","cell cell-visited",a),window.gridComponent.state.previousVisualization&&b("num","num num-visited",a))}}(t,a)}function U(t,e,n,a,i,o){!function(t,e){var n,a=Object(g.a)(t);try{for(a.s();!(n=a.n()).done;){var i,o=n.value,s=Object(g.a)(o);try{for(s.s();!(i=s.n()).done;){var r=i.value;r.neighbors=[],r.row>0&&r.neighbors.push(t[r.row-1][r.col]),r.col<t[0].length-1&&r.neighbors.push(t[r.row][r.col+1]),r.row<t.length-1&&r.neighbors.push(t[r.row+1][r.col]),r.col>0&&r.neighbors.push(t[r.row][r.col-1]),e&&(r.row>0&&r.col<t[0].length-1&&(t[r.row-1][r.col].isWall&&t[r.row][r.col+1].isWall||r.neighbors.push(t[r.row-1][r.col+1])),r.col<t[0].length-1&&r.row<t.length-1&&(t[r.row+1][r.col].isWall&&t[r.row][r.col+1].isWall||r.neighbors.push(t[r.row+1][r.col+1])),r.row<t.length-1&&r.col>0&&(t[r.row+1][r.col].isWall&&t[r.row][r.col-1].isWall||r.neighbors.push(t[r.row+1][r.col-1])),r.col>0&&r.row>0&&(t[r.row][r.col-1].isWall&&t[r.row-1][r.col].isWall||r.neighbors.push(t[r.row-1][r.col-1])))}}catch(l){s.e(l)}finally{s.f()}}}catch(l){a.e(l)}finally{a.f()}}(t,a);var s=[],r=[],l=[];for(s.push(e),e.g=0,e.f=J(e,n,a,i);s.length;){for(var u=0,c=0;c<s.length;c++)s[c].f<s[u].f&&(u=c);var d=s[u];if(d===n)return console.log(n.end),void F(l,s,n,o);B(s,d);for(var f=d.neighbors,h=0;h<f.length;h++){var v=f[h];if(!v.isWall||v.start||v.end){var p=d.g+x(v,d,i);p<v.g&&(r.push(v),v.g=p,v.h=J(v,n,a,i),v.f=v.g+v.h,v.previous=d,s.includes(v)||(s.push(v),"slow"===o?l.push([s.slice(0),r.slice(0)]):"fast"===o&&l.push(v)))}}}F(l,s,n,o)}function x(t,e,n){return n?t.row-e.row===0||t.col-e.col===0?1:Math.SQRT2:1}function J(t,e,n,a){return n||!a?Math.abs(t.row-e.row)+Math.abs(t.col-e.col):a?Math.sqrt((t.row-e.row)*(t.row-e.row)+(t.col-e.col)*(t.col-e.col)):void 0}function B(t,e){for(var n=t.length-1;n>=0;n--)t[n]===e&&t.splice(n,1)}function F(t,e,n,a){var i=w(n);"slow"===a?("finished"===window.gridComponent.state.status&&p(),window.gridComponent.setState({status:"running"}),function(t,e){for(var n=function(n){if(n===t.length)return setTimeout((function(){y(e)}),10*n),{v:void 0};setTimeout((function(){p();for(var e=t[n][0],a=t[n][1],i=0;i<a.length;i++)a[i].start||a[i].end||b("cell","cell cell-previous",a[i]);for(var o=0;o<e.length;o++)e[o].start||e[o].end||b("cell","cell cell-current",e[o]);n<t.length-1&&!a[a.length-1].start&&!a[a.length-1].end&&b("cell","cell cell-activepath",a[a.length-1])}),10*n)},a=0;a<=t.length;a++){var i=n(a);if("object"===typeof i)return i.v}}(t,i)):"fast"===a&&function(t,e,n){p();for(var a=0;a<t.length;a++)t[a].start||t[a].end||b("cell","cell cell-previous",t[a]);for(var i=0;i<e.length;i++)e[i].start||e[i].end||b("cell","cell cell-current",e[i]);S(n)}(t,e,i)}var H=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(r.a)(this,n),(a=e.call(this,t)).onMouseDown=function(t){"running"!==a.state.status&&(a.setState({isMouseDown:!0}),t.start?a.setState({isStartOn:!0}):t.end?a.setState({isEndOn:!0}):C(t))},a.onMouseEnter=function(t){if(a.state.isMouseDown){if(t.start||t.end)return;if(a.state.isStartOn){var e=a.state.grid.slice();return e[a.state.startRow][a.state.startCol].start=!1,e[t.row][t.col].start=!0,void a.setState({grid:e,startRow:t.row,startCol:t.col},(function(){"finished"===a.state.status?(p(),a.doAlgorithm("fast")):v("path")}))}if(a.state.isEndOn){var n=a.state.grid.slice();return n[a.state.endRow][a.state.endCol].end=!1,n[t.row][t.col].end=!0,void a.setState({grid:n,endRow:t.row,endCol:t.col},(function(){"finished"===a.state.status?(p(),a.doAlgorithm("fast")):v("path")}))}C(t)}},a.onMouseUp=function(){a.setState({isMouseDown:!1,isStartOn:!1,isEndOn:!1})},a.doAlgorithm=function(t){var e=a.state.grid,n=e[a.state.startRow][a.state.startCol],i=e[a.state.endRow][a.state.endCol];"dijkstra"===a.state.currentAlg?function(t,e,n,a,i){var o=[],s=[],r="START",l=e.row;e.distance=0;var u,c=Object(g.a)(t);try{for(c.s();!(u=c.n()).done;){var d,f=u.value,h=Object(g.a)(f);try{for(h.s();!(d=h.n()).done;){var v=d.value;o.push(v)}}catch(m){h.e(m)}finally{h.f()}}}catch(m){c.e(m)}finally{c.f()}for(;o.length;){o.sort((function(t,e){return t.id-e.id})),o.sort((function(t,e){return t.distance-e.distance}));var p=o.shift();if("START"!==r&&(r=p.row<l?"UP":"DOWN"),!p.isWall||p.start||p.end){if(p.distance===1/0)return void P(s,n,i);if(p.visited=!0,s.push(p),p===n)return o.sort((function(t,e){return t.id-e.id})),void P(s,n,i);O(p,t,r,a),"START"!==r&&(l=p.row),r="CHANGED"}}}(e,n,i,a.state.diagonalVisualization,t):"astar"===a.state.currentAlg&&U(e,n,i,a.state.diagonalVisualization,a.state.optimizedVisualization,t)},a.state={grid:m(t),isMouseDown:!1,isStartOn:!1,isEndOn:!1,startRow:t.startR,startCol:t.startC,endRow:t.endR,endCol:t.endC,status:"pending",currentAlg:"astar",previousVisualization:!1,diagonalVisualization:!0,optimizedVisualization:!0},a.handleChange=a.handleChange.bind(Object(d.a)(a)),window.gridComponent=Object(d.a)(a),a}return Object(l.a)(n,[{key:"handleChange",value:function(t){var e=this;"distance"===t.target.name?this.setState({previousVisualization:!this.state.previousVisualization},(function(){"finished"===e.state.status&&(p(),"dijkstra"===e.state.currentAlg&&e.doAlgorithm("fast"))})):"diagonal"===t.target.name?this.setState({diagonalVisualization:!this.state.diagonalVisualization},(function(){"finished"===e.state.status&&(p(),e.doAlgorithm("fast"))})):"optimized"===t.target.name?this.setState({optimizedVisualization:!this.state.optimizedVisualization},(function(){"finished"===e.state.status&&(p(),e.doAlgorithm("fast"))})):"choice"===t.target.name&&this.setState({currentAlg:t.target.value})}},{key:"render",value:function(){var t=this,e=this.state.grid.map((function(e,n){return i.a.createElement("div",{key:n,className:"row"},e.map((function(e,n){return i.a.createElement(h,{key:n,data:e,onMouseDown:t.onMouseDown,onMouseEnter:t.onMouseEnter,onMouseUp:t.onMouseUp})})))}));return i.a.createElement("div",null,i.a.createElement("div",{className:"grid",onMouseLeave:this.onMouseUp},e),i.a.createElement("select",{value:this.state.currentAlg,onChange:this.handleChange,name:"choice",disabled:"running"===this.state.status},i.a.createElement("option",{value:"dijkstra"},"Dijkstra"),i.a.createElement("option",{value:"astar"},"A* Search")),i.a.createElement("button",{disabled:"running"===this.state.status,onClick:function(){return t.doAlgorithm("slow")}},"Start"),i.a.createElement("button",{disabled:"running"===this.state.status,onClick:function(){v("path")}},"Clear path"),i.a.createElement("button",{disabled:"running"===this.state.status,onClick:function(){v("grid")}},"Clear grid"),"Distance",i.a.createElement("label",{className:"switch"},i.a.createElement("input",{disabled:"running"===this.state.status||"astar"===this.state.currentAlg,type:"checkbox",defaultChecked:this.state.previousVisualization,onChange:this.handleChange,name:"distance"}),i.a.createElement("span",{className:"slider round"})),"Diagonal",i.a.createElement("label",{className:"switch"},i.a.createElement("input",{disabled:"running"===this.state.status,type:"checkbox",defaultChecked:this.state.diagonalVisualization,onChange:this.handleChange,name:"diagonal"}),i.a.createElement("span",{className:"slider round"})),"Optimized",i.a.createElement("label",{className:"switch"},i.a.createElement("input",{disabled:"running"===this.state.status||"dijkstra"===this.state.currentAlg,type:"checkbox",defaultChecked:this.state.optimizedVisualization,onChange:this.handleChange,name:"optimized"}),i.a.createElement("span",{className:"slider round"})),i.a.createElement("button",{disabled:"running"===this.state.status,onClick:function(){!function(t){p();var e,n=Object(g.a)(t);try{for(n.s();!(e=n.n()).done;){var a,i=e.value,o=Object(g.a)(i);try{for(o.s();!(a=o.n()).done;){a.value.isWall=!1}}catch(f){o.e(f)}finally{o.f()}}}catch(f){n.e(f)}finally{n.f()}for(var s=(t.length-1)*(t[0].length-1),r=Math.floor(.4*s),l=0;l<r;l++){var u=Math.floor(Math.random()*(t.length-1)),c=Math.floor(Math.random()*(t[0].length-1)),d=t[u][c];d.start||d.end||d.isWall?l--:d.isWall=!0}window.gridComponent.setState({grid:t})}(t.state.grid)}},"Random grid"),i.a.createElement("button",{disabled:"running"===this.state.status,onClick:function(){E(t.state.grid)}},"Prim maze"))}}]),n}(a.Component),I=function(t){Object(u.a)(n,t);var e=Object(c.a)(n);function n(t){var a;return Object(r.a)(this,n),(a=e.call(this)).getPosition=function(t){var e=null;if("row"===t)e=Math.floor(a.getSize("row")/2);else if("startCol"===t)e=Math.floor(a.getSize("col")/5);else if("endCol"===t){var n=a.getSize("col");e=n-Math.ceil(n/5)}return e},a.getSize=function(t){var e=null;if("row"===t){if((e=(window.innerHeight/30).toFixed(0)-5)<10)return 9}else if("col"===t&&(e=(window.innerWidth/30).toFixed(0)-5)<10)return 9;return e%2===0&&e--,e},a.state={rows:a.getSize("row"),columns:a.getSize("col"),startR:a.getPosition("row"),startC:a.getPosition("startCol"),endR:a.getPosition("row"),endC:a.getPosition("endCol")},a}return Object(l.a)(n,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(H,{rows:this.state.rows,columns:this.state.columns,startR:this.state.startR,startC:this.state.startC,endR:this.state.endR,endC:this.state.endC}))}}]),n}(a.Component);s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(I,null)),document.getElementById("root"))},9:function(t,e,n){t.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.12273fef.chunk.js.map