type IAppColors = {
  primary: string;
  primaryDark: string;
  secondary: string;
  secondaryGhost: string;
  white: string;
  white50: string;
  sheetBackground: string;
  red: {
    100: string;
  };
};

export const AppColors: IAppColors = {
  primary: '#212F45',
  primaryDark: '#101621FF',
  secondary: '#E8B610',
  secondaryGhost: '#EDDBB0',
  white: '#ffff',
  white50: 'rgba(255,255,255,0.5)',
  sheetBackground: 'rgba(0,0,0,1)',
  red: {
    100: '#ff002b',
  },
};
