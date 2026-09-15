
const KEY='waselni_customer_v1';
const state = JSON.parse(localStorage.getItem(KEY)||'null') || {user:null,cart:[],orders:[],notifications:[]};
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.style.display='block';clearTimeout(window._t);window._t=setTimeout(()=>el.style.display='none',2500)}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function requireUser(){if(!state.user){location.href='login.html';return false}return true}
function logout(){state.user=null;save();location.href='login.html'}
function nav(active='home'){return `<nav class="bottomnav">
<a class="${active==='home'?'active':''}" href="home.html">🏠<br>الرئيسية</a>
<a class="${active==='orders'?'active':''}" href="orders.html">📦<br>طلباتي</a>
<a class="${active==='notifications'?'active':''}" href="notifications.html">🔔<br>الإشعارات</a>
<a class="${active==='profile'?'active':''}" href="profile.html">👤<br>حسابي</a></nav>`}
function topbar(){return `<header class="topbar"><a class="brand" href="home.html"><span class="logo">🚗</span><span>وصلني بطريقك<small>كل احتياجاتك.. نوصلها لك</small></span></a><div class="top-actions"><button class="iconbtn" onclick="location.href='notifications.html'">🔔</button><button class="iconbtn" onclick="location.href='profile.html'">👤</button></div></header>`}
function layout(content,active='home'){return `<div class="app">${topbar()}<main class="container">${content}</main>${nav(active)}<div id="toast" class="toast"></div></div>`}
function money(n){return new Intl.NumberFormat('ar-IQ').format(Math.round(n))+' د.ع'}
function addNotification(text){state.notifications.unshift({id:Date.now(),text,time:new Date().toLocaleString('ar-IQ')});save()}
function addOrder(order){order.id='W'+Date.now().toString().slice(-7);order.createdAt=new Date().toLocaleString('ar-IQ');state.orders.unshift(order);addNotification(`تم إنشاء الطلب ${order.id}`);save();return order}
function products(){return [
{id:1,name:'مسواك طبيعي',price:2000,icon:'🪵'}, {id:2,name:'معجون أسنان',price:3500,icon:'🪥'}, {id:3,name:'فرشاة أسنان',price:2500,icon:'🧴'},
{id:4,name:'عطر',price:12000,icon:'🌸'}, {id:5,name:'مناديل',price:1500,icon:'🧻'}, {id:6,name:'ماء',price:1000,icon:'💧'}]}
