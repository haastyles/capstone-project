import {useState} from "react";

const useCount = () => {

  const [items, setItems] = useState(0);
  const [ itemCounts, setItemCounts ] = useState(
    {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0
    }
  );
  
  const increment = (i) => {
    setItems(items + 1);
    setItemCounts(
      (prevState) => ({
        ...prevState,
        [i]: prevState[i] += 0.5,
      })
    );
  };

  const decrement = (i) => {
    if (items > 0 && itemCounts[i] > 0) {
      setItems(items - 1);
      setItemCounts(
        (prevState) => ({
          ...prevState,
          [i]: prevState[i] -= 0.5,
        })
      );
    }
  };

  return { items, itemCounts, increment, decrement };
}

export default useCount;
