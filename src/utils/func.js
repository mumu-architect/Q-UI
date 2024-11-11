
//生成随机字符串
export function generateUniqueString() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return timestamp + '_' + randomNum;
}

//路径替换
export function replacePath(path) {
    return path.replace(/(^\.\/)|(\/)/, '');
}