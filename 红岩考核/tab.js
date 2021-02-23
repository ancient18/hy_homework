alert('请在此页面进行登录，才能看到您的歌单')


//登录功能
var dl=document.querySelector('.dl');
var register=document.querySelector('.register');
var cha1=document.querySelector('.cha1')
// 点登录弹出登录界面
dl.addEventListener('click',function(){
register.style.display='block';//不能设置为空
})
// 点×可以关闭登录界面
cha1.addEventListener('click',function(){
    register.style.display='none';
})

var regtel=/^1[3|4|5|7|8]\d{9}$/ //验证手机号码的正则表达式
var regpwd=/^[a-zA-Z0-9]{6,16}$/  //验证密码的正则表达式
var tel=document.querySelectorAll('.p1')[0];
var password=document.querySelectorAll('.p1')[1];
var flag=0;
    window.onload=function(){
        
        tel.onblur=function(){
            if(regtel.test(this.value)){
               flag++;
            }
            else{
                alert('输入手机号码有误，请重新输入');
            }
    
        }
        password.onblur=function(){
            if(regpwd.test(this.value)){
               flag++;
            }
            else{
                alert('输入密码有误，请重新输入');
            }
    
        }
    }
    var btn=document.querySelector('.b1');
    btn.addEventListener('click',function(){
        if(tel.value==''||password.value==''){
            alert('请将手机号，密码填写完整')
        }
        else{
            if(flag>=2){
               fn();
            }

        }
    })
function fn(){
    var  xhr= new XMLHttpRequest();
    xhr.open('get','http://sandyz.ink:3000/login/cellphone?phone='+tel.value+'&password='+password.value,true);
    xhr.onreadystatechange=()=>{
    if(xhr.readyState===4){
        if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
            const res=JSON.parse(xhr.responseText)
            console.log(res);
            console.log('请求成功');
            if('loginType' in res)//判断接收数据中对象是否有这个属性，也是验证是否存在这个用户
            {
                register.style.display='none';
                alert('欢迎回来'+res.profile.nickname);//显示昵称
                dl.insertAdjacentHTML('afterend',`<img src="${res.profile.avatarUrl}" alt="">`)
                location.href="./my-musical.html?"+res.account.id;
                
            }
            else{
                alert('用户不存在');
                
            }
        }
        else{
            console.log('请求失败');
        }
    }
}
    xhr.send();
}

