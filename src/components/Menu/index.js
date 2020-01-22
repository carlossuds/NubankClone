import React from 'react';

import QRCode from 'react-native-qrcode-svg';

import {Container, Code} from './styles';

export default function Menu() {
  return (
    <Container>
      <Code>
        <QRCode
          value="https://github.com/carlossuds/"
          size={80}
          bgColor="#fff"
          fgColor="#7F22A7"
        />
      </Code>
    </Container>
  );
}
