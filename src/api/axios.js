import axios from './zhihu'

export function getJson(url, data) {
    let param = '';
    if (data) {
        let datas = [];
        for (const key in data) {
            datas.push(`${key}=${data[key]}`);
        }
        if (datas.length > 0) {
            param = '?' + datas.join('&');
        }
    }
    return axios.get(url + param).then(res => {
        if (res.data.code === "1") {
            return res.data.data
        }
        throw new Error(res.statusText);
    })
}

export function putJson(url, data) {
    return axios(url, {
        method: "put",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    }).then(res => {
        if (res.data.code === "1") {
            return res.data;
        }
        throw new Error(res.statusText)
    })
}
