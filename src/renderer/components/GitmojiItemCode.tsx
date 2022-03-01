import React from "react";
import styled from "styled-components";
import cn from "clsx";
import { GitmojiItemCodeProps } from "@types";

export const GitmojiItemCode: React.FC<GitmojiItemCodeProps> = ({
  index,
  code,
  onSelect,
}) => <Container onClick={() => onSelect(code, index)}>{code}</Container>;

const Container = styled.p`
  font-weight: 500;
  font-size: ${((code.length-1)*16) > 128 ? '12' : '16'}px;
  font-weight: bold;
  margin: 0 0 8px;
  padding: 0;
  color: #fff;
  word-break: none;
  overflow-x: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
