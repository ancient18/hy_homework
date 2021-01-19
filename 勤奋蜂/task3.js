/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

//获取城市名称及空气质量

let cityName = document.getElementById("aqi-city-input");
let quality = document.getElementById("aqi-value-input");
let btn = document.getElementById("add-btn");
let table = document.getElementById('aqi-table');

btn.addEventListener("click", function(){
    var str1 =cityName.value;
    var str2 =quality.value;
    function isLetter(str1,str2) {
    for (var i in str1) {
        var asc = str1.charCodeAt(i);
        if ((asc >= 65 && asc <= 90 ||  asc >= 97 && asc <= 122||asc >= 45 && asc <= 57 )) {
           return false;
        }
         
    }
    for (var i in str2) {
        var asc = str2.charCodeAt(i);
        if ((asc >= 45 && asc <= 57)) {
            flag=1;
        }
        else
        return false ;
    }
    
}
if(isLetter(str1,str2)==false)
{
    alert('请重新输入')
}
else
{
    //添加数据
    addAqiData(cityName.value, quality.value);
    //渲染页面
    renderAqiList(aqiData);
    //删除数据
    table.onclick = e => {
        //判断点击的是否为删除按钮
        if (e.target.nodeName == 'BUTTON') {
            //e.target.parentNode.firstChild.innerText  是父元素的第一个子元素（城市名称）的文本内容
            delBtnHandle(aqiData, e.target.parentNode.firstChild.innerText);

        }
    };
}
})

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData(city, data) {
    aqiData[city] = data;
}

/**
 * 渲染aqi-table表格
 */

function renderAqiList(data) {
    //删除以前的数据
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    //设置表头
    let tr = document.createElement("TR");
    let td1 = document.createElement('TD')
    let td2 = document.createElement('TD')
    let td3 = document.createElement('TD')
    let textNode1 = document.createTextNode("城市");
    let textNode2 = document.createTextNode("空气质量");
    let textNode3 = document.createTextNode("操作");
    td1.appendChild(textNode1);
    tr.appendChild(td1);
    td2.appendChild(textNode2);
    tr.appendChild(td2);
    td3.appendChild(textNode3);
    tr.appendChild(td3);
    table.appendChild(tr);
    flag = 0;

    //遍历aqiData并将城市空气质量添加
    for (let k in data) {
        //下面的代码基本和上面一样
        let tr = document.createElement("TR");
        let td1 = document.createElement('TD')
        let td2 = document.createElement('TD')
        let button = document.createElement('BUTTON')
        let textNode1 = document.createTextNode(k);
        let textNode2 = document.createTextNode(data[k]);
        let textNode3 = document.createTextNode("删除");
        td1.appendChild(textNode1);
        tr.appendChild(td1);
        td2.appendChild(textNode2);
        tr.appendChild(td2);
        button.appendChild(textNode3);
        tr.appendChild(button);
        table.appendChild(tr);
    };

}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(data, delData) {
    for (let k in data) {
        if (k == delData) {
            delete data[k];
        }
    }
    renderAqiList(data);
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();