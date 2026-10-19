import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp, IonContent, IonIcon, IonPage, setupIonicReact } from '@ionic/react';
import { ellipsisHorizontal } from 'ionicons/icons';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './splash.css';
import logo from './splash-logo.svg';
import colors from './splash-colors.svg';
import LoginScreen from './login-screen';
import SignupScreen from './signup-screen';

setupIonicReact();

function Splash() {
  const [visible, setVisible] = useState(true);
  const [screen, setScreen] = useState<'login' | 'signup'>('login');
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);
  return visible ? <main className="splash-screen" aria-label="FilaFácil">
    <div className="status-bar"><span>9:41</span><IonIcon icon={ellipsisHorizontal} /></div>
    <section className="splash-brand">
      <img className="splash-logo" src={logo} alt="" />
      <h1>FilaFácil</h1>
      <p>Gestão de atendimento<br />para o seu negócio.</p>
    </section>
    <img className="splash-colors" src={colors} alt="" />
  </main> : screen === 'login' ? <LoginScreen onCreateAccount={() => setScreen('signup')} /> : <SignupScreen onBack={() => setScreen('login')} onLogin={() => setScreen('login')} />;
}

createRoot(document.getElementById('root')!).render(<StrictMode><IonApp><IonPage><IonContent fullscreen><Splash /></IonContent></IonPage></IonApp></StrictMode>);
