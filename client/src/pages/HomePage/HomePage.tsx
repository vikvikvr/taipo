import './HomePage.scss';
import { NavBar } from 'pages/HomePage/NavBar';
import { HeroSection } from 'pages/HomePage/HeroSection';
import { FeaturesSection } from 'pages/HomePage/FeaturesSection';
import { useHistory } from 'react-router-dom';
import { fadeInSound } from 'services/audioService';
import { TrySection } from 'pages/HomePage/TrySection';
import { NumbersSection } from 'pages/HomePage/NumbersSection';
import { ScrollUpButton } from 'pages/HomePage/ScrollUpButton';
import { Footer } from 'pages/HomePage/Footer';
import { useHomePageAnimation } from './HomePage.gsap';

// landing page of the game
// should be the default one when deployed

export function HomePage() {
  const history = useHistory();
  useHomePageAnimation();

  function goToNewGame() {
    fadeInSound('background');
    history.push('/game/new');
  }

  return (
    <div className="home-page">
      <NavBar />
      <HeroSection onButtonClick={goToNewGame} />
      <FeaturesSection />
      <TrySection onButtonClick={goToNewGame} />
      <NumbersSection />
      <ScrollUpButton />
      <Footer />
    </div>
  );
}
