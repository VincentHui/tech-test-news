export interface Article {
  source: { name: string };
  title: string;
  url: string;
  publishedAt: string;
}

export interface NewsData {
  articles: Article[];
  totalResults: number;
}

export interface Source {
  id: string;
  name: string;
}
const headlinesURL = "https://newsapi.org/v2/top-headlines";
const apiKey = `b80f9d4a774344a3927c51efb69eb7d0`;
export const GetNews = async (
  pageSize: number = 5,
  page: number = 1,
  source: string = ""
): Promise<NewsData> =>
  fetch(
    `${headlinesURL}?language=en&sources=${source}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => data);

const sourceURL = "https://newsapi.org/v2/sources";
export const GetSources = async (): Promise<Source[]> => {
  throw Error("not implemented");
};
