import React from 'react';
import ReactLoading from 'react-loading';

import './loading.scss'

const Loading = ({ type, color }) => {
    return <ReactLoading className="loading" type={type} color={color}
        height={100} width={100}
    />
}

export default Loading;