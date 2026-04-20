export type RootStackParamList = {
  Home: undefined;
  details: { budget?: Budget }; 
  view: { budget: Budget };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}