import styled from 'styled-components';

export const MainWrapper = styled.main``;

export const ErrorWrapper = styled(MainWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 10rem;
    font-weight: 700;
    letter-spacing: -0.8rem;
    margin: 0;
  }

  p {
    font-size: 1.4rem;
    font-weight: 300;
    margin: 0;
  }
`;
