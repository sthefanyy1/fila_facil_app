import { useState } from 'react';
import { IonApp, IonContent, IonPage } from '@ionic/react';
import Splash from './pages/Splash';
import LoginEstabelecimento from './pages/LoginEstabelecimento';
import CriarContaEstabelecimento from './pages/CriarContaEstabelecimento';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'signup'>('splash');
  return <IonApp><IonPage><IonContent fullscreen>{screen === 'splash' ? <Splash onComplete={() => setScreen('login')} /> : screen === 'login' ? <LoginEstabelecimento onCreateAccount={() => setScreen('signup')} /> : <CriarContaEstabelecimento onBack={() => setScreen('login')} onLogin={() => setScreen('login')} />}</IonContent></IonPage></IonApp>;
}
