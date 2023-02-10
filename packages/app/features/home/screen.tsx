import { H1, H2, Paragraph, ScrollView, Stack, YStack } from '@my/ui'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import Carousel from 'react-native-reanimated-carousel'

function Slide({item}: { item: string}) {
  return (
    <Stack h="$20" bc="$red8" mx="$1" jc="center" ai="flex-end" overflow="hidden">
      <H1 fontSize={400} lineHeight={385} mr={-32}>{item}</H1>
    </Stack>
  )
}

function SlideParallax({ item, animationValue }: { item: string; animationValue: Animated.SharedValue<number> }) {

  const foregroundStyle = useAnimatedStyle(() => {
    const translateX = interpolate(animationValue.value, [-1, 0, 1], [-128, 0, 128])
    return {
      transform: [{translateX}]
    }
  }, [animationValue])

  return (
    <Stack h="$20" bc="$red8" mx="$1" jc="center" ai="flex-end" overflow="hidden">
      <H1 fontSize={400} lineHeight={385} mr={-32} pos="relative" zIndex={1}>{item}</H1>
      <Animated.View style={[{position: 'absolute', left: -128, zIndex: 0}, foregroundStyle]}>
        <Stack h="$20" w="$20" bc="#000" br="$20" />
      </Animated.View>
    </Stack>
  )
}

export function HomeScreen() {

  return (
    <ScrollView bc="$gray5">
    <YStack f={1} jc="center" ai="center" p="$4" space="$8" py="$10">
      <YStack space="$4" maxWidth={300}>
        <YStack>
          <H1>Default</H1>
          <Paragraph mt={-3}>You can click and drag to move the carousels.</Paragraph>
        </YStack>
        <Stack h="$20">
          <Carousel width={300} data={['1', '2', '3']} renderItem={Slide} />
        </Stack>
      </YStack>
      <YStack space="$4" maxWidth={300}>
        <YStack>
          <H1>Custom Animation</H1>
          <Paragraph mt={-3}>This carousel attempts to create a parallax effect with the circle in the middle. On react-native and react-native-web, the interpolated values animate correctly. On Tamagui, the values don't update, so no animation is visible. Open on native and click and drag to see the circle move. </Paragraph>
        </YStack>
        <Stack h="$20">
          <Carousel width={300} data={['1', '2', '3']} renderItem={({ item, animationValue }) => <SlideParallax item={item} animationValue={animationValue} />} />
        </Stack>
      </YStack>
    </YStack>
    </ScrollView>
  )
}
