export interface ItemList {
  title: string;
  list: string[];
}

export interface ConfigStepProps {
  setItemListIdentifier: (index: number) => void;
  itemListIdentifier: number;
  UpdatePlayerNumber: (count: number) => void;
}

export interface RevealStepProps {
  UpdatePlayerNumber: (count: number | null) => void;
  playerCount: number;
  listIdentifier: number;
}

export type FormState = 0 | 1; // 0 = show reveal button, 1 = show item
