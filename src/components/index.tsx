import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  TouchableOpacityProps, 
  ActivityIndicator 
} from 'react-native';
import { theme } from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export function Button({ 
  title, 
  variant = 'primary', 
  isLoading = false, 
  style, 
  ...rest 
}: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        variant === 'secondary' && styles.secondaryContainer,
        variant === 'danger' && styles.dangerContainer,
        style
      ]} 
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'secondary' ? theme.colors.brand : theme.colors.white} />
      ) : (
        <Text style={[
          styles.title,
          variant === 'secondary' && styles.secondaryTitle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: theme.colors.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.brand,
  },
  dangerContainer: {
    backgroundColor: theme.colors.status.recusado.bg,
    borderWidth: 1,
    borderColor: theme.colors.status.recusado.text,
  },
  title: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryTitle: {
    color: theme.colors.brand,
  }
});