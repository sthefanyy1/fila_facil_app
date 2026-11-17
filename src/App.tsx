import { useState } from 'react';
import { IonApp, IonContent, IonPage } from '@ionic/react';
import Splash from './pages/Splash';
import LoginEstabelecimento from './pages/LoginEstabelecimento';
import CriarContaEstabelecimento from './pages/CriarContaEstabelecimento';
import DadosEstabelecimento from './pages/DadosEstabelecimento';
import ContaCriada from './pages/ContaCriada';
import RecuperarSenha from './pages/RecuperarSenha';
import HomeEstabelecimento from './pages/HomeEstabelecimento';
import FilaEstabelecimento from './pages/FilaEstabelecimento';
import HistoricoEstabelecimento from './pages/HistoricoEstabelecimento';
import ConfiguracoesEstabelecimento from './pages/ConfiguracoesEstabelecimento';
import ServicosEstabelecimento from './pages/ServicosEstabelecimento';
import FuncionariosEstabelecimento from './pages/FuncionariosEstabelecimento';
import NotificacoesEstabelecimento from './pages/NotificacoesEstabelecimento';

type Screen = 'splash' | 'login' | 'signup' | 'data' | 'created' | 'recover' | 'home' | 'queue' | 'history' | 'settings' | 'services' | 'employees' | 'notifications';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const goHome = () => setScreen('home');
  return <IonApp><IonPage><IonContent fullscreen>{screen === 'splash' ? <Splash onComplete={() => setScreen('login')} /> : screen === 'login' ? <LoginEstabelecimento onCreateAccount={() => setScreen('signup')} onForgotPassword={() => setScreen('recover')} onLogin={goHome} /> : screen === 'signup' ? <CriarContaEstabelecimento onBack={() => setScreen('login')} onLogin={() => setScreen('login')} onContinue={() => setScreen('data')} /> : screen === 'data' ? <DadosEstabelecimento onBack={() => setScreen('signup')} onCreated={() => setScreen('created')} /> : screen === 'created' ? <ContaCriada onLogin={() => setScreen('login')} /> : screen === 'recover' ? <RecuperarSenha onBack={() => setScreen('login')} onLogin={() => setScreen('login')} /> : screen === 'home' ? <HomeEstabelecimento onQueue={() => setScreen('queue')} onHistory={() => setScreen('history')} onSettings={() => setScreen('settings')} onNotifications={() => setScreen('notifications')} /> : screen === 'queue' ? <FilaEstabelecimento onBack={goHome} /> : screen === 'history' ? <HistoricoEstabelecimento onBack={goHome} /> : screen === 'settings' ? <ConfiguracoesEstabelecimento onBack={goHome} onServices={() => setScreen('services')} onEmployees={() => setScreen('employees')} onNotifications={() => setScreen('notifications')} /> : screen === 'services' ? <ServicosEstabelecimento onBack={() => setScreen('settings')} /> : screen === 'employees' ? <FuncionariosEstabelecimento onBack={() => setScreen('settings')} /> : <NotificacoesEstabelecimento onBack={goHome} />}</IonContent></IonPage></IonApp>;
}
