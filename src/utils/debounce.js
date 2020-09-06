
export const debounce = (fn, wait) => {
    let timer = null;
    return function () {
        if (timer !== null)
            clearTimeout(timer)
        timer = setTimeout(fn, wait)
    }
}