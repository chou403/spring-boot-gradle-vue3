import {computeDateType} from "@/enum";

/**
 * 时间格式化
 * */
export function dateFormat (timestamp: number|string|Date, format = 'YYYY-MM-DD hh:mm:ss'): string {
    const date = new Date(timestamp)
    function fixedTwo (value: number): string {
        return value < 10 ? '0' + value : String(value)
    }
    let showTime = format
    if (showTime.includes('SSS')) {
        const S = date.getMilliseconds()
        showTime = showTime.replace('SSS', '0'.repeat(3 - String(S).length) + S)
    }
    if (showTime.includes('YY')) {
        const Y = date.getFullYear()
        showTime = showTime.includes('YYYY') ? showTime.replace('YYYY', String(Y)) : showTime.replace('YY', String(Y).slice(2, 4))
    }
    if (showTime.includes('M')) {
        const M = date.getMonth() + 1
        showTime = showTime.includes('MM') ? showTime.replace('MM', fixedTwo(M)) : showTime.replace('M', String(M))
    }
    if (showTime.includes('D')) {
        const D = date.getDate()
        showTime = showTime.includes('DD') ? showTime.replace('DD', fixedTwo(D)) : showTime.replace('D', String(D))
    }
    if (showTime.includes('h')) {
        const h = date.getHours()
        showTime = showTime.includes('hh') ? showTime.replace('hh', fixedTwo(h)) : showTime.replace('h', String(h))
    }
    if (showTime.includes('m')) {
        const m = date.getMinutes()
        showTime = showTime.includes('mm') ? showTime.replace('mm', fixedTwo(m)) : showTime.replace('m', String(m))
    }
    if (showTime.includes('s')) {
        const s = date.getSeconds()
        showTime = showTime.includes('ss') ? showTime.replace('ss', fixedTwo(s)) : showTime.replace('s', String(s))
    }
    return showTime
}

/**
 * 时间加减
 * */
export function computeDate(num:number, type:computeDateType, timestamp:number|string|Date=new Date()):Date|string{
    const date = new Date(timestamp)
    switch (type) {
        case computeDateType.year:
            return dateFormat(date.setFullYear(date.getFullYear()+num));
        case computeDateType.month:
            return dateFormat(date.setMonth(date.getMonth()+num));
        case computeDateType.day:
            return dateFormat(date.setDate(date.getDate()+num));
        case computeDateType.hour:
            return dateFormat(date.setHours(date.getHours()+num));
        case computeDateType.minute:
            return dateFormat(date.setMinutes(date.getMinutes()+num));
        case computeDateType.second:
            return dateFormat(date.setSeconds(date.getSeconds()+num));
    }
}

/**
 * hex转rgb
 * */
export function hexToRgb(str:any) {
    let hxs = str.replace("#", "").match(/../g)
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    return hxs
}

/**
 * rgb转hex
 * */
export function rgbToHex(a:number, b:number, c:number) {
    let hexes = [a.toString(16), b.toString(16), c.toString(16)]
    for (let i = 0; i < 3; i++) {
        if (hexes[i].length == 1) hexes[i] = `0${hexes[i]}`
    }
    return `#${hexes.join("")}`
}

/**
 * 加深颜色值
 * */
export function darken(color:string, level:number) {
    let rgba = hexToRgb(color)
    for (let i = 0; i < 3; i++) rgba[i] = Math.floor(rgba[i] * (1 - level))
    return rgbToHex(rgba[0], rgba[1], rgba[2])
}

/**
 * 变浅颜色值
 * */
export function lighten(color:string, level:number) {
    let rgba = hexToRgb(color)
    for (let i = 0; i < 3; i++)
        rgba[i] = Math.floor((255 - rgba[i]) * level + rgba[i])
    return rgbToHex(rgba[0], rgba[1], rgba[2])
}

/**
 * class设置
 * */
export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
    const targetEl = target || document.body;
    let { className } = targetEl;
    className = className.replace(clsName, "").trim();
    targetEl.className = flag ? `${className} ${clsName} ` : className;
}

/**
 * 获取父级数组
 * */
export function getCascadeParent(list:Array<any>=[],parentId:string,parentName:string="parentId",idName:string='id') {
    for (const i in list) {
        if(list[i][idName]==parentId){
            return [list[i][idName]]
        }
        if (list[i].children) {
            let node:any = getCascadeParent(list[i].children, parentId,parentName,idName)
            if (node !== undefined) {
                node.unshift(list[i][idName])
                return node
            }
        }
    }
}

/**
 * 打开外部链接
 * */
export function openLink(src:string) {
    if(!src){return;}
    window.open(src);
}

/**
 * 时间问候语
 * @param param 当前时间，new Date() 格式
 * @description param 调用 `formatAxis(new Date())` 输出 `上午好`
 * @returns 返回拼接后的时间字符串
 */
export function formatGreet(param: Date): string {
    let hour: number = new Date(param).getHours();
    if (hour < 6) return '凌晨好';
    else if (hour < 9) return '早上好';
    else if (hour < 12) return '上午好';
    else if (hour < 14) return '中午好';
    else if (hour < 17) return '下午好';
    else if (hour < 19) return '傍晚好';
    else if (hour < 22) return '晚上好';
    else return '夜里好';
}

/**
 * @description 驼峰转下划线
 * @param {string} str 转化目标字符串
 * @returns {string}
 * */
export function toSnakeCase(str:string):string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}















