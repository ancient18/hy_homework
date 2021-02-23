var img1=document.querySelector('.top-content').querySelector('img');//获取歌曲封面
var title =document.querySelector('.right').querySelector('.title');//获取标题
var label=document.querySelector('.right').querySelector('.label').querySelectorAll('div')//获取标签
var details =document.querySelector('.details').querySelector('p');//获取简介
var zk=document.querySelector('.zk');//获取展开按钮
var big =document.querySelector('.Big').querySelector('.content');//获取整个内容


//判断是否有歌单的参数传进
if(location.search.indexOf('&')!=-1){
var count1=location.search.indexOf('&');
var ID=+location.search.substring(count1+1);//歌单id
var id =+location.search.substring(1,count1);//歌曲id
}else{
  var id =+location.search.substring(1);//歌曲id
}

const ghr = new XMLHttpRequest();
//初始化一个get请求
ghr.open('get', 'http://sandyz.ink:3000/song/detail?ids='+id,true);
//接收返回值
ghr.onreadystatechange = () => {
  if (ghr.readyState === 4) {
    if ((ghr.status >= 200 && ghr.status < 300) || ghr.status == 304) {
      const res = JSON.parse(ghr.responseText);
      console.log(res);
      
      img1.src=res.songs[0].al.picUrl;
      title.innerHTML=res.songs[0].name;
      label[1].querySelectorAll('span')[1].innerHTML=res.songs[0].al.name;//歌手
      label[0].querySelectorAll('span')[1].innerHTML=res.songs[0].ar[0].name;//专辑
      
      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
  
};

//发送请求
ghr.send();

const hhr = new XMLHttpRequest();
//初始化一个get请求
hhr.open('get', 'http://sandyz.ink:3000/lyric?id='+id,true);
//接收返回值
hhr.onreadystatechange = () => {
  if (hhr.readyState === 4) {
    if ((hhr.status >= 200 && hhr.status < 300) || hhr.status == 304) {
      const res = JSON.parse(hhr.responseText);
      console.log(res);
      var rg=/\[\d{2}:\d{2}.\d{3}\]/g;//正则表达式替换时间
      var reg=/\[\d{2}:\d{2}.\d{2}\]/g;//正则表达式替换时间
      var reg1=/\[\d:\d{2}\]/g
      var reg2=/\[\d:\d\]/g
      //这几个正则表达式一起用可以满足大多数情况
      details.innerHTML=res.lrc.lyric.replace(rg,'<br>').replace(reg,'<br>').replace(reg1,'<br>').replace(reg2,'<br>');
      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
};

//发送请求
hhr.send();
console.log(details);
console.log(details.style.height);
var flag=0;
//按钮收起和展开
zk.addEventListener('click',function(){
  if(flag==0){
    big.style.overflow='visible';
    // big.style.height='auto';
    zk.innerHTML='收起';
    flag=1;
  }
  else{
    big.style.overflow='hidden';
    zk.innerHTML='展开';
    flag=0;
  }
})






var audio =document.querySelector('audio');
var pause =document.querySelector('#pause');//暂停
var next =document.querySelector('#next');//下一首
var last =document.querySelector('#last')//上一首
var line =document.querySelector('#line');//播放进度条
var radius =document.querySelector('#radius');//圆点
var time1 =document.querySelector('#time').querySelectorAll('span')[0]//播放时间
var time2 =document.querySelector('#time').querySelectorAll('span')[2];//总时间
var play =document.querySelector('#play');//播放
var button =document.querySelector('#button');//音量键
var volumeline =document.querySelector('#volume-line');//音量进度条
var volume =document.querySelector('#volume');//音量图标
var time;//总时间
var time0=0;//播放时间
var timer;
var flag1=0;
var voice;
var length;
var timer0;
var k=0;
console.log(time1);

const xhr = new XMLHttpRequest();
xhr.open('get', 'http://sandyz.ink:3000/song/url?id='+id,true);
//接收返回值
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      const res = JSON.parse(xhr.responseText);
      console.log(res);
      audio.src=res.data[0].url;

      audio.addEventListener("canplay", function(){//设置监听，点击时获取时长
 
        time=parseInt(audio.duration);
        console.log(time);
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        //秒
        var second = time % 60;
        var seconds = Math.round(second);
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        console.log(minutes+','+seconds);
        time2.innerHTML=minutes+':'+seconds
      })

      play.addEventListener('click',function(){
        audio.play();
       
        play.style.display='none';
        pause.style.display='block';
        clearInterval(timer);
        timer= setInterval(fn,1000);
        
        
        pause.addEventListener('click',function(){
          audio.pause();
          pause.style.display='none';
          play.style.display='block';
          clearInterval(timer);
          clearInterval(timer0);
          
        })
        
        //图片旋转
        
        if(play.style.display=='none'|| pause.style.display=='block'){
          clearInterval(timer0)
          timer0=setInterval(function(){
            img1.style.transform='rotate('+k+'deg)';
            k++;
          },50)
        }
        else if(play.style.display=='block'|| pause.style.display=='none'){
          clearInterval(timer0);
        }
        function fn(){
          //实现进度条的移动
          line.addEventListener('click',function(e){
            radius.style.left=e.clientX-12+'px';
             audio.currentTime=(radius.offsetLeft+12-document.body.offsetWidth*0.25)/line.offsetWidth*time;
             time0=Math.round((radius.offsetLeft+12-document.body.offsetWidth*0.25)/line.offsetWidth*time);
           })
          
               //实现鼠标拖拽
               radius.onmousedown=function(){
                 document.onmousemove=function(e){
                   audio.pause();
                   clearInterval(timer);
                   
                   if(e.pageX>=document.body.offsetWidth*0.25+12&&e.pageX<=document.body.offsetWidth*0.75-12){
                     radius.style.left=e.pageX-12+'px';
                   }
                   audio.currentTime=(radius.offsetLeft+12-document.body.offsetWidth*0.25)/line.offsetWidth*time;
                   time0=Math.round((radius.offsetLeft+12-document.body.offsetWidth*0.25)/line.offsetWidth*time);

               
                 }

               }
        
                    //在鼠标弹起时及时清除函数
                    document.onmouseup =function(){
                      if(play.style.display=='none'|| pause.style.display=='block'){
                      document.onmousemove = null;
                      audio.play();
                      clearInterval(timer);
                      timer=setInterval(fn,1000);
                      
                      play.style.display='none';
                      pause.style.display='block';
                      }
                      
                    }
        
        
           radius.style.left=radius.offsetLeft +Math.round(line.offsetWidth/time) +'px';
          //  if(radius.offsetLeft>=document.body.offsetWidth*0.75-12){
          //    clearInterval(timer);
          //  }
          if(time0==time){
            clearInterval(timer)
            pause.style.display='none';
            play.style.display='block';
            clearInterval(timer0);
            time0--;
            
            

                      //实例化XMLHttpRequest对象
            const xhr = new XMLHttpRequest();
            //初始化一个get请求
            xhr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+ID,true);
            //接收返回值
            xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
              const res = JSON.parse(xhr.responseText);
              console.log(res);
              
              function checkAdult(age) {
               return (
                 age.id ==  id
                 
                 );
               }
               function myFunction() {
                  count = res.playlist.tracks.findIndex(checkAdult);
               }
               myFunction();
               console.log(count);
               if(count==0){
                 location.href="./player.html?"+res.playlist.tracks[res.playlist.tracks.length-1].id+'&'+ID;
               }
               else{
                 location.href="./player.html?"+res.playlist.tracks[count-1].id+'&'+ID;
               }
               
            
              console.log('请求成功');
            } else {
              console.log('请求失败');
            }
            }
            
            };
            
            //发送请求
            xhr.send();
          
                    }

        
           time0++;
           var minute = time0 / 60;
           var minutes = parseInt(minute);
           if (minutes < 10) {
             minutes = "0" + minutes;
           }
           //秒
           var second = time0 % 60;
           var seconds = Math.round(second);
           if (seconds < 10) {
             seconds = "0" + seconds;
           }
           time1.innerHTML=minutes+':'+seconds;
           
        }

      })
      voice=audio.volume;
      length=button.offsetLeft;
      //音量的调控
      //实现进度条的移动
      volumeline.addEventListener('click',function(e){
        button.style.left=e.clientX-2+'px';
         audio.volume=(button.offsetLeft+2-document.body.offsetWidth*0.86)/volumeline.offsetWidth;
         console.log(audio.volume);
          voice=audio.volume;
          length=button.offsetLeft;
       })
      

       //实现鼠标拖拽
       button.onmousedown=function(){
        document.onmousemove=function(e){
          if(e.pageX>=document.body.offsetWidth*0.86+2&&e.pageX<=document.body.offsetWidth*0.86+98){
            button.style.left=e.pageX-2+'px';
          }
          audio.volume=(button.offsetLeft+2-document.body.offsetWidth*0.86)/volumeline.offsetWidth;
          console.log(audio.volume);
          voice=audio.volume;
          length=button.offsetLeft;
        }
      }

      //在鼠标弹起时及时清除函数
      document.onmouseup =function(){
          document.onmousemove = null;
      }
      
      volume.addEventListener('click',function(){
        if(flag1==0)
        {
        button.style.left=document.body.offsetWidth*0.86+'px';
        audio.volume=0;
        flag1=1
        }
        else{
          button.style.left=length+'px';
          audio.volume=voice;
          flag1=0;
        }
        
      })

      console.log('请求成功');
    } else {
      console.log('请求失败');
    }
  }
  
};
xhr.send();


if(id == +location.search.substring(1)){
  next.onclick=function(){
    alert('你所选歌曲不是在歌单中选取，无下一首歌');
  }
  last.onclick=function(){
    alert('你所选歌曲不是在歌单中选取，无上一首歌');
  }
}

//点击下一首，上一首
next.addEventListener('click',function(){

        //实例化XMLHttpRequest对象
     const xhr = new XMLHttpRequest();
     //初始化一个get请求
     xhr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+ID,true);
     //接收返回值
     xhr.onreadystatechange = () => {
       if (xhr.readyState === 4) {
         if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
           const res = JSON.parse(xhr.responseText);
           console.log(res);
           
           function checkAdult(age) {
            return (
              age.id ==  id
              
              );
            }
            function myFunction() {
               count = res.playlist.tracks.findIndex(checkAdult);
            }
            myFunction();
            console.log(count);
            if(count==res.playlist.tracks.length-1){
              location.href="./player.html?"+res.playlist.tracks[0].id+'&'+ID;
            }
            else{
              location.href="./player.html?"+res.playlist.tracks[count+1].id+'&'+ID;
            }
           
    
           console.log('请求成功');
         } else {
           console.log('请求失败');
         }
       }
       
     };
     
    //发送请求
    xhr.send();
})


last.addEventListener('click',function(){

  //实例化XMLHttpRequest对象
const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+ID,true);
//接收返回值
xhr.onreadystatechange = () => {
 if (xhr.readyState === 4) {
   if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
     const res = JSON.parse(xhr.responseText);
     console.log(res);
     
     function checkAdult(age) {
      return (
        age.id ==  id
        
        );
      }
      function myFunction() {
         count = res.playlist.tracks.findIndex(checkAdult);
      }
      myFunction();
      console.log(count);
      if(count==0){
        location.href="./player.html?"+res.playlist.tracks[res.playlist.tracks.length-1].id+'&'+ID;
      }
      else{
        location.href="./player.html?"+res.playlist.tracks[count-1].id+'&'+ID;
      }
      

     console.log('请求成功');
   } else {
     console.log('请求失败');
   }
 }
 
};

//发送请求
xhr.send();
})

// radius.offsetLeft+12==line.offsetWidth+document.body.offsetWidth*0.25

  







