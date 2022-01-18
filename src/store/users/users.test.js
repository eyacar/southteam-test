import usersReducer, { filterByGender, addAmount } from "./index";
import { getUsers } from "./asyncActions";

describe("counter reducer", () => {
  const mockState = {
    userAmount: null,
    data: [
      { gender: "male", name: "Esteban" },
      { gender: "male", name: "Juan" },
      { gender: "female", name: "Maria" },
      { gender: "female", name: "Juana" },
      { gender: "male", name: "Ezequiel" },
      { gender: "female", name: "Mariana" },
    ],
    filterData: null,
    loading: null,
    error: null,
  };

  let actual;

  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual({
      userAmount: null,
      data: null,
      filterData: null,
      loading: null,
      error: null,
    });
  });

  it("should handle filter by gender", () => {
    actual = usersReducer(mockState, filterByGender("male"));
    expect(actual.filterData).toEqual([
      { gender: "male", name: "Esteban" },
      { gender: "male", name: "Juan" },
      { gender: "male", name: "Ezequiel" },
    ]);

    actual = usersReducer(mockState, filterByGender("female"));
    expect(actual.filterData).toEqual([
      { gender: "female", name: "Maria" },
      { gender: "female", name: "Juana" },
      { gender: "female", name: "Mariana" },
    ]);

    expect(actual.data).toEqual([
      { gender: "male", name: "Esteban" },
      { gender: "male", name: "Juan" },
      { gender: "female", name: "Maria" },
      { gender: "female", name: "Juana" },
      { gender: "male", name: "Ezequiel" },
      { gender: "female", name: "Mariana" },
    ]);
  });

  it("should handle add amount", () => {
    actual = usersReducer(undefined, addAmount(50));
    expect(actual.userAmount).toEqual(50);
  });

  it("should handle add amount when you don't add a number", () => {
    actual = usersReducer(undefined, addAmount("50"));
    expect(actual.userAmount).toEqual(null);
  });

  it("should handle async getUsers", () => {
    actual = usersReducer(undefined, getUsers.pending);
    expect(actual.loading).toEqual(true);

    actual = usersReducer(undefined, {
      type: "users/getUsers/fulfilled",
      payload: "data",
    });
    expect(actual.data).toBeTruthy();
    expect(actual.data).toEqual("data");
    expect(actual.loading).toEqual(false);

    actual = usersReducer(undefined, {
      type: "users/getUsers/rejected",
      error: { message: "error" },
    });
    expect(actual.error).toBeTruthy();
    expect(actual.error).toEqual("error");
    expect(actual.loading).toEqual(false);
  });
});
