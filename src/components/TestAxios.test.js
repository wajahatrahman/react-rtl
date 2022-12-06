import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import TestAxios from "./TestAxios";
import { mockAxiosAdapter } from "../mocks/mock-utils";

describe("TestSuite-Axios", () => {
  let mock;

  beforeEach(() => {
    mock = mockAxiosAdapter();
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should display a loading text", () => {
      const { getByTestId } = render(<TestAxios />);
      expect(getByTestId("loading")).toHaveTextContent("Loading...");
    });

    it("should load and display the data", async () => {
      const { getByTestId } = render(<TestAxios url={""} />);

      fireEvent.click(getByTestId("fetch-data"));
      const greetingData = await waitFor(() => getByTestId("show-data"));
      expect(mock.history.get[0].url).toEqual(`/greeting`);
      expect(greetingData).toHaveTextContent("hello there");
    });
  });
});
