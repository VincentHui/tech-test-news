import React, { useState } from "react";
import { Source } from "./newsGetter";
import styled from "styled-components";

interface HeadlineProps {
  newsTitle: string;
  date: string;
  source: string;
  url: string;
}

export const HeadLines: React.FC<HeadlineProps> = (props) => {
  const dateObj = new Date(props.date);
  return (
    <div>
      <div>
        <a href={props.url}>{props.newsTitle}</a>
      </div>
      <div>
        <div>{`${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`}</div>
        <div>{props.source}</div>
      </div>
    </div>
  );
};

interface ContentProps {
  isHidden: boolean;
}
const DropDownContent = styled.ul<ContentProps>`
  display: ${(props) => (!props.isHidden ? "block" : "none")};
`;
interface DropDownProps {
  onSourceChanged: (source: Source) => void;
  sources: Source[];
}
export const SourceDropDown: React.FC<DropDownProps> = (props) => {
  const [dropState, setDropState] = useState({
    focused: false,
    focusedSource: props.sources[0],
  });
  return (
    <div>
      <div
        onClick={() =>
          setDropState({ ...dropState, focused: !dropState.focused })
        }
        onBlur={() => setDropState({ ...dropState, focused: false })}
      >
        {dropState.focusedSource.name}
      </div>
      <DropDownContent isHidden={!dropState.focused}>
        {props.sources.map((source, i) => (
          <li
            onClick={() => {
              setDropState({
                ...dropState,
                focused: false,
                focusedSource: source,
              });
              props.onSourceChanged(source);
            }}
            key={i}
          >
            {source.name}
          </li>
        ))}
      </DropDownContent>
    </div>
  );
};
