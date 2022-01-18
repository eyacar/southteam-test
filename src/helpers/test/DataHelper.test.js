import DataHelper from "../DataHelper";

describe("Array of pages test", () => {
  let helper;

  beforeAll(() => {
    helper = new DataHelper();
  });

  it("Should return null because is an empty array or is not an array the first parameter", () => {
    helper.pagination([], 5);
    expect(helper.arrayOfPages).toEqual(null);
    helper.pagination("1,2,3,4,5", 5);
    expect(helper.arrayOfPages).toEqual(null);
    helper.pagination(555, 5);
    expect(helper.arrayOfPages).toEqual(null);
  });

  it("Should return null because there is no amount as second parameter", () => {
    helper.pagination([1, 2, 3, 4, 5]);
    expect(helper.arrayOfPages).toEqual(null);
  });

  it("Should return an array of pages", () => {
    helper.pagination([1, 2, 3, 4, 5], 2);
    expect(helper.arrayOfPages).toEqual([
      { page: 1, data: [1, 2] },
      { page: 2, data: [3, 4] },
      { page: 3, data: [5] },
    ]);

    helper.pagination([1, 2, 3, 4], 2);
    expect(helper.arrayOfPages).toEqual([
      { page: 1, data: [1, 2] },
      { page: 2, data: [3, 4] },
    ]);
  });
});
