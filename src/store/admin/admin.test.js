import adminReducer, { addName } from "./index";

describe("counter reducer", () => {
  let actual;

  it("should handle initial state", () => {
    expect(adminReducer(undefined, { type: "unknown" })).toEqual({
      name: null,
    });
  });

  it("should handle add name", () => {
    actual = adminReducer(undefined, addName("Ezequiel"));
    expect(actual.name).toEqual("Ezequiel");
  });
});
