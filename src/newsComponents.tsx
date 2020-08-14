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
