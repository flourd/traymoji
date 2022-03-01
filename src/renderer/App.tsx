import React, { useEffect, useState, useRef } from "react";
import { ipcRenderer } from "electron";
import styled from "styled-components";
import cn from "clsx";
import { Gitmojis, SearchInput, FailedToLoad } from "@/components";
import { WINDOW_ANIMATION_DURATION } from "@/constants";
import { useGitmojis } from "@/hooks";

export function App() {
  const input = useRef<HTMLInputElement>();
  const [query, setQuery] = useState<string>("");

  const [showWindow, setShowWindow] = useState<true | false>(false);
  const [initialLoad, setInitialLoad] = useState<true | false>(true);
  const { gitmojis, reload, error } = useGitmojis();

  const handleShowWindow = (_, message) => {
    setShowWindow((message === "show"));

    if (message === "show" && input.current) {
      input.current.focus();
    }
    return
  };

  useEffect(() => {
    window.addEventListener("showWindow", handleShowWindow);
    return () => window.removeEventListener("showWindow", handleShowWindow);
  }, [handleShowWindow]);

  useEffect(() => {
    if (initialLoad) {
    	setTimeout(() => {
      	  setShowWindow(true);
    	}, WINDOW_ANIMATION_DURATION);
        setInitialLoad(false);
    }
  }, [initialLoad]);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleReload = () => {
    reload();
  };

  return (
    <Container showWindow={showWindow}>
      <SearchInput
        query={query}
        onClear={handleClear}
        onChange={handleSearch}
        ref={input}
      />
      {!error && gitmojis && (
        <Gitmojis
          gitmojis={gitmojis}
          query={query}
          isVisible={showWindow}
        />
      )}
      {error && <FailedToLoad onReload={handleReload} />}
    </Container>
  );
}

const Container = styled.div<{ showWindow: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  opacity: ${({showWindow}) => (showWindow ? 1 : 0)};
  transform: translateY(${({showWindow}) => showWindow ? "0" : "-10"}%);
  transition: all ${WINDOW_ANIMATION_DURATION}ms cubic-bezier(0.42, 0, 0.58, 1);
`;
