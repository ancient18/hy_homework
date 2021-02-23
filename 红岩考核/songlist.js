const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open('get', 'http://sandyz.ink:3000/personalized',true);
//接收返回值

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
     const res = JSON.parse(xhr.responseText);
      console.log(res);
      console.log('请求成功');
      console.log(res.result[0].picUrl);
      var img =document.querySelector('.content').querySelectorAll('.img');
      for(var i=0;i<20;i++){
        img[i].querySelector('a').style.background='url'+'('+res.result[i+8].picUrl+')';
        img[i].querySelector('a').style.backgroundSize=100+'%';
        img[i].querySelector('a').style.backgroundRepeat='no-repeat'
       img[i].querySelector('span').querySelector('a').innerHTML=res.result[i+8].name;
       img[i].querySelector('.number').querySelector('p').innerHTML=
      (res.result[i+8].playCount>10000?(parseInt(res.result[i+8].playCount/10000)+'万'):res.result[i+8].playCount)
      }
      

    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
xhr.send();

var sing =document.querySelector('.content').querySelectorAll('.img');//获取歌单所在的div盒子

console.log(sing);

var count;//接收点击时的索引值

const ahr = new XMLHttpRequest();
//初始化一个get请求
ahr.open('get', 'http://sandyz.ink:3000/personalized',true);
//接收返回值

ahr.onreadystatechange = () => {
  if (ahr.readyState === 4) {
    if ((ahr.status >= 200 && ahr.status < 300) || ahr.status == 304) {
     const res = JSON.parse(ahr.responseText);
      console.log(res);
      console.log(res.result[0].picUrl);
      console.log('请求成功');
        document.querySelector('.content').addEventListener('click',function(e){
          console.log(e.target.innerHTML);
          console.log(e.target.style.background);
          console.log(e.target.style.background.substring(5,77));
          
          // 返回点击后歌曲所在歌单中的索引值
           function checkAdult(age) {
              return (
                age.picUrl.replace(/\"/g, "") == e.target.style.background.substring(5,77).replace(/\"/g, "")
                ||age.name==e.target.innerHTML
                );
          }
          function myFunction() {
             count = res.result.findIndex(checkAdult);
          }
          myFunction();
          console.log(count);
          // 改变a标签，点击跳转页面
          sing.forEach(element => {
              element.querySelector('.a').href='./sing-content.html?'+count+'&'+res.result[count].id;
              element.querySelector('span').querySelector('a').href='./sing-content.html?'+count+'&'+res.result[count].id;
          });
        
    
         })
    

    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
ahr.send();
