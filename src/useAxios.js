import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://61004cc6bca46600171cf84a.mockapi.io/api-crud/v1';

const useAxios = ({method, url, headers = null, body = null}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const request = () => {
            axios[method](url ,/*JSON.parse(headers),*/ JSON.parse(body))
                .then((res) => {
                    setResponse(res.data);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setloading(false);
                });
        };
        request();
    }, [method, url, headers, body]);

    return { response, error, loading };
};

export default useAxios;