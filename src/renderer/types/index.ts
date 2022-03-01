export enum Semver {
  Major = "major",
  Minor = "minor",
  Patch = "patch",
}

export interface SearchInputProps {
  query: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
}

export interface Gitmoji {
  emoji: string;
  entity: string;
  code: string;
  description: string;
  name: string;
  semver: Semver | null;
}

export interface GitmojisProps {
  gitmojis: Gitmoji[];
  query: string;
  isVisible: boolean;
}

export interface GitmojiItemProps {
  gitmoji: Gitmoji;
  index: number;
  isActive: boolean;
  isVisible: boolean;
  onSelect: (index: number) => void;
}

export interface GitmojiItemCodeProps {
  index: number;
  code: string;
  onSelect: (emoji: string, index: number) => void;
}

export interface GitmojiItemEmojiProps {
  index: number;
  emoji: string;
  isCopying: boolean;
  onSelect: (emoji: string, index: number) => void;
}

