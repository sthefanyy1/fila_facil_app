import { useEffect } from 'react';
import logo from './splash-logo.svg';
import colors from './splash-colors.svg';
import './splash.css';

export default function Splash({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const timer = window.setTimeout(onComplete, 1800); return () => window.clearTimeout(timer); }, [onComplete]);
  return <main className="splash-screen" aria-label="FilaFácil"><div className="status-bar"><span>9:41</span><span>● ● ●</span></div><section className="splash-brand"><img className="splash-logo" src={logo} alt="" /><h1>FilaFácil</h1><p>Gestão de atendimento<br />para o seu negócio.</p></section><img className="splash-colors" src={colors} alt="" /></main>;
}
