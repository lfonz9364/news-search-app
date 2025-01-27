import {Dispatch, SetStateAction} from 'react';

type Source = {
  id: string;
  name: string;
};

export type SearchResult = {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type SearchResults = [SearchResult] | [] | null;

export type NewsListProps = {
  searchResults: SearchResults;
};

export type SearchBoxProps = {
  onSearchResultReturned: Dispatch<SetStateAction<SearchResults>>;
  onError: Dispatch<SetStateAction<boolean>>;
};

export type ErrorDialogProps = {
  isVisible: boolean;
  onClose: () => void;
};
