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
      var img =document.querySelector('.sings').querySelectorAll('.img');
      for(var i=0;i<8;i++){
        img[i].querySelector('a').style.background='url'+'('+res.result[i].picUrl+')';
        img[i].querySelector('a').style.backgroundSize=100+'%';
        img[i].querySelector('a').style.backgroundRepeat='no-repeat'
       img[i].querySelector('span').querySelector('a').innerHTML=res.result[i].name;
       img[i].querySelector('.number').querySelector('p').innerHTML=
      (res.result[i].playCount>10000?(parseInt(res.result[i].playCount/10000)+'万'):res.result[i].playCount)
      }
    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
xhr.send();

