/*//1th method using useCallback() 
import { useCallback, useState } from 'react'

function useHttp( applyData) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async function(requestConfig){
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {} ,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      }); 

      if (!response.ok) throw new Error('Request failed!');
      const data = await response.json();
      applyData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, [applyData]);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  };
}

export default useHttp; */

//2th method without using useCallback()
import { useCallback, useState } from 'react'

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async function(requestConfig, applyData){
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {} ,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      }); 

      if (!response.ok) throw new Error('Request failed!');
      const data = await response.json();
      applyData(data);

    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, []); //We have an empty dependeny array because all the data it's operating on, is received as parameters in the rapt functions. We've got no external dependencies here.

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  };
}

export default useHttp;