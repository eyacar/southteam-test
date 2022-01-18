import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Test Pagination", () => {
  test("Should have 3 button of 3 pages", () => {
    const { getAllByRole } = render(
      <Pagination
        data={[1, 2, 3, 4, 5]}
        amountOfData={2}
        page={({ data }) => <div>{data}</div>}
      />
    );
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  test("Should have 1 button and have content", () => {
    const { getByTestId, getAllByRole } = render(
      <Pagination
        data={[1, 2, 3, 4, 5]}
        amountOfData={10}
        page={({ data }) => <div data-testid="Content">{data}</div>}
      />
    );
    const content = getByTestId("Content");
    const buttons = getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(content).toBeInTheDocument();
  });
});
