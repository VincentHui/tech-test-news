import React, { useState } from "react";
import { Source } from "./newsGetter";
import styled from "styled-components";

interface HeadlineProps {
  newsTitle: string;
  date: string;
  source: string;
  url: string;
}
const HeadlineRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Item = styled.div`
  margin-right: 20px;
  font-size: small;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  font-size: medium;
`;

const Title = styled.h3`
  margin-bottom: 10px;
  margin-top: 0px;
`;
const HeadlineWrapper = styled.div`
  margin-bottom: 15px;
  margin-top: 15px;
`;
export const HeadLines: React.FC<HeadlineProps> = (props) => {
  const dateObj = new Date(props.date);
  return (
    <HeadlineWrapper>
      <Title>
        <Link href={props.url}>{props.newsTitle}</Link>
      </Title>
      <HeadlineRow>
        <Item>{`${dateObj.getDay()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`}</Item>
        <Item>{props.source}</Item>
      </HeadlineRow>
    </HeadlineWrapper>
  );
};

interface ContentProps {
  isHidden: boolean;
}
const DropDownContent = styled.ul<ContentProps>`
  display: ${(props) => (!props.isHidden ? "block" : "none")};
  position: absolute;
  list-style: none;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 200px;
  max-height: 400px;
  padding: 10px;
  margin: 0;
  overflow-y: scroll;
  cursor: pointer;
  background-color: rgba(240, 240, 240, 1);
`;
const DropDownTitle = styled.div`
  width: 200px;
  padding: 10px;
  border: 3px solid rgba(50, 50, 50, 1);
  background-color: rgba(240, 240, 240, 1);
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
      <DropDownTitle
        onClick={() =>
          setDropState({ ...dropState, focused: !dropState.focused })
        }
        onBlur={() => setDropState({ ...dropState, focused: false })}
      >
        {dropState.focusedSource.name}
      </DropDownTitle>
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
