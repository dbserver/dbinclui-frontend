import React from 'react';
import { Outlet } from 'react-router-dom';
import AccessibilityTypography from '@components/AccessibilityTypography';
import './style.css';

export interface AboutProps {}

export const About: React.FC<AboutProps> = (): JSX.Element => {
  return (
    <>
      <main className="about">
        <Outlet />
        <AccessibilityTypography
          tabIndex={0}
          padding={'10rem 3rem'}
          textAlign={'left'}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
          gravida nibh, ullamcorper rhoncus nibh. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vivamus nunc elit, vehicula eget dolor
          nec, euismod dignissim libero. Quisque eget efficitur lorem. Ut at
          rhoncus neque. Donec facilisis finibus faucibus. Fusce tincidunt elit
          at nisl venenatis, viverra bibendum augue volutpat. Curabitur pretium
          elit nisl, nec fringilla sem faucibus quis. Class aptent taciti
          sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Duis a lorem non mauris congue iaculis in eu velit. Fusce
          eget pharetra nisl. Integer ut finibus massa. Cras rutrum est nec
          ligula sollicitudin vehicula at sed est. Donec ornare tempor
          porttitor. Pellentesque arcu eros, interdum ut leo quis, fermentum
          consequat purus. Aliquam erat volutpat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </AccessibilityTypography>
      </main>
    </>
  );
};

export default About;
