import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
// import PrivateRoute from "./components/PrivateRoute";


setupIonicReact();

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Profile from './pages/Profile';
import GeziPlani from './pages/GeziPlani';
// import Navbar from "./components/Navbar";

const App: React.FC = () => (
<IonApp>
  <IonReactRouter>
    {/* <Navbar /> */}
    <IonRouterOutlet>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/geziplani" component={GeziPlani} />
      <Route exact path="/profile" component={Profile} />
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default App;

