var img1=document.querySelector('.top-content').querySelector('img');//获取封面图像
var title =document.querySelector('.right').querySelector('.title');//获取标题
var img2=document.querySelector('.label').querySelector('span').querySelector('img');//获取头像
var name1=document.querySelector('.label').querySelectorAll('span');//获取昵称
var times =document.querySelector('.times');//播放次数
var songlist=document.querySelector('.songlist');//歌曲列表
var list =document.querySelector('.list');//获取左边列表的歌单
var Flag;//替代this的值
var count;//传过来的参数索引值
var count1;//中间变量
var Id;//传过来的参数用户id
var ID;//传过来的参数歌单id
var x;//传递歌单的数量
var y;//用来传递一开始界面第一个歌单的id
var flag1//替代this的值
var audio =document.querySelector('audio');
var dl=document.querySelector('.dl');
var Label =document.querySelector('.Label')
var details =document.querySelector('.details');

//判断是否有歌单的参数传进
if(location.search.indexOf('&')!=-1){
  count1=location.search.indexOf('&');
  Id=+location.search.substring(1,count1);
  ID=+location.search.substring(count1+1);

  //获取左边列表的歌单
const ghr = new XMLHttpRequest();
//初始化一个get请求
ghr.open('get', 'http://sandyz.ink:3000/user/playlist?uid='+Id,true);
//接收返回值
ghr.onreadystatechange = () => {
  if (ghr.readyState === 4) {
    if ((ghr.status >= 200 && ghr.status < 300) || ghr.status == 304) {
      const res = JSON.parse(ghr.responseText);
      console.log(res);
      x=res.playlist.length;
      dl.insertAdjacentHTML('afterend',`<img src="${res.playlist[0].creator.avatarUrl}" alt="">`);
      console.log(res.playlist[0].name);

      res.playlist.forEach(element => {
        list.insertAdjacentHTML('beforeend',`<div>
        <img src="${element.coverImgUrl}" alt="">
        <span class="top">${element.name}</span>
        <span class="bottom"></span>
    </div>`)
    
      })
      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
  
};
//发送请求
ghr.send();
console.log(Id);
console.log(ID);
//接收右边列表的歌曲
const hhr = new XMLHttpRequest();
//初始化一个get请求
hhr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+ID,true);
//接收返回值
hhr.onreadystatechange = () => {
  if (hhr.readyState === 4) {
    if ((hhr.status >= 200 && hhr.status < 300) || hhr.status == 304) {
      const res = JSON.parse(hhr.responseText);
      console.log(res);
      title.innerHTML=res.playlist.name;
      times.innerHTML='播放次数：'+res.playlist.playCount;
      img1.src=res.playlist.coverImgUrl;
      img2.src=res.playlist.creator.avatarUrl;
      name1[1].innerHTML=res.playlist.creator.nickname;
      details.innerHTML=res.playlist.description;//介绍
      res.playlist.tags.forEach(element => {
        Label.insertAdjacentHTML('beforeend',`<span class="tags">${element}</span>`)//标签
      });
      for(var i=0;i<res.playlist.tracks.length;i++){
        songlist.insertAdjacentHTML('beforeend',`<table>
        <tr>
          <td>${i+1}</td>
          <td><a href="#" target="blank">
          <img src="./bf1.png" alt="">
          </a></td>
          <td>${res.playlist.tracks[i].name}</td>
          <td></td>
          <td>${res.playlist.tracks[i].ar[0].name}</td>
          <td>${res.playlist.tracks[i].al.name}</td>
        </tr>
  </table>`)
      }


      let tr=document.querySelector('.songlist').querySelectorAll('tr');
     
      //渲染时长

      for(let i=0;i<res.playlist.tracks.length;i++){

      
      
        const xhr = new XMLHttpRequest();
      //初始化一个get请求
      xhr.open('get', 'http://sandyz.ink:3000/song/url?id='+res.playlist.tracks[i].id,true);
      //接收返回值
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
            let tr=document.querySelector('.songlist').querySelectorAll('tr');
            let audio =document.querySelectorAll('audio');
            let time;
            audio[i].src=res.data[0].url;
            console.log(audio);
            audio[i].addEventListener("canplay",function(){
              time=parseInt(audio[i].duration);
        
            let  minute = time / 60;
            let minutes = parseInt(minute);
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            //秒
            let second = time % 60;
            let seconds = Math.round(second);
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            console.log(minutes+','+seconds);
            
            
            tr[i].querySelectorAll('td')[3].innerHTML=minutes+':'+seconds;
            })
            
           
            
           
            console.log('请求成功');
          } else {
            console.log('请求失败');
          }
        }
        
      };
      
      //发送请求
      xhr.send();
 
};



      
      console.log(tr);
      for(let i=0;i<res.playlist.tracks.length;i++){
        tr[i].addEventListener('click',function(e){
          flag1=this
          console.log(this.querySelectorAll('td')[2].innerHTML);
          e.stopPropagation();
          function checkAdult(age) {
            return (
              age.name ==  flag1.querySelectorAll('td')[2].innerHTML
              
              );
        }
        function myFunction() {
           count = res.playlist.tracks.findIndex(checkAdult);
        }
        myFunction();
        console.log(count);
        tr[i].querySelectorAll('td')[1].querySelector('a').href="./player.html?"+res.playlist.tracks[count].id;
        
        })
      }

      


      console.log(list.querySelectorAll('div'));
      

      function f(){
        
        for(var i=0;i<x;i++){
          console.log(list.querySelectorAll('div'));
        list.querySelectorAll('div')[i].addEventListener('click',function(e){
          console.log(this);
          Flag=this;
          e.stopPropagation();
          title.innerHTML=Flag.querySelector('.top').innerHTML;
          this.style.backgroundColor='#e6e6e6';

          const xhr = new XMLHttpRequest();
          //初始化一个get请求
          xhr.open('get', 'http://sandyz.ink:3000/user/playlist?uid='+Id,true);
          //接收返回值
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                const res = JSON.parse(xhr.responseText);
                console.log(res);
                

                  function checkAdult(age) {
                    return (
                      age.name == Flag.querySelector('.top').innerHTML
                      
                      );
                }
                function myFunction() {
                   count = res.playlist.findIndex(checkAdult);
                }
                myFunction();
                console.log(count);
                location.href="./my-musical.html?"+Id+'&'+res.playlist[count].id;
                console.log('请求成功');
              } else {
                console.log('请求失败');
              }
            }
            
          };
          
          //发送请求
          xhr.send();
          
        })
      }
    }
      f();//点击事件

      console.log('请求成功');
      console.log(tr);
    } else {
      console.log('请求失败');
    }
  }
  
};

//发送请求
hhr.send();


}
else{
  Id=+location.search.substring(1);
  console.log(Id);

   //实例化XMLHttpRequest对象
const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open('get', 'http://sandyz.ink:3000/user/playlist?uid='+Id,true);
//接收返回值
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      const res = JSON.parse(xhr.responseText);
      console.log(res);
      y=res.playlist[0].id;
      console.log(y);


      img1.src=res.playlist[0].coverImgUrl;
      
      img2.src=res.playlist[0].creator.avatarUrl;
      dl.insertAdjacentHTML('afterend',`<img src="${res.playlist[0].creator.avatarUrl}" alt="">`)
      name1[1].innerHTML=res.playlist[0].creator.nickname;
      times.innerHTML='播放次数：'+res.playlist[0].trackCount;
      console.log(res.playlist[0].name);

      res.playlist.forEach(element => {
        list.insertAdjacentHTML('beforeend',`<div>
        <img src="${element.coverImgUrl}" alt="">
        <span class="top">${element.name}</span>
        <span class="bottom"></span>
    </div>`)
    
      })
      ajax();
      
      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
  
};

//发送请求
xhr.send();

function ajax(){
  //接收右边列表的歌曲
const hhr = new XMLHttpRequest();
//初始化一个get请求
console.log(y);
hhr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+y,true);
//接收返回值
hhr.onreadystatechange = () => {
  if (hhr.readyState === 4) {
    if ((hhr.status >= 200 && hhr.status < 300) || hhr.status == 304) {
      const res = JSON.parse(hhr.responseText);
      console.log(res);
      title.innerHTML=res.playlist.name;
      times.innerHTML='播放次数：'+res.playlist.playCount;
      for(var i=0;i<res.playlist.tracks.length;i++){
        songlist.insertAdjacentHTML('beforeend',`<table>
        <tr>
          <td>${i+1}</td>
          <td><a href="#" target="blank">
          <img src="./bf1.png" alt="">
          </a></td>
          <td>${res.playlist.tracks[i].name}</td>
          <td></td>
          <td>${res.playlist.tracks[i].ar[0].name}</td>
          <td>${res.playlist.tracks[i].al.name}</td>
        </tr>
  </table>`)
      }

      for(let i=0;i<res.playlist.tracks.length;i++){

      
      
        const xhr = new XMLHttpRequest();
      //初始化一个get请求
      xhr.open('get', 'http://sandyz.ink:3000/song/url?id='+res.playlist.tracks[i].id,true);
      //接收返回值
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
            let tr=document.querySelector('.songlist').querySelectorAll('tr');
            let audio =document.querySelectorAll('audio');
            let time;
            audio[i].src=res.data[0].url;
            console.log(audio);
            audio[i].addEventListener("canplay",function(){
              time=parseInt(audio[i].duration);
        
            let  minute = time / 60;
            let minutes = parseInt(minute);
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            //秒
            let second = time % 60;
            let seconds = Math.round(second);
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            console.log(minutes+','+seconds);
            
            
            tr[i].querySelectorAll('td')[3].innerHTML=minutes+':'+seconds;
            })
            
           
            
           
            console.log('请求成功');
          } else {
            console.log('请求失败');
          }
        }
        
      };
      
      //发送请求
      xhr.send();
 
};



let tr=document.querySelector('.songlist').querySelectorAll('tr');
      
      for(let i=0;i<res.playlist.tracks.length;i++){
        tr[i].addEventListener('click',function(e){
          flag1=this
          console.log(this.querySelectorAll('td')[2].innerHTML);
          e.stopPropagation();
          function checkAdult(age) {
            return (
              age.name ==  flag1.querySelectorAll('td')[2].innerHTML
              
              );
        }
        function myFunction() {
           count = res.playlist.tracks.findIndex(checkAdult);
        }
        myFunction();
        console.log(count);
        tr[i].querySelectorAll('td')[1].querySelector('a').href="./player.html?"+res.playlist.tracks[count].id+'&'+y;
        
        })
      }

      


      
      console.log(list.querySelectorAll('div'));
      

      function f(){
        for(var i=0;i<res.playlist.tracks.length;i++){
          console.log(list.querySelectorAll('div'));
        list.querySelectorAll('div')[i].addEventListener('click',function(e){
          console.log(this);
          Flag=this;
          e.stopPropagation();
          title.innerHTML=Flag.querySelector('.top').innerHTML;
          this.style.backgroundColor='#e6e6e6';

          const xhr = new XMLHttpRequest();
          //初始化一个get请求
          xhr.open('get', 'http://sandyz.ink:3000/user/playlist?uid='+Id,true);
          //接收返回值
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                const res = JSON.parse(xhr.responseText);
                console.log(res);
                

                  function checkAdult(age) {
                    return (
                      age.name == Flag.querySelector('.top').innerHTML
                      
                      );
                }
                function myFunction() {
                   count = res.playlist.findIndex(checkAdult);
                }
                myFunction();
                console.log(count);
                location.href="./my-musical.html?"+Id+'&'+res.playlist[count].id;
                console.log('请求成功');
              } else {
                console.log('请求失败');
              }
            }
            
          };
          
          //发送请求
          xhr.send();
          
        })
      }
    }
      f();//点击事件

      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
  
};

//发送请求
hhr.send();

}




}











