import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Home } from '../screens/Home';
import { BudgetDetails } from '../screens/BudgetDetails';
import { BudgetDetailsView } from '../screens/BudgetDetailsView';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="details" component={BudgetDetails} />
      <Screen name="view" component={BudgetDetailsView} />
    </Navigator>
  );
}