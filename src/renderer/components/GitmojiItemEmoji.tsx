import React from "react";
import { COPY_ANIMATION_DURATION } from "@/constants";
import styled from "styled-components";
import cn from "clsx";
import { bounce } from "@/animations/bounce";
import type { GitmojiItemEmojiProps } from "@types";

export const GitmojiItemEmoji: React.FC<GitmojiItemEmojiProps> = ({
  index,
  emoji,
  isCopying,
  onSelect,
}) => (
  <Container
    onClick={() => onSelect(emoji, index)}
    className={cn({"copying": isCopying})}
  >
    {emoji}
  </Container>
);

const EMOJI_SIZE = 64;

const Container = styled.div`
  font-size: ${Math.floor(EMOJI_SIZE * (7/8))}px;
  height: ${EMOJI_SIZE}px;
  margin: 0 0 12px;
  padding: 0;
  border: 0;

  &.copying {
    animation: ${bounce} ${COPY_ANIMATION_DURATION}ms ease-in-out;
  }
`;
