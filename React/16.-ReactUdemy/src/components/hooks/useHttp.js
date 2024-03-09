import React, { useCallback, useEffect, useState } from 'react'

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData/message || "Something went wrong, failed to send request");
    }

    return resData;
}

function useHttp(url, config, initialData){
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (config && (config.method === "GET" || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);


    const sendRequest = useCallback(async function sendRequest(data){ //We use useCallback() so we can avoid recreating this function evey time and enter in a infinite loop
        setIsLoading(true)
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
        setIsLoading(false)
    }, [url, config]); //if one of these changes, then this funcion will be recreated 

    function clearData(){
        setData(initialData);
    }

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        sendRequest, sendRequest,
        clearData: clearData
    }
}  

export default useHttp;