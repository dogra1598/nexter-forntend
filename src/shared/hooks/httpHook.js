import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setShowSpinner(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        );

        if(!response.ok) {
          setError(responseData.message);
        }
        setShowSpinner(false);
        return responseData;
      } catch(err) {
        setError("Network Error.");
        setShowSpinner(false);
        throw err;
      }
    },
    [setShowSpinner, setError]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { showSpinner, error, sendRequest, clearError };
};

export default useHttpClient;
