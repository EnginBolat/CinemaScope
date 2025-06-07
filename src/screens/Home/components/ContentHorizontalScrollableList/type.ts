import { Popular } from '@models/Popular.ts';

export type Props = {
  title: string;
  contentList: Popular[];
  onPressItem: (item: Popular) => void;
};
