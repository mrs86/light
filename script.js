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

// 不同时辰的中国古风图片（每个时辰6张）
const landscapeImages = {
    子时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20landscape%2C%20moon%20and%20stars%2C%20traditional%20architecture%2C%20ink%20painting%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20midnight%20scene%2C%20silent%20village%2C%20lanterns%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20mountain%20temple%2C%20moonlight%2C%20zen%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20palace%2C%20lanterns%2C%20traditional%20architecture%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20garden%2C%20moonlight%2C%20bamboo%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20river%2C%20boat%2C%20lanterns%2C%20ink%20painting&image_size=landscape_16_9"
    ],
    丑时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20early%20morning%20before%20dawn%2C%20dark%20sky%2C%20village%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20to%20dawn%2C%20mountains%2C%20mist%2C%20ink%20painting%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20pre-dawn%20scene%2C%20river%2C%20fishing%20boat%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20early%20morning%20mountain%20path%2C%20mist%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20pre-dawn%20village%2C%20lanterns%20fading%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20dawn%20approaching%2C%20mountains%2C%20silhouette%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    寅时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20dawn%20landscape%2C%20first%20light%2C%20mountains%2C%20mist%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunrise%20beginning%2C%20village%2C%20smoke%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20dawn%20river%2C%20golden%20light%2C%20fishing%20boats%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20dawn%20mountain%20temple%2C%20first%20light%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunrise%20village%2C%20morning%20mist%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20dawn%20forest%2C%20sunlight%20through%20trees%2C%20ink%20painting&image_size=landscape_16_9"
    ],
    卯时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunrise%20landscape%2C%20mountains%2C%20mist%2C%20traditional%20architecture%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20village%2C%20sunrise%2C%20smoke%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunrise%20river%2C%20golden%20hues%2C%20fishing%20boats%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20palace%2C%20sunrise%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20garden%2C%20sunlight%2C%20flowers%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunrise%20mountain%20path%2C%20traveler%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    辰时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20landscape%2C%20sunlight%2C%20mountains%2C%20village%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20market%2C%20busy%2C%20traditional%20architecture%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20garden%2C%20sunlight%2C%20flowers%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20river%2C%20boats%2C%20sunlight%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20scholar%20reading%2C%20garden%2C%20sunlight%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20farming%20scene%2C%20fields%2C%20peasants%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    巳时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20mid-morning%20landscape%2C%20sunlight%2C%20mountains%2C%20river%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20scholar%20in%20morning%20garden%2C%20traditional%20style%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20morning%20mountain%20path%2C%20traveler%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20mid-morning%20palace%2C%20sunlight%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20mid-morning%20garden%2C%20bamboo%2C%20sunlight%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20mid-morning%20river%2C%20fishing%20boats%2C%20mountains%2C%20ink%20painting&image_size=landscape_16_9"
    ],
    午时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20landscape%2C%20bright%20sun%2C%20mountains%2C%20river%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20palace%20court%2C%20sunlight%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20village%2C%20quiet%2C%20sunlight%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20garden%2C%20sunlight%2C%20pavilion%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20mountain%20temple%2C%20bright%20sun%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20noon%20river%2C%20bright%20sun%2C%20boats%2C%20ink%20painting&image_size=landscape_16_9"
    ],
    未时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20landscape%2C%20sunlight%2C%20mountains%2C%20bamboo%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20tea%20garden%2C%20scholars%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20river%2C%20boats%2C%20mountains%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20palace%2C%20sunlight%2C%20gardens%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20scholar%20writing%2C%20pavilion%2C%20sunlight%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20farming%20scene%2C%20fields%2C%20peasants%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    申时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20late%20afternoon%20landscape%2C%20sun%20lowering%2C%20mountains%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20market%20closing%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20afternoon%20farming%20scene%2C%20fields%2C%20peasants%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20late%20afternoon%20river%2C%20sun%20lowering%2C%20boats%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20late%20afternoon%20garden%2C%20sun%20lowering%2C%20pavilion%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20late%20afternoon%20mountain%20path%2C%20traveler%20returning%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    酉时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20landscape%2C%20mountains%2C%20river%2C%20golden%20light%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20village%2C%20smoke%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20mountain%20temple%2C%20golden%20light%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20palace%2C%20golden%20light%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20garden%2C%20golden%20light%2C%20pavilion%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20sunset%20river%2C%20golden%20hues%2C%20fishing%20boats%2C%20ink%20painting&image_size=landscape_16_9"
    ],
    戌时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20landscape%2C%20dusk%2C%20mountains%2C%20village%20lights%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20palace%2C%20lanterns%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20garden%2C%20moonlight%2C%20lanterns%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20river%2C%20lanterns%2C%20boats%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20market%2C%20lanterns%2C%20busy%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20evening%20scholar%20reading%2C%20lantern%20light%2C%20traditional%20style&image_size=landscape_16_9"
    ],
    亥时: [
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20landscape%2C%20moon%20and%20stars%2C%20village%20lights%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20palace%2C%20lanterns%2C%20traditional%20architecture&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20study%2C%20scholar%20reading%2C%20lantern%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20garden%2C%20moonlight%2C%20bamboo%2C%20pavilion%2C%20traditional%20style&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20mountain%20temple%2C%20moonlight%2C%20zen%2C%20ink%20painting&image_size=landscape_16_9",
        "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20ancient%20night%20river%2C%20moonlight%2C%20boat%2C%20traditional%20style&image_size=landscape_16_9"
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
    
    // 随机选择一张当前时辰的图片
    const images = landscapeImages[chineseHour];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    
    // 预加载图片，确保图片加载完成后再开始过渡
    const img = new Image();
    img.src = randomImage;
    
    img.onload = function() {
        // 图片加载完成后开始过渡
        if (currentVisibleLayer === 1) {
            // 当前可见的是层1，将新图片设置到层2
            backgroundLayer2.style.backgroundImage = `url('${randomImage}')`;
            backgroundLayer2.style.backgroundSize = 'cover';
            backgroundLayer2.style.backgroundPosition = 'center';
            backgroundLayer2.style.backgroundRepeat = 'no-repeat';
            
            // 开始过渡：层2淡入，层1淡出
            backgroundLayer2.style.opacity = '1';
            backgroundLayer1.style.opacity = '0';
            
            // 更新当前可见层
            currentVisibleLayer = 2;
        } else {
            // 当前可见的是层2，将新图片设置到层1
            backgroundLayer1.style.backgroundImage = `url('${randomImage}')`;
            backgroundLayer1.style.backgroundSize = 'cover';
            backgroundLayer1.style.backgroundPosition = 'center';
            backgroundLayer1.style.backgroundRepeat = 'no-repeat';
            
            // 开始过渡：层1淡入，层2淡出
            backgroundLayer1.style.opacity = '1';
            backgroundLayer2.style.opacity = '0';
            
            // 更新当前可见层
            currentVisibleLayer = 1;
        }
    };
    
    // 图片加载失败时的备用方案
    img.onerror = function() {
        // 即使图片加载失败，也继续执行过渡，避免卡住
        if (currentVisibleLayer === 1) {
            currentVisibleLayer = 2;
        } else {
            currentVisibleLayer = 1;
        }
    };
    
    // 更新时辰信息
    currentColorElement.textContent = `当前时辰: ${chineseHour}（${hourDescription}）`;
}

// 页面加载完成后初始化
window.onload = init;