// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { CardExpression } from '@components/CardExpression';
// import userEvent from '@testing-library/user-event';
// import { googleProviderFunc, firebaseInitialize } from '../../firebase/config';

// const mockedNavigate = jest.fn();
// jest.mock('react-router-dom', () => {
//   const useHref = jest.fn();
//   return {
//     useHref,
//     useNavigate: () => mockedNavigate,
//   };
// });

// jest.mock('../../firebase/config');
// jest.mock('@hooks/useGoogleLogin');

// jest.mock('firebase/compat/app', () => ({
//   initializeApp: jest.fn(),
//   apps: ['app'],
// }));

// const mockGoogleProviderFunc = googleProviderFunc as jest.MockedFunction<
//   typeof googleProviderFunc
// >;

// const mockFirebaseInitialize = firebaseInitialize as jest.MockedFunction<
//   typeof firebaseInitialize
// >;

// const mockUseGoogleLogin = useGoogleLogin as jest.MockedFunction<
//   typeof useGoogleLogin
// >;

// describe('CardExpression', () => {
//   const qualquerCoisa = [
//     <li key={undefined}>
//       <div>
//         <span aria-label="teste">Expressão teste</span>
//       </div>
//       <div>
//         <button>Favoritar</button>
//         <button>Favoritar</button>
//       </div>
//     </li>,
//     <li key={undefined}>
//       <div>
//         <span aria-label="teste">Expressão teste</span>
//       </div>
//       <div>
//         <button>Favoritar</button>
//         <button>Favoritar</button>
//       </div>
//     </li>,
//   ];

//   it(' Blabla ', async () => {
//     render(<CardExpression items={qualquerCoisa}></CardExpression>);

//     // screen.logTestingPlaygroundURL();

//     // const expressionTitle = await screen.findAllByText('Testando div');
//     // expect(expressionTitle).toBeInTheDocument();
//     screen.getByRole('span', { name: /Expressão teste/i });
//   });
// });

export {};
