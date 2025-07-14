import {useState} from "react";

const useSubmit = (parentComponent) => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (data) => {
    setLoading(true);
    setResponse(null); // Clear previous response
    try {
      console.log("useSubmit pre:", data.firstName);
      setTimeout(() => {
        setResponse({
          message: `Your ${parentComponent}, ${data.firstName}, we can't wait to see you soon!`,
          type: 'success'
        });
        setLoading(false);
      }, 2000);
      console.log("useSubmit post:", data.firstName);
    } catch (error) {
      setResponse({
        message: 'Something went wrong, please try again later!',
        type: 'error'
      });
      setLoading(false);
    }
  };

  const reset = () => {
    setResponse(null);
    setLoading(false);
  };

  return { isLoading, response, submit, reset };
}

export default useSubmit;
