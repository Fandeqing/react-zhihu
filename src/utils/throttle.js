
const throttle = (fn, wait) => {
    let timer = null;

    return function () {
        if (!timer) {
            fn.call(this, arguments)
            timer = setTimeout(() => {
                // fn.call(this, arguments)
                timer = null;
            }, wait);
        }
    }
}

export default throttle;