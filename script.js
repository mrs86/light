// 获取DOM元素
const currentTimeElement = document.getElementById('current-time');
const currentLocationElement = document.getElementById('current-location');
const currentColorElement = document.getElementById('current-color');

// 初始化函数
function init() {
    // 获取当前时间
    updateCurrentTime();
    
    // 获取用户地理位置
    getGeolocation();
    
    // 每秒更新时间和色调
    setInterval(() => {
        updateCurrentTime();
        updateColorByTime();
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
}

// 获取用户地理位置
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                currentLocationElement.textContent = `当前位置: ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
                updateColorByTime();
            },
            error => {
                currentLocationElement.textContent = `获取位置失败: ${error.message}`;
                updateColorByTime();
            }
        );
    } else {
        currentLocationElement.textContent = '您的浏览器不支持地理位置功能';
        updateColorByTime();
    }
}

// 根据当前时间更新色调
function updateColorByTime() {
    const now = new Date();
    const hour = now.getHours();
    let backgroundColor = '';
    let colorName = '';
    
    // 根据小时设置色调
    if (hour >= 5 && hour < 8) {
        // 早上：暗黄色
        backgroundColor = '#F5DEB3';
        colorName = '暗黄色（早上）';
    } else if (hour >= 8 && hour < 17) {
        // 中午：蓝白色
        backgroundColor = '#E6F3FF';
        colorName = '蓝白色（中午）';
    } else if (hour >= 17 && hour < 20) {
        // 傍晚：金黄色
        backgroundColor = '#FFD700';
        colorName = '金黄色（傍晚）';
    } else {
        // 晚上：深黑色
        backgroundColor = '#1A1A1A';
        colorName = '深黑色（晚上）';
    }
    
    // 更新背景颜色
    document.body.style.backgroundColor = backgroundColor;
    
    // 更新颜色信息
    currentColorElement.textContent = `当前色调: ${colorName}`;
}

// 页面加载完成后初始化
window.onload = init;