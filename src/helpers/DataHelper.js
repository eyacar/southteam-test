import { isArray, isEmpty } from "lodash";

export default class DataHelper {
  arrayOfPages;

  #reduceArrayInPages(arr, dataAmount) {
    let cutArray;
    const newArray = Array(arr.length / dataAmount)
      .fill("")
      .map((_, i) => {
        if (!cutArray) {
          cutArray = arr.slice(dataAmount, arr.length);
          return { page: i + 1, data: arr.slice(0, dataAmount) };
        } else {
          let currentarr = cutArray.slice(0, dataAmount);
          cutArray = cutArray.slice(dataAmount, cutArray.length);
          return { page: i + 1, data: currentarr };
        }
      });
    return (this.arrayOfPages = newArray);
  }

  #reduceNotMultipleArray(arr, dataAmount) {
    let newArray;

    const rest = arr.length % dataAmount;

    const multipleArray = arr.slice(0, -rest);

    const pagesArray = this.#reduceArrayInPages(multipleArray, dataAmount);

    newArray = [
      ...pagesArray,
      { page: pagesArray.length + 1, data: arr.slice(-rest) },
    ];

    return (this.arrayOfPages = newArray);
  }

  pagination(data, maxAmount) {
    if (!isArray(data) || isEmpty(data) || !maxAmount) {
      console.warn(
        "You must provide a filled array as a parameter to pagination"
      );
      return (this.arrayOfPages = null);
    }

    const pageAmount = data.length / maxAmount;

    if (pageAmount % 1 === 0) return this.#reduceArrayInPages(data, maxAmount);

    return this.#reduceNotMultipleArray(data, maxAmount);
  }
}
