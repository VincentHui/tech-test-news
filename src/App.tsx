import React, { useState, useEffect } from "react";
import { Source, Article, GetNews, GetSources } from "./newsGetter";
import { SourceDropDown, HeadLines } from "./newsComponents";
import styled from "styled-components";

const defaultSource = { id: "", name: "All Sources" };

const WidgetSection = styled.section`
  background-color: rgba(240, 240, 240, 1);
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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

  const showMore = () => {
    const newPage = newsState.currentPage + 1;
    GetNews(5, newPage, focused.source.id).then((data) => {
      setNews({
        currentPage: newPage,
        articles: newsState.articles.concat(data.articles),
      });
    });
  };

  return (
    <WidgetSection>
      <TopRow>
        <h1>News</h1>
        <SourceDropDown
          sources={[defaultSource].concat(sourceState.sources)}
          onSourceChanged={changeSource}
        />
      </TopRow>
      {newsState.articles.map((article) => (
        <HeadLines
          url={article.url}
          key={article.title}
          date={article.publishedAt}
          source={article.source.name}
          newsTitle={article.title}
        />
      ))}

      <button onClick={showMore}>SHOW MORE</button>
    </WidgetSection>
  );
}

export default Widget;
