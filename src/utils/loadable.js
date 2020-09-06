import Loadable from 'react-loadable';

import Loading from '@/components/loading/Loading'


export default (loader, loading = Loading) => {
    return Loadable({
        loader,
        loading
    })
}
