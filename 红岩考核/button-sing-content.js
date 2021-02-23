var sing =document.querySelector('.sings').querySelectorAll('.img');
var div=document.querySelector('.sings').querySelector('.img');

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
        document.querySelector('.sings').addEventListener('click',function(e){
          console.log(e.target.innerHTML);
          console.log(e.target.style.background);
          console.log(e.target.style.background.substring(5,77));

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


