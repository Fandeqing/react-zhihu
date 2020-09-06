
const extractUrlValue = (key, url) => {
    if (typeof (url) === 'undefined')
        url = window.location.href;
    var match = url.match('[?&]' + key + '=([^&]+)');
    return match ? match[1] : null;
}


export default extractUrlValue;