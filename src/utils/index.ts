import {computeDateType} from "@/utils/types";

/** 时间格式化 */
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

/** 时间加减 */
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

/** hex转rgb */
export function hexToRgb(str:any) {
    let hxs = str.replace("#", "").match(/../g)
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    return hxs
}

/** rgb转hex */
export function rgbToHex(a:number, b:number, c:number) {
    let hexes = [a.toString(16), b.toString(16), c.toString(16)]
    for (let i = 0; i < 3; i++) {
        if (hexes[i].length == 1) hexes[i] = `0${hexes[i]}`
    }
    return `#${hexes.join("")}`
}

/** 加深颜色值 */
export function darken(color:string, level:number) {
    let rgba = hexToRgb(color)
    for (let i = 0; i < 3; i++) rgba[i] = Math.floor(rgba[i] * (1 - level))
    return rgbToHex(rgba[0], rgba[1], rgba[2])
}

/** 变浅颜色值 */
export function lighten(color:string, level:number) {
    let rgba = hexToRgb(color)
    for (let i = 0; i < 3; i++)
        rgba[i] = Math.floor((255 - rgba[i]) * level + rgba[i])
    return rgbToHex(rgba[0], rgba[1], rgba[2])
}

/** class设置 */
export function toggleClass(flag: boolean, clsName: string, target?: HTMLElement) {
    const targetEl = target || document.body;
    let { className } = targetEl;
    className = className.replace(clsName, "").trim();
    targetEl.className = flag ? `${className} ${clsName} ` : className;
}

/** 数组层级格式化 */
export function formatCascade(arr:Array<any>=[],parentName:string="parentId",idName:string='id'):any {
    return arr.map((item)=>{
        if(item[parentName]){
            let index=arr.findIndex(p=>p[idName]==item[parentName])
            if(index>=0){
                if(arr[index].children){
                    arr[index].children.push(item)
                }else{
                    arr[index].children=[item]
                }
            }else{
                return item
            }
        }else{
            return item
        }
    }).filter(p=>p)
}

/** 获取父级数组 */
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

















