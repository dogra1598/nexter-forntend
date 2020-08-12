import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState(null);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    (url, method = "GET", body = null, headers = {}) => {
      setShowSpinner(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      })
        .then((response) => response.json())
        .then((responseData) => {
          activeHttpRequest.current = activeHttpRequest.current.filter(
            (reqCtrl) => reqCtrl !== httpAbortCtrl
          );
          if (responseData.error) {
            setError(responseData.message);
          }
          setShowSpinner(false);
        })
        .catch(() => {
          setError("Network Error!");
          setShowSpinner(false);
        });
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { showSpinner, error, sendRequest, clearError };
};

export default useHttpClient;
