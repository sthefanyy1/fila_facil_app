import { useState } from 'react';
import { IonApp, IonContent, IonPage } from '@ionic/react';
import Splash from './pages/Splash';
import LoginEstabelecimento from './pages/LoginEstabelecimento';
import CriarContaEstabelecimento from './pages/CriarContaEstabelecimento';
import DadosEstabelecimento from './pages/DadosEstabelecimento';
import ContaCriada from './pages/ContaCriada';
import RecuperarSenha from './pages/RecuperarSenha';
import HomeEstabelecimento from './pages/HomeEstabelecimento';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'login' | 'signup' | 'data' | 'created' | 'recover' | 'home'>('splash');
  return <IonApp><IonPage><IonContent fullscreen>{screen === 'splash' ? <Splash onComplete={() => setScreen('login')} /> : screen === 'login' ? <LoginEstabelecimento onCreateAccount={() => setScreen('signup')} onForgotPassword={() => setScreen('recover')} onLogin={() => setScreen('home')} /> : screen === 'signup' ? <CriarContaEstabelecimento onBack={() => setScreen('login')} onLogin={() => setScreen('login')} onContinue={() => setScreen('data')} /> : screen === 'data' ? <DadosEstabelecimento onBack={() => setScreen('signup')} onCreated={() => setScreen('created')} /> : screen === 'created' ? <ContaCriada onLogin={() => setScreen('login')} /> : screen === 'recover' ? <RecuperarSenha onBack={() => setScreen('login')} onLogin={() => setScreen('login')} /> : <HomeEstabelecimento />}</IonContent></IonPage></IonApp>;
}
