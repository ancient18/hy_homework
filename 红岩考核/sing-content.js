var img1=document.querySelector('.top-content').querySelector('img');//获取歌单封面
var img2=document.querySelector('.Label').querySelector('span').querySelector('img');//获取头像
var name1=document.querySelector('.Label').querySelectorAll('span');//获取昵称

//判断索引号是一位数还是两位数
if(location.search[2]>='0'&&location.search[2]<='9')
{
  var count= (+location.search[1])*10+(+location.search[2]);//获取索引号
  var id= +location.search.substring(4);//获取歌曲id
  console.log(count);
console.log(id);
}
else{
  var count= +location.search[1];//获取索引号
 var id= +location.search.substring(3);//获取歌曲id
 console.log(count);
console.log(id);
}

//获取歌单图像
const dhr = new XMLHttpRequest();
//初始化一个get请求
dhr.open('get', 'http://sandyz.ink:3000/personalized',true);
//接收返回值

dhr.onreadystatechange = () => {
  if (dhr.readyState === 4) {
    if ((dhr.status >= 200 && dhr.status < 300) || dhr.status == 304) {
     const res = JSON.parse(dhr.responseText);
      console.log(res);
      console.log('请求成功');
      img1.src=res.result[count].picUrl;
      
      
    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
dhr.send();

// 获取歌单详情信息
var title =document.querySelector('.right').querySelector('.title');//标题
var label=document.querySelector('.right').querySelector('.label')//标签
var details =document.querySelector('.details').querySelector('p');//简介
var times =document.querySelector('.times');//播放次数
var songlist=document.querySelector('.songlist');//列表歌曲
const ehr = new XMLHttpRequest();
//初始化一个get请求
ehr.open('get', 'http://sandyz.ink:3000/playlist/detail?id='+id,true);
//接收返回值

ehr.onreadystatechange = () => {
  if (ehr.readyState === 4) {
    if ((ehr.status >= 200 && ehr.status < 300) || ehr.status == 304) {
     const res = JSON.parse(ehr.responseText);
      console.log(res);
      console.log('请求成功');
      console.log(res.playlist);
      title.innerHTML=res.playlist.name;//主题
      res.playlist.tags.forEach(element => {
        label.insertAdjacentHTML('beforeend',`<span class="tags">${element}</span>`)//标签
      });
      details.innerHTML=res.playlist.description;//介绍
      times.innerHTML='播放次数：'+res.playlist.playCount;//播放次数
      img2.src=res.playlist.creator.avatarUrl;
      name1[1].innerHTML=res.playlist.creator.nickname;
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
            let tr=document.querySelector('.songlist').querySelectorAll('tr');//获取列表中的行
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
            
            
            tr[i].querySelectorAll('td')[3].innerHTML=minutes+':'+seconds;//时长
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


    

     
      for(let i=0;i<res.playlist.tracks.length;i++){
        tr[i].addEventListener('click',function(e){
          
          
          flag1=this;
          console.log(this.querySelectorAll('td')[2].innerHTML);
          e.stopPropagation();

          //点击后返回歌曲所在歌单的索引号
          function checkAdult(age) {
            return (
              age.name ==  flag1.querySelectorAll('td')[2].innerHTML
              
              );
        }
        function myFunction() {
           count = res.playlist.tracks.findIndex(checkAdult);
        }
        myFunction();
        
        //改变a标签实现跳转到播放页
        tr[i].querySelectorAll('td')[1].querySelector('a').href="./player.html?"+res.playlist.tracks[count].id+'&'+id;

        
        })
      }
      
    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
ehr.send();

//获取评论信息
var hotcoment =document.querySelector('.comment');
var bottomcontent =document.querySelector('.bottom-content')//精彩评论
var newcontent =document.querySelector('.new-comments');


const fhr = new XMLHttpRequest();
//初始化一个get请求
fhr.open('get', 'http://sandyz.ink:3000/comment/playlist?id='+id,true);
//接收返回值

fhr.onreadystatechange = () => {
  if (fhr.readyState === 4) {
    if ((fhr.status >= 200 && fhr.status < 300) || fhr.status == 304) {
     const res = JSON.parse(fhr.responseText);
      console.log(res);
      console.log('请求成功');
      // hotcoment.querySelector('.img').querySelector('img').src=res.hotComments[0].user.avatarUrl;
      // hotcoment.querySelector('.content').innerHTML=res.hotComments[0].user.nickname+'：'+res.hotComments[0].content;
      if(res.hotComments.length===0){
        res.comments.forEach(element => {
          newcontent.insertAdjacentHTML('beforeend',`
          <div class="comment">
          <div class="img">
              <img src="${element.user.avatarUrl}" alt="">
          </div>
          
        <div class="content">
        <span>${element.user.nickname}</span>
        <span>：${element.content}</span>
          </div>
      </div>`)
        });
      }
      
      res.hotComments.forEach(element => {
        bottomcontent.insertAdjacentHTML('beforeend',`
        <div class="comment">
        <div class="img">
            <img src="${element.user.avatarUrl}" alt="">
        </div>
        
        <div class="content">
        <span>${element.user.nickname}</span>
        <span>：${element.content}</span>
        </div>
    </div>`)
    res.comments.forEach(element => {
      newcontent.insertAdjacentHTML('beforeend',`
      <div class="comment">
      <div class="img">
          <img src="${element.user.avatarUrl}" alt="">
      </div>
      
      <div class="content">
      <span>${element.user.nickname}</span>
        <span>：${element.content}</span>
      </div>
  </div>`)
    });
        
      });
      
    } else {
      console.log('请求失败');
    }
  }
};
//发送请求
fhr.send();


