import React from 'react';

import Header from '~/components/Header';
import Menu from '~/components/Menu';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  CardFooter,
  Annotation,
} from './styles';
import Tabs from '~/components/Tabs';

export default function Main() {
  return (
    <Container>
      <Header />

      <Content>
        <Menu />

        <Card>
          <CardHeader>
            <Icon name="attach-money" size={28} color="#666" />
            <Icon name="visibility-off" size={28} color="#666" />
          </CardHeader>
          <CardContent>
            <Title>Saldo disponível</Title>
            <Description>R$ 304.213.838,63</Description>
          </CardContent>
          <CardFooter>
            <Annotation>
              Transferência de R$ 200,00 recebida de Igor Sebulbax às 23:59h
            </Annotation>
          </CardFooter>
        </Card>
      </Content>

      <Tabs />
    </Container>
  );
}
