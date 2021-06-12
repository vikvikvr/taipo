import './HomePage.scss';
import { NavBar } from 'pages/HomePage/NavBar';
import { HeroSection } from 'pages/HomePage/HeroSection';
import { FeaturesSection } from 'pages/HomePage/FeaturesSection';
import { useHistory } from 'react-router-dom';
import { background, mouseClick } from 'services/audioService';
import { TrySection } from 'pages/HomePage/TrySection';
import { NumbersSection } from 'pages/HomePage/NumbersSection';
import { ScrollUpButton } from 'pages/HomePage/ScrollUpButton';
import { Footer } from 'pages/HomePage/Footer';

// landing page of the game
// should be the default one when deployed

export function HomePage() {
  const history = useHistory();

  function goToNewGame() {
    mouseClick.play();
    background.play();
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
