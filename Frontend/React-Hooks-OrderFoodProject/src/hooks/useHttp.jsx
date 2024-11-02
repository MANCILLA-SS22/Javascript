import { useCallback, useEffect, useState } from 'react'

async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) throw new Error(resData.message || "Something went wrong, failed to send request");
    return resData;
}

function useHttp(url, requestConfig, initialData){
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const sendRequest = useCallback(async function(data){ //We use useCallback() so we can avoid recreating this function evey time and enter in a infinite loop
        console.log("2");
        setIsLoading(false);
        try {
            const resData = await sendHttpRequest(url, {...requestConfig, body: data});
            setData(resData);
            setIsLoading(false);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
        setIsLoading(true);
    }, [url, requestConfig]); //if one of these changes, then this funcion will be recreated 

    function clearData(){
        setData(initialData);
    }

    useEffect(() => { 
        console.log("1")
        if (requestConfig && (requestConfig.method === "GET" || !requestConfig.method) || !requestConfig) sendRequest();
    }, [sendRequest, requestConfig]);

    return { data, error, isLoading, sendRequest, clearData }
}  

export default useHttp;

//Using useEffect when fetching data from a backend prevent us from entering into an inifinite loop whenever the state is rendered. For instence, if we don't use useEffect then the state will be mounted 
//and updated once we've fetched the data. Take into account that the state is updated when triggering the second parameter in useState array. That's why we say we'll enter into an infinite loop. So, to
//solve this we'll use useEffect. This hook will allow us to rendder the component, then run the useEffect hook in which the state will be updated as long as one of the parameters in the array of
//dependencies changes.