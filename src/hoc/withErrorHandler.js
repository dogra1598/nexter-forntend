import React, { useState, useEffect } from "react";

import Modal from "../shared/components/UIElements/Modal/Modal";

const withErrorHnadler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    useEffect(() => {
      const reqInterceptor = axios.interceptors.request.use((req) => {
        setError(null);
        return req;
      });
      const resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          setError(error.response.data.message);
        }
      );

      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <React.Fragment>
        <Modal show={error} clicked={errorConfirmedHandler}>
          {error}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHnadler;
