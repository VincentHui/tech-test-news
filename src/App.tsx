import React, { useState, useEffect } from "react";
import { Source, Article, GetNews, GetSources } from "./newsGetter";
import { SourceDropDown } from "./newsComponents";
const defaultSource = { id: "", name: "All Sources" };

function Widget() {
  const [newsState, setNews] = useState({
    currentPage: 1,
    articles: [] as Article[],
  });
  const [sourceState, setSources] = useState({ sources: [] as Source[] });
  const [focused, setFocusedSource] = useState({ source: defaultSource });
  useEffect(() => {
    Promise.all([GetNews(5, 1), GetSources()]).then(([news, sources]) => {
      setNews({ currentPage: 1, articles: news.articles });
      setSources({ sources });
    });
  }, []);

  const changeSource = (source: Source) => {
    GetNews(5, 1, source.id).then((data) => {
      setNews({ currentPage: 1, articles: data.articles });
      setFocusedSource({ source });
    });
  };

  return (
    <section>
      <div>
        <h1>News</h1>
        <SourceDropDown
          sources={[defaultSource].concat(sourceState.sources)}
          onSourceChanged={changeSource}
        />
      </div>
      <button>SHOW MORE</button>
    </section>
  );
}

export default Widget;
