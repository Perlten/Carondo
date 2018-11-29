import { createAppContainer, createStackNavigator} from 'react-navigation';
import Search from "./screens/Search"
import Results from "./screens/Results"
import CarView from "./screens/CarView"
import WebView from "./screens/WebView"

// you can also import from @react-navigation/native

const AppNavigator = createStackNavigator({
Search: Search,
Results: Results,
CarView: CarView,
WebView: WebView,

});

const AppContainer = createAppContainer(AppNavigator);

// Now AppContainer is the main component for React to render

export default AppContainer;