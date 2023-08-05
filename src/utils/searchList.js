export function searchListOfObjects(objectsList, searchField, searchValue) {
    for (let obj of objectsList) {
      if (searchField in obj && obj[searchField] === searchValue) {
        return obj;
      }
    }
    return null;
}