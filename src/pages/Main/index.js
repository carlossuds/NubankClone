import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';

import {
  SafeAreaView,
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  Title,
  Description,
  DescriptionOff,
  CardFooter,
  Annotation,
} from './styles';

export default function Main() {
  const [visibility, setVisibility] = useState('visibility-off');

  function changeVisibility() {
    if (visibility === 'visibility-off') {
      setVisibility('visibility');
    } else {
      setVisibility('visibility-off');
    }
  }

  let offset = 0;

  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 420 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 420 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }

  return (
    <SafeAreaView>
      <Container>
        <Header />

        <Content>
          <Menu translateY={translateY} />

          <PanGestureHandler
            onGestureEvent={animatedEvent}
            onHandlerStateChange={onHandlerStateChanged}>
            <Card
              style={{
                transform: [
                  {
                    translateY: translateY.interpolate({
                      inputRange: [-350, 0, 420],
                      outputRange: [-50, 0, 420],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}>
              <CardHeader>
                <Icon name="attach-money" size={28} color="#666" />
                <Icon
                  name={visibility}
                  onPress={() => changeVisibility()}
                  size={28}
                  color="#666"
                />
              </CardHeader>
              <CardContent>
                <Title>Saldo disponível</Title>
                {visibility === 'visibility' ? (
                  <DescriptionOff></DescriptionOff>
                ) : (
                  <Description>R$ 3.000,00</Description>
                )}
              </CardContent>
              <CardFooter>
                <Icon2
                  name="money"
                  size={16}
                  color="#7F22A7"
                  style={{marginTop: 5}}
                />
                <Annotation>
                  Transferência de R$ 200,00 recebida de Igor Sebulbax às 23:59h
                </Annotation>
              </CardFooter>
            </Card>
          </PanGestureHandler>
        </Content>

        <Tabs translateY={translateY} />
      </Container>
    </SafeAreaView>
  );
}
