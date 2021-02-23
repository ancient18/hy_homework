//当前插图编号
let currentIndex=-1;
//自动翻转定时器
let bannerTimer=null;
let links=[
{image:'./img1.jpg',target:'#1'},
{image:'./img2.jpg',target:'#2'},
{image:'./img3.jpg',target:'#3'},
{image:'./img4.jpg',target:'#4'},
{image:'./img5.jpg',target:'#5'},
{image:'./img6.jpg',target:'#6'},
{image:'./img7.jpg',target:'#7'},
{image:'./img8.jpg',target:'#8'},
]
let banner =document.getElementById('banner')
let bannerBG =document.getElementById('bg');
let bannerPicture =document.getElementById('picture');
let bannerLink =document.getElementById('link');
let bannerSelect =document.getElementById('select');
let bannerBTLeft =document.getElementById('bt-left');
let bannerBTRight =document.getElementById('bt-right');
let bannerImage =document.getElementById('image');



// 选择
        // index 为编号 从0开始
        let  select = (index) => {
            // 停止自动播放
            banner_stop();
            // 转数字
            index = Number(index);
            // 越界超过 最大数量 links越界，直接返回
            if (index >= links.length) {
                return;
            }
            // 选中当前已选中的的直接返回
            if (currentIndex == index) {
                return;
            }
            // 取消当前的指示点选中状态
            if (currentIndex > -1) {
                bannerSelect.children[currentIndex].classList.remove('checked');
            }
            // 变更当前轮播图编号
            currentIndex = index;
            // 找到当前元素
            currentLink = links[currentIndex];
            // 背景变化
            bannerBG.style.backgroundImage = 'url(' + currentLink.image + ')';
            // 前景变化
            bannerImage.setAttribute('src', currentLink.image);
            // 链接变化
            bannerLink.setAttribute('href', currentLink.target);
            // 增加新的指示点选中状态
            bannerSelect.children[currentIndex].classList.add('checked');
        }


// 选择（自动）
// index 为编号 从0到links.length - 1
let auto_select = (index) => {
    // 转数字
    index = Number(index);
    // 越界超过 最大数量 links越界，直接返回
    if (index >= links.length) {
        return;
    }
    // 选中当前已选中的的直接返回
    if (currentIndex == index) {
        return;
    }
    // 取消当前的指示点选中状态
    bannerSelect.children[currentIndex].classList.remove('checked');
    // 变更当前轮播图编号
    currentIndex = index;
    // 找到当前元素
    currentLink = links[currentIndex];
    // 前景图片，第一步调整过度时间为1s
    bannerImage.style.transition = 'opacity 0.5s ease-in 0s';
    // 前景图片，第二步调整不透明度到0.2
    bannerImage.style.opacity = 0.2;
    // 第三步延迟变换img图片，并重新定义透明度以及过度时间和过渡方式
    setTimeout(() => {
        // 背景变化
        bannerBG.style.backgroundImage = 'url(' + currentLink.image + ')';
        // 前景变化
        bannerImage.setAttribute('src', currentLink.image);
        // 链接变化
        bannerLink.setAttribute('href', currentLink.target);
        // 不透明度变化
        bannerImage.style.transition = 'opacity 0.5s ease-out 0s';
        bannerImage.style.opacity = 1;
        
        // 增加新的指示点选中状态
        // 如果已经通过手动点击了选中则此处不再执行
        if (!document.querySelector('.banner .checked')) {
            bannerSelect.children[currentIndex].style.transition = 'background-color .5s';
            bannerSelect.children[currentIndex].classList.add('checked');
        }
    }, 500);
}
/* ******************
*  自动翻转播放与停止
* ******************/
// 播放
let banner_play = () => {
    // 3000 执行1次，这里与右翻逻辑一致
    bannerTimer = setInterval(() => {
        // 获取新的index
        let index = currentIndex + 1;
        // 右翻越界等于最左侧元素
        if (index >= links.length) {
            index = 0;
        }
        // 加载新图片（这里选择自动，增加切换效果）
        auto_select(index);
    }, 3000);
}
// 停止
let banner_stop = () => {
    if (bannerTimer) {
        clearInterval(bannerTimer);
        bannerTimer = null;
    }
}
/* ******************
*  页面初始化方法
* ******************/
let init = () => {
            // 动态生成选择指示点
            for (let index = 0; index < links.length; index++) {
                // 创建A元素
                let item = document.createElement('a');
                // 修改属性
                item.setAttribute('class', 'item');
                item.setAttribute('href', '#');
                item.setAttribute('data-index', index);
                // 追加元素
                bannerSelect.appendChild(item);
            }
            // 选择第一个元素显示
            select(0);
            // 绑定事件
            bind();
            // 自动翻转播放
            banner_play();
        }
        /* ******************
         * 事件绑定方法
         * ******************/
        let bind = () => {
            // 左翻页事件监听
            bannerBTLeft.addEventListener('click', () => {
                // 获取新的index
                let index = currentIndex - 1;
                // 左翻越界等于最右元素
                if (index < 0) {
                    index = links.length - 1;
                }
                // 加载新图片
                select(index);
            });
            // 右翻页事件监听
            bannerBTRight.addEventListener('click', () => {
                // 获取新的index
                let index = currentIndex + 1;
                // 右翻越界等于最左侧元素
                if (index >= links.length) {
                    index = 0;
                }
                // 加载新图片
                select(index);
            });
            // 绑定select选择指示点的点击事件
            for (const key in bannerSelect.children) {
                if (bannerSelect.children.hasOwnProperty(key)) {
                    const element = bannerSelect.children[key];
                    element.addEventListener('click', function (e) {
                        // 取消点击跳转
                        e.preventDefault();
                        // 跳转到当前指示点中data-index所指定的图片
                        select(e.target.dataset.index);
                    });
                }
            }
            // 绑定鼠标移入事件
            banner.addEventListener('mouseover', (e) => {
                // 防止鼠标从子元素移出时触发
                if (e.relatedTarget && banner.compareDocumentPosition(e.relatedTarget) == 10) {
                    banner_stop();
                }
            });
            // 绑定鼠标移出事件
            banner.addEventListener('mouseout', (e) => {
                // 防止鼠标从子元素移出时触发
                if (e.relatedTarget && banner.compareDocumentPosition(e.relatedTarget) == 10) {
                    banner_play();
                }
            });
            // 绑定鼠标移动事件
            banner.addEventListener('mousemove', (e) => {
                banner_stop();
            });
        }
        /* ******************
         *  页面加载
         * ******************/
        // 页面加载完毕
        window.addEventListener('load', () => {
            // 初始化方法
            init();
        });

