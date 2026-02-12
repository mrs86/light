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

// 不同时辰的背景渐变色（根据日照变化）
const landscapeImages = {
    子时: [
        "linear-gradient(135deg, #0a0a2a 0%, #1a1a4a 100%)", // 深夜：深蓝黑色
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // 深夜：深紫色
        "linear-gradient(135deg, #0f3460 0%, #16213e 100%)"  // 深夜：藏青色
    ],
    丑时: [
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", // 凌晨：深紫色
        "linear-gradient(135deg, #16213e 0%, #0f3460 100%)", // 凌晨：藏青色
        "linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)"  // 凌晨：深蓝色
    ],
    寅时: [
        "linear-gradient(135deg, #16213e 0%, #4a6fa5 100%)", // 黎明：深蓝色到淡蓝色
        "linear-gradient(135deg, #4a6fa5 0%, #6b9ac4 100%)", // 黎明：淡蓝色到天蓝色
        "linear-gradient(135deg, #6b9ac4 0%, #4a6fa5 100%)"  // 黎明：天蓝色到淡蓝色
    ],
    卯时: [
        "linear-gradient(135deg, #6b9ac4 0%, #91c8e4 100%)", // 日出：天蓝色到浅蓝色
        "linear-gradient(135deg, #91c8e4 0%, #a7d8f4 100%)", // 日出：浅蓝色到淡蓝色
        "linear-gradient(135deg, #a7d8f4 0%, #91c8e4 100%)"  // 日出：淡蓝色到浅蓝色
    ],
    辰时: [
        "linear-gradient(135deg, #91c8e4 0%, #c9e6f6 100%)", // 上午：浅蓝色到亮蓝色
        "linear-gradient(135deg, #c9e6f6 0%, #e6f3f8 100%)", // 上午：亮蓝色到淡蓝色
        "linear-gradient(135deg, #e6f3f8 0%, #c9e6f6 100%)"  // 上午：淡蓝色到亮蓝色
    ],
    巳时: [
        "linear-gradient(135deg, #c9e6f6 0%, #ffffff 100%)", // 上午：亮蓝色到白色
        "linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)", // 上午：白色到淡蓝色
        "linear-gradient(135deg, #f0f8ff 0%, #c9e6f6 100%)"  // 上午：淡蓝色到亮蓝色
    ],
    午时: [
        "linear-gradient(135deg, #ffffff 0%, #fffff0 100%)", // 正午：白色到亮黄色
        "linear-gradient(135deg, #fffff0 0%, #ffffff 100%)", // 正午：亮黄色到白色
        "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"  // 正午：白色到淡灰色
    ],
    未时: [
        "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)", // 午后：白色到淡灰色
        "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", // 午后：淡灰色到灰色
        "linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%)"  // 午后：灰色到淡灰色
    ],
    申时: [
        "linear-gradient(135deg, #e9ecef 0%, #f3d7ca 100%)", // 下午：灰色到淡橙色
        "linear-gradient(135deg, #f3d7ca 0%, #f8c4b4 100%)", // 下午：淡橙色到浅红色
        "linear-gradient(135deg, #f8c4b4 0%, #f3d7ca 100%)"  // 下午：浅红色到淡橙色
    ],
    酉时: [
        "linear-gradient(135deg, #f8c4b4 0%, #f9a87a 100%)", // 黄昏：浅红色到橙色
        "linear-gradient(135deg, #f9a87a 0%, #f57c00 100%)", // 黄昏：橙色到深橙色
        "linear-gradient(135deg, #f57c00 0%, #f9a87a 100%)"  // 黄昏：深橙色到橙色
    ],
    戌时: [
        "linear-gradient(135deg, #f57c00 0%, #d84315 100%)", // 傍晚：深橙色到深红色
        "linear-gradient(135deg, #d84315 0%, #4e342e 100%)", // 傍晚：深红色到深棕色
        "linear-gradient(135deg, #4e342e 0%, #f57c00 100%)"  // 傍晚：深棕色到深橙色
    ],
    亥时: [
        "linear-gradient(135deg, #4e342e 0%, #3e2723 100%)", // 夜晚：深棕色到深褐色
        "linear-gradient(135deg, #3e2723 0%, #263238 100%)", // 夜晚：深褐色到深灰色
        "linear-gradient(135deg, #263238 0%, #4e342e 100%)"  // 夜晚：深灰色到深棕色
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

// 涟漪效果功能
function initRippleEffect() {
    const rippleContainer = document.getElementById('ripple-container');
    let currentWaterWaves = [];
    let lastRippleTime = 0;
    const rippleInterval = 100; // 涟漪产生的时间间隔（毫秒）
    
    // 鼠标移动事件 - 蜻蜓点水效果（打水漂）
    document.addEventListener('mousemove', function(e) {
        // 检查时间间隔，控制涟漪产生频率
        const now = Date.now();
        if (now - lastRippleTime > rippleInterval) {
            // 创建多个涟漪元素，形成层次感
            for (let i = 1; i <= 3; i++) {
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                ripple.classList.add(`ripple-${i}`);
                
                // 设置涟漪位置和大小
                const size = 50;
                ripple.style.width = `${size}px`;
                ripple.style.height = `${size}px`;
                ripple.style.left = `${e.clientX - size / 2}px`;
                ripple.style.top = `${e.clientY - size / 2}px`;
                
                // 添加到容器
                rippleContainer.appendChild(ripple);
                
                // 动画结束后移除
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }
            
            // 更新上次产生涟漪的时间
            lastRippleTime = now;
        }
    });
    
    // 鼠标按下事件 - 水波效果
    document.addEventListener('mousedown', function(e) {
        // 如果已经存在水波，先移除
        if (currentWaterWaves.length > 0) {
            currentWaterWaves.forEach(wave => wave.remove());
            currentWaterWaves = [];
        }
        
        // 创建多个水波元素，形成层次感
        for (let i = 1; i <= 3; i++) {
            const waterWave = document.createElement('div');
            waterWave.classList.add('water-wave');
            waterWave.classList.add(`water-wave-${i}`);
            
            // 设置水波位置和大小
            const size = 100;
            waterWave.style.width = `${size}px`;
            waterWave.style.height = `${size}px`;
            waterWave.style.left = `${e.clientX - size / 2}px`;
            waterWave.style.top = `${e.clientY - size / 2}px`;
            
            // 添加到容器
            rippleContainer.appendChild(waterWave);
            currentWaterWaves.push(waterWave);
        }
        
        // 鼠标释放事件 - 停止水波
        document.addEventListener('mouseup', function stopWave() {
            currentWaterWaves.forEach(wave => wave.remove());
            currentWaterWaves = [];
            document.removeEventListener('mouseup', stopWave);
        });
    });
}

// 页面加载完成后初始化
window.onload = function() {
    init();
    initRippleEffect();
};