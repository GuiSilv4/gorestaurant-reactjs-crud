import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  background-color: #121214e6;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    color: #39b100;
  }

  h1 {
    font-family: 'Roboto', sans-serif;
    margin-top: 32px;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
  }
`;
