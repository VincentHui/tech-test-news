import React from "react";
import { render } from "@testing-library/react";
import { GetSources, GetNews } from "./newsGetter";
import { HeadLines, SourceDropDown } from "./newsComponents";
import { rest } from "msw";
import { setupServer } from "msw/node";

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

const server = setupServer(
  rest.get("https://newsapi.org/v2/sources", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: "test-news",
          name: "test News",
        },
      ])
    );
  }),
  rest.get("https://newsapi.org/v2/top-headlines", (req, res, ctx) => {
    return res(ctx.json(NewsFixture));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("get sources", () => {
  expect(GetSources()).resolves.toEqual([
    {
      id: "test-news",
      name: "test News",
    },
  ]);
});

test("get news", () => {
  expect(GetNews()).resolves.toEqual(NewsFixture);
});

test("renders headlines", () => {
  const { getByText } = render(
    <HeadLines
      url="#"
      source="test_source"
      date="2020-08-14T12:37:32.5125702Z"
      newsTitle="test_title"
    />
  );
  const title = getByText(/test_title/i);
  const source = getByText(/test_source/i);
  const date = getByText("5/7/2020");
  expect(title).toBeInTheDocument();
  expect(source).toBeInTheDocument();
  expect(date).toBeInTheDocument();
});

test("source dropdown", () => {
  const { getAllByText } = render(
    <SourceDropDown
      onSourceChanged={() => {}}
      sources={[
        { name: "testItem1", id: "testid1" },
        { name: "testItem2", id: "testid2" },
      ]}
    />
  );
  const items = getAllByText(/testItem/i);
  //including title
  expect(items.length).toEqual(3);
});
