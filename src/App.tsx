import React, { useState } from "react";
import { Source, Article } from "./newsGetter";

function Widget() {
  const [newsState, setNews] = useState({
    currentPage: 1,
    articles: [] as Article[],
  });
  const [sourceState, setSources] = useState({ sources: [] as Source[] });
  return <section></section>;
}

export default Widget;
