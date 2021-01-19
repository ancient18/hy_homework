
let box = document.getElementsByTagName("ul")[0];
      //实例化XMLHttpRequest对象
const xhr = new XMLHttpRequest();
//初始化一个get请求
xhr.open('get', 'https://cnodejs.org/api/v1/topics',true);
//接收返回值
xhr.onreadystatechange = () => {
if (xhr.readyState === 4) {
  if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
    const res = JSON.parse(xhr.responseText);
    

    res.data.forEach(element => {
        box.insertAdjacentHTML('beforeEnd',` <div class="s">
        <a class="a"><img src="#" title="${element.author.loginname}"></a>
        <span class="b">
        <span class="f">${element.reply_count}</span>/
        <span class="g">${element.visit_count}</span>
        </span>
        <span class="c">分享</span>
        <span class="d"><a href="https://cnodejs.org/topic/${element.id}">${element.title}</a></span>
        <span class="e">22</span>
      </div>`);
    });
    /*
    res.data.forEach((element,index) => {
      // console.log(element.content);
      box.insertAdjacentHTML('afterBegin',`${element.content}`);
    });
    */
  } else {
    console.log('请求失败');
  }
}
};
//发送请求
xhr.send();
