import React, { useCallback, useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

import { Colors } from '../config';
import { StyleSheetContext } from '../providers/StyleSheetProvider';

export const Button = ({
  children,
  onPress,
  activeOpacity = 0.3,
  borderless = false,
  title,
  style
}) => {
  const styles = useContext(StyleSheetContext);

  const _style = useCallback(({ pressed }) => [
    style,
    { opacity: pressed ? activeOpacity : 1 }
  ]);

  if (borderless) {
    return (
      <Pressable onPress={onPress} style={_style}>
        <Text style={styles.loginButtonText}>{title}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={_style}>
      {children}
    </Pressable>
  );
};
