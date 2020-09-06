
export function tranNum(num, point) {
    let numStr = num ? num.toString() : "0";
    if (numStr.length < 5) {
        return numStr
    } else {
        const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + ' w'
    }
}