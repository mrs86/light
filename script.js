// 获取DOM元素
const currentTimeElement = document.getElementById('current-time');
const currentColorElement = document.getElementById('current-color');
const backgroundLayer1 = document.getElementById('background-layer-1');
const backgroundLayer2 = document.getElementById('background-layer-2');

// 记录当前可见的背景层
let currentVisibleLayer = 1;

// 记录当前时辰
let currentChineseHour = '';

// 初始化函数
function init() {
    // 获取当前时间
    updateCurrentTime();
    
    // 立即更新背景图片（默认风景）
    updateColorByTime();
    
    // 每秒更新时间，检查时辰变化
    setInterval(() => {
        updateCurrentTime();
    }, 1000);
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    currentTimeElement.textContent = `当前时间: ${timeString}`;
    
    // 检查时辰是否变化
    checkHourChange();
}

// 检查时辰是否变化
function checkHourChange() {
    const now = new Date();
    const hour = now.getHours();
    let newChineseHour = '';
    
    // 根据小时计算对应的中国12时辰
    for (let i = 0; i < chineseHours.length; i++) {
        const h = chineseHours[i];
        if (h.start <= h.end) {
            // 正常时间段（如7-9点）
            if (hour >= h.start && hour < h.end) {
                newChineseHour = h.name;
                break;
            }
        } else {
            // 跨午夜的时间段（如23-1点）
            if (hour >= h.start || hour < h.end) {
                newChineseHour = h.name;
                break;
            }
        }
    }
    
    // 如果时辰发生变化，更新背景和时辰信息
    if (newChineseHour !== currentChineseHour) {
        currentChineseHour = newChineseHour;
        updateColorByTime();
    }
}

// 中国12时辰映射
const chineseHours = [
    { name: '子时', start: 23, end: 1, description: '夜半' },
    { name: '丑时', start: 1, end: 3, description: '鸡鸣' },
    { name: '寅时', start: 3, end: 5, description: '平旦' },
    { name: '卯时', start: 5, end: 7, description: '日出' },
    { name: '辰时', start: 7, end: 9, description: '食时' },
    { name: '巳时', start: 9, end: 11, description: '隅中' },
    { name: '午时', start: 11, end: 13, description: '日中' },
    { name: '未时', start: 13, end: 15, description: '日昳' },
    { name: '申时', start: 15, end: 17, description: '哺时' },
    { name: '酉时', start: 17, end: 19, description: '日入' },
    { name: '戌时', start: 19, end: 21, description: '黄昏' },
    { name: '亥时', start: 21, end: 23, description: '人定' }
];

// 不同时辰的背景渐变色
const landscapeImages = {
    子时: [
        "linear-gradient(135deg, #0a0a2a 0%, #1a1a4a 100%)", // 深夜星空
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // 深夜山脉
        "linear-gradient(135deg, #0f3460 0%, #16213e 100%)"  // 深夜河流
    ],
    丑时: [
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // 凌晨山脉
        "linear-gradient(135deg, #16213e 0%, #0f3460 100%)", // 凌晨河流
        "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)"  // 凌晨村庄
    ],
    寅时: [
        "linear-gradient(135deg, #16213e 0%, #f1c40f 100%)", // 黎明曙光
        "linear-gradient(135deg, #f1c40f 0%, #e67e22 100%)", // 日出东方
        "linear-gradient(135deg, #e67e22 0%, #16213e 100%)"  // 黎明村庄
    ],
    卯时: [
        "linear-gradient(135deg, #f1c40f 0%, #e67e22 100%)", // 日出东方
        "linear-gradient(135deg, #e67e22 0%, #3498db 100%)", // 清晨天空
        "linear-gradient(135deg, #3498db 0%, #f1c40f 100%)"  // 清晨花园
    ],
    辰时: [
        "linear-gradient(135deg, #3498db 0%, #2ecc71 100%)", // 上午阳光
        "linear-gradient(135deg, #2ecc71 0%, #3498db 100%)", // 上午花园
        "linear-gradient(135deg, #3498db 0%, #9b59b6 100%)"  // 上午村庄
    ],
    巳时: [
        "linear-gradient(135deg, #3498db 0%, #9b59b6 100%)", // 上午村庄
        "linear-gradient(135deg, #9b59b6 0%, #3498db 100%)", // 上午山脉
        "linear-gradient(135deg, #3498db 0%, #2ecc71 100%)"  // 上午河流
    ],
    午时: [
        "linear-gradient(135deg, #3498db 0%, #ffffff 100%)", // 正午阳光
        "linear-gradient(135deg, #ffffff 0%, #3498db 100%)", // 正午天空
        "linear-gradient(135deg, #3498db 0%, #2ecc71 100%)"  // 正午花园
    ],
    未时: [
        "linear-gradient(135deg, #3498db 0%, #2ecc71 100%)", // 午后花园
        "linear-gradient(135deg, #2ecc71 0%, #3498db 100%)", // 午后山脉
        "linear-gradient(135deg, #3498db 0%, #9b59b6 100%)"  // 午后河流
    ],
    申时: [
        "linear-gradient(135deg, #3498db 0%, #9b59b6 100%)", // 下午河流
        "linear-gradient(135deg, #9b59b6 0%, #e67e22 100%)", // 下午日落
        "linear-gradient(135deg, #e67e22 0%, #3498db 100%)"  // 下午村庄
    ],
    酉时: [
        "linear-gradient(135deg, #e67e22 0%, #9b59b6 100%)", // 日落西方
        "linear-gradient(135deg, #9b59b6 0%, #e67e22 100%)", // 黄昏天空
        "linear-gradient(135deg, #e67e22 0%, #f1c40f 100%)"  // 黄昏村庄
    ],
    戌时: [
        "linear-gradient(135deg, #e67e22 0%, #f1c40f 100%)", // 黄昏村庄
        "linear-gradient(135deg, #f1c40f 0%, #16213e 100%)", // 夜晚降临
        "linear-gradient(135deg, #16213e 0%, #e67e22 100%)"  // 夜晚灯光
    ],
    亥时: [
        "linear-gradient(135deg, #16213e 0%, #0f3460 100%)", // 夜晚河流
        "linear-gradient(135deg, #0f3460 0%, #16213e 100%)", // 夜晚山脉
        "linear-gradient(135deg, #16213e 0%, #0a0a2a 100%)"  // 深夜星空
    ]
};

// 根据当前时间更新背景图片
function updateColorByTime() {
    const now = new Date();
    const hour = now.getHours();
    let chineseHour = '';
    let hourDescription = '';
    
    // 根据小时计算对应的中国12时辰
    for (let i = 0; i < chineseHours.length; i++) {
        const h = chineseHours[i];
        if (h.start <= h.end) {
            // 正常时间段（如7-9点）
            if (hour >= h.start && hour < h.end) {
                chineseHour = h.name;
                hourDescription = h.description;
                break;
            }
        } else {
            // 跨午夜的时间段（如23-1点）
            if (hour >= h.start || hour < h.end) {
                chineseHour = h.name;
                hourDescription = h.description;
                break;
            }
        }
    }
    
    // 更新当前时辰
    currentChineseHour = chineseHour;
    
    // 随机选择一个当前时辰的渐变背景
    const gradients = landscapeImages[chineseHour];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    
    // 应用渐变背景到对应层
    if (currentVisibleLayer === 1) {
        // 当前可见的是层1，将新渐变设置到层2
        backgroundLayer2.style.backgroundImage = randomGradient;
        
        // 开始过渡：层2淡入，层1淡出
        backgroundLayer2.style.opacity = '1';
        backgroundLayer1.style.opacity = '0';
        
        // 更新当前可见层
        currentVisibleLayer = 2;
    } else {
        // 当前可见的是层2，将新渐变设置到层1
        backgroundLayer1.style.backgroundImage = randomGradient;
        
        // 开始过渡：层1淡入，层2淡出
        backgroundLayer1.style.opacity = '1';
        backgroundLayer2.style.opacity = '0';
        
        // 更新当前可见层
        currentVisibleLayer = 1;
    }
    
    // 更新时辰信息
    currentColorElement.textContent = `当前时辰: ${chineseHour}（${hourDescription}）`;
}

// 由于使用CSS渐变，不再需要图片加载相关函数

// 页面加载完成后初始化
window.onload = init;