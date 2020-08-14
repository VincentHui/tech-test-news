import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { GetSources, GetNews } from "./newsGetter";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

const NewsFixture = {
  totalResults: 10,
  articles: [
    {
      title: "testTitle",
      url: "testUrl",
      publishedAt: "2020-08-14T12:37:32.5125702Z",
      source: { name: "testSourceName" },
    },
  ],
};

test("get sources", () => {
  expect(GetSources()).resolves.toEqual([
    {
      id: "abc-news",
      name: "ABC News",
    },
  ]);
});

test("get news", () => {
  expect(GetNews()).resolves.toEqual(NewsFixture);
});
