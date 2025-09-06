'use client';
import React from 'react';
import Header from '../home/header/header';
import '../../styles/home-page.css';
import HeroSection from './hero-section/hero-section';
import FeaturesSection from './features/features-section';
import NotificationSettingsSection from './features/notification-settings-section';
import { Pricing } from './pricing/pricing';
import { HomePageBackground } from '../gradients/home-page-background';
import { Footer } from './footer/footer';



const HomePega: React.FC = () => {
  return (
    <>
      <div>
        <HomePageBackground />
        <Header user={null} />
        <HeroSection />
        <FeaturesSection />
        <NotificationSettingsSection />
        <Pricing country={''} />
       
        <Footer />
      </div>
    </>
  );
};

export default HomePega;

