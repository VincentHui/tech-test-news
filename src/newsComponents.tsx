import React from "react";
import { Source } from "./newsGetter";

interface HeadlineProps {
  newsTitle: string;
  date: string;
  source: string;
  url: string;
}

export const HeadLines: React.FC<HeadlineProps> = (props) => {
  throw Error("not implemented");
};

interface ContentProps {
  isActive: boolean;
}

interface DropDownProps {
  onSourceChanged: (source: Source) => void;
  sources: Source[];
}
export const SourceDropDown: React.FC<DropDownProps> = (props) => {
  throw Error("not implemented");
};
