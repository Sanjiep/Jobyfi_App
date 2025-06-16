import axios from 'axios';
import { useState, useEffect } from 'react';

// const rapidApiKey = process.env.RAPID_API_KEY;
const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            'x-rapidapi-key': '3ae0af2099msh08e35b589ec0cb8p1c8c56jsndce37b0960ea',
            'x-rapidapi-host': 'jsearch.p.rapidapi.com'
        },
    };

    const fetchData = async () => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
        } catch (err) {
            setError(err);
            alert('There was an error fetching data');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;