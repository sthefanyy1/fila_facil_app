import { IonApp, IonContent, IonPage } from '@ionic/react';
import CreateBusinessAccount from './pages/CreateBusinessAccount';

export default function App() {
  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <CreateBusinessAccount />
        </IonContent>
      </IonPage>
    </IonApp>
  );
}
