export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
  
    const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
        // eslint-disable-next-line prefer-destructuring
        itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }
  
    return result;
};
  
export const generateItems = (count, creator) => {
    const result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
        result.push(creator(i));
    }
    return result;
};