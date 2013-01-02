(function(){var e,t,n,r,i,s,o,u,a=!0,f=window.sharejs,l={};l.name="text2",l.create=function(){return""},t=function(e){var t,n,r,i;if(!Array.isArray(e))throw new Error("Op must be an array of components");n=null;for(r=0,i=e.length;r<i;r++){t=e[r];switch(typeof t){case"object":if(!(typeof t.d=="number"&&t.d>0))throw new Error("Object components must be deletes of size > 0");break;case"string":if(!(t.length>0))throw new Error("Inserts cannot be empty");break;case"number":if(!(t>0))throw new Error("Skip components must be >0");if(typeof n=="number")throw new Error("Adjacent skip components should be combined")}n=t}if(typeof n=="number")throw new Error("Op has a trailing skip")},e=function(e){if(!Array.isArray(e)||e.length!==2||typeof e[0]!="number"||typeof e[1]!="number")throw new Error("Cursor must be an array with two numbers")},r=function(e){return function(t){if(!!t&&t.d!==0)return e.length===0?e.push(t):typeof t==typeof e[e.length-1]?typeof t=="object"?e[e.length-1].d+=t.d:e[e.length-1]+=t:e.push(t)}},i=function(e){var t=0,n=0,r=function(r,i){var s,o;return t===e.length?r===-1?null:r:(s=e[t],typeof s=="number"?r===-1||s-n<=r?(o=s-n,++t,n=0,o):(n+=r,r):typeof s=="string"?r===-1||i==="i"||s.length-n<=r?(o=s.slice(n),++t,n=0,o):(o=s.slice(n,n+r),n+=r,o):r===-1||i==="d"||s.d-n<=r?(o={d:s.d-n},++t,n=0,o):(n+=r,{d:r}))},i=function(){return e[t]};return[r,i]},n=function(e){return typeof e=="number"?e:e.length||e.d},o=function(e){return e.length>0&&typeof e[e.length-1]=="number"&&e.pop(),e},l.normalize=function(e){var t,n,i,s=[],u=r(s);for(n=0,i=e.length;n<i;n++)t=e[n],u(t);return o(s)},l.apply=function(e,n){var r,i,s,o,u;if(typeof e!="string")throw new Error("Snapshot should be a string");t(n),s=0,i=[];for(o=0,u=n.length;o<u;o++){r=n[o];switch(typeof r){case"number":if(r>e.length)throw new Error("The op is too long for this document");i.push(e.slice(0,r)),e=e.slice(r);break;case"string":i.push(r);break;case"object":e=e.slice(r.d)}}return i.join("")+e},l.transform=function(e,s,u){var a,f,l,c,h,p,d,v,m,g,y;if(u!=="left"&&u!=="right")throw new Error("side ("+u+") must be 'left' or 'right'");t(e),t(s),h=[],a=r(h),y=i(e),v=y[0],d=y[1];for(m=0,g=s.length;m<g;m++){l=s[m];switch(typeof l){case"number":c=l;while(c>0)f=v(c,"i"),a(f),typeof f!="string"&&(c-=n(f));break;case"string":u==="left"&&(p=d(),typeof p=="string"&&a(v(-1))),a(l.length);break;case"object":c=l.d;while(c>0){f=v(c,"i");switch(typeof f){case"number":c-=f;break;case"string":a(f);break;case"object":c-=f.d}}}}while(l=v(-1))a(l);return o(h)},l.compose=function(e,s){var u,a,f,l,c,h,p,d,v,m;t(e),t(s),c=[],u=r(c),m=i(e),h=m[0],p=m[1];for(d=0,v=s.length;d<v;d++){f=s[d];switch(typeof f){case"number":l=f;while(l>0)a=h(l,"d"),u(a),typeof a!="object"&&(l-=n(a));break;case"string":u(f);break;case"object":l=f.d;while(l>0){a=h(l,"d");switch(typeof a){case"number":u({d:a}),l-=a;break;case"string":l-=a.length;break;case"object":u(a)}}}}while(f=h(-1))u(f);return o(c)},l.cursorEq=function(e,t){return e[0]===t[0]&&e[1]===t[1]},s=function(e,t){var n,r,i,s=0;for(r=0,i=t.length;r<i;r++){n=t[r];if(e<=s)break;switch(typeof n){case"number":if(e<=s+n)return e;s+=n;break;case"string":s+=n.length,e+=n.length;break;case"object":e-=Math.min(n.d,e-s)}}return e},l.transformCursor=function(t,n,r){var i,o,u,a;e(t),o=0;if(r){for(u=0,a=n.length;u<a;u++){i=n[u];switch(typeof i){case"number":o+=i;break;case"string":o+=i.length}}return[o,o]}return[s(t[0],n),s(t[1],n)]},typeof a!="undefined"&&a!==null?f.types.text2=l:module.exports=l,typeof a!="undefined"&&a!==null?u=f.types.text2:u=require("./text2"),u.api={provides:{text:!0},getLength:function(){return this.snapshot.length},getText:function(){return this.snapshot},insert:function(e,t,n){var r=u.normalize([e,t]);return this.submitOp(r,n),r},del:function(e,t,n){var r=u.normalize([e,{d:t}]);return this.submitOp(r,n),r},_register:function(){return this.on("remoteop",function(e,t){var n,r,i,s,o=r=0,u=[];for(i=0,s=e.length;i<s;i++){n=e[i];switch(typeof n){case"number":o+=n,u.push(r+=n);break;case"string":this.emit("insert",o,n),u.push(o+=n.length);break;case"object":this.emit("delete",o,t.slice(r,r+n.d)),u.push(r+=n.d);break;default:u.push(void 0)}}return u})}}}).call(this)