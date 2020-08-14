import React from "react";
import { Source } from "./newsGetter";

interface HeadlineProps {
  newsTitle: string;
  date: string;
  source: string;
  url: string;
}

export const HeadLines: React.FC<HeadlineProps> = (props) => (
  <div>
    <div>
      <a href={props.url}>{props.newsTitle}</a>
    </div>
    <div>
      <div>{props.date}</div>
      <div>{props.source}</div>
    </div>
  </div>
);

interface ContentProps {
  isHidden: boolean;
}

interface DropDownProps {
  onSourceChanged: (source: Source) => void;
  sources: Source[];
}
export const SourceDropDown: React.FC<DropDownProps> = (props) => {
  throw Error("not implemented");
};
