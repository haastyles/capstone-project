import {useState} from "react";

const useCount = (details) => {
  const itemDefault = {
      1: {
        count: 0,
        item: {}
      },
      2: {
        count: 0,
        item: {}
      },
      3: {
        count: 0,
        item: {}
      },
      4: {
        count: 0,
        item: {}
      },
      5: {
        count: 0,
        item: {}
      },
      6: {
        count: 0,
        item: {}
      },
      7: {
        count: 0,
        item: {}
      },
      8: {
        count: 0,
        item: {}
      },
      9: {
        count: 0,
        item: {}
      },
      10: {
        count: 0,
        item: {}
      },
      11: {
        count: 0,
        item: {}
      },
      12: {
        count: 0,
        item: {}
      },
      13: {
        count: 0,
        item: {}
      },
      14: {
        count: 0,
        item: {}
      },
      15: {
        count: 0,
        item: {}
      },
      16: {
        count: 0,
        item: {}
      },
      17: {
        count: 0,
        item: {}
      }
  }; 
  const [items, setItems] = useState(0);
  const [ itemCounts, setItemCounts ] = useState(itemDefault);

  const increment = (i) => {
    setItems(items + 1);
    setItemCounts(
      (prevState) => ({
        ...prevState,
        [i]: {
          count: prevState[i].count += 0.5,
          item: details[i-1]
        }
      })
    );
  };

  const decrement = (i) => {
    if (items > 0 && itemCounts[i].count > 0) {
      setItems(items - 1);
      setItemCounts(
        (prevState) => ({
          ...prevState,
          [i]: {
            count: prevState[i].count -= 0.5,
            item: itemCounts[i].count > 0 ? details[i-1] : {}
          }
        })
      );
    }
  };

  const reset = () => {
    setItems(0);
    setItemCounts(itemDefault);
  };

  return { items, itemCounts, increment, decrement, reset };
}

export default useCount;