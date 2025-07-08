import {useState} from "react";

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = async (data) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setResponse({
          message: `Your reservation has been made, ${data.firstName}, we can't wait to see you soon!`,
          type: 'success'
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      setResponse({
        message: 'Something went wrong, please try again later!',
        type: 'error'
      });
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
}

export default useSubmit;
