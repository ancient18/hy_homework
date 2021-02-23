var search=document.querySelector('.search').querySelector('input');//获取搜索框
var Sosuo=document.querySelector('.search');//获取搜索框所在盒子
var flag1;//接受this的值
var flag=0;
var x=flag;
function sosuo(){
    // 当搜索框内容变化时，删除之前添加的元素节点，重新渲染
    if(x===flag){

    }
    else{
        Sosuo.removeChild(Sosuo.children[2])
        x=flag;
    }

    // 发送ajax
    var  chr= new XMLHttpRequest();
    chr.open('get','http://sandyz.ink:3000/search?keywords='+search.value,true);
    chr.onreadystatechange=()=>{
    if(chr.readyState===4){
        if((chr.status>=200&&chr.status<300)||chr.status===304){
            const res=JSON.parse(chr.responseText)
            console.log(res);
            console.log('请求成功');
         //添加元素节点    
            Sosuo.insertAdjacentHTML('beforeend',`<div class="xiao1"></div>`);
            var xiao1=Sosuo.querySelector('.xiao1');
        // 遍历数组，渲染下拉表格
            res.result.songs.forEach(element => {
                xiao1.insertAdjacentHTML('beforeend',` <div class="xiala">${element.name},${element.artists[0].name}</div>`)
            });


      var xiala=document.querySelector('.xiao1').querySelectorAll('.xiala');
      console.log(xiala);
      for(var i=0;i<res.result.songs.length;i++){
        xiala[i].addEventListener('click',function(e){
          flag1=this;
          console.log(this);
          e.stopPropagation();
          function checkAdult(age) {
            return (
              age.name+','+age.artists[0].name ==  flag1.innerHTML
              );
        }
        function myFunction() {
           count = res.result.songs.findIndex(checkAdult);
        }
        myFunction();
        console.log(count);
        location.href="./player.html?"+res.result.songs[count].id;
        })
      }

            flag++;
        }
        else{
            console.log('请求失败');
        }
    }
}
chr.send();
}

//点击获取焦点
search.onfocus= function (){
    // 当搜索框内容变化时，删除之前添加的元素节点，重新渲染
    if(x===flag){

    }
    else{
        Sosuo.removeChild(Sosuo.children[2])
        x=flag;
    }

    if(search.value==''){
        const xhr = new XMLHttpRequest();
        //初始化一个get请求
        xhr.open('get', 'http://sandyz.ink:3000/search/hot/detail',true);
        //接收返回值
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
              const res = JSON.parse(xhr.responseText);
              console.log(res);

                //添加元素节点    
            Sosuo.insertAdjacentHTML('beforeend',`<div class="xiao1"></div>`);
            var xiao1=Sosuo.querySelector('.xiao1');
        // 遍历数组，渲染下拉表格
            res.data.forEach(element => {
                xiao1.insertAdjacentHTML('beforeend',` <div class="xiala">${element.searchWord}</div>`)
            });


           var xiala=document.querySelector('.xiao1').querySelectorAll('.xiala');
      console.log(xiala);
      for(var i=0;i<res.data.length;i++){
        xiala[i].addEventListener('click',function(e){
          flag1=this
          console.log(this);
          e.stopPropagation();
          function checkAdult(age) {
            return (
              age.searchWord ==  flag1.innerHTML
              );
        }
        function myFunction() {
           count = res.data.findIndex(checkAdult);
        }
        myFunction();
        console.log(count);
        search.value=res.data[count].searchWord;
        sosuo();
        })
      }

            flag++;

              console.log('请求成功');
            } else {
              console.log('请求失败');
            }
          }
          
        };
        
        //发送请求
        xhr.send();


    }

}



