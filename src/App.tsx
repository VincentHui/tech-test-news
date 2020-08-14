import React, { useState, useEffect } from "react";
import { Source, Article, GetNews, GetSources } from "./newsGetter";

function Widget() {
  const [newsState, setNews] = useState({
    currentPage: 1,
    articles: [] as Article[],
  });
  const [sourceState, setSources] = useState({ sources: [] as Source[] });
  useEffect(() => {
    Promise.all([GetNews(5, 1), GetSources()]).then(([news, sources]) => {
      setNews({ currentPage: 1, articles: news.articles });
      setSources({ sources });
    });
  }, []);
  return <section></section>;
}

export default Widget;
