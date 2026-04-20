import React, { useState } from 'react';
import { 
  TextInput, 
  TextInputProps, 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { theme } from '../../styles/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focused,
        !!error && styles.error
      ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
      </View>

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 8,
    fontWeight: '700',
  },
  inputContainer: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: 14,
  },
  focused: {
    borderColor: theme.colors.brand,
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.status.recusado.text,
  },
  errorText: {
    color: theme.colors.status.recusado.text,
    fontSize: 12,
    marginTop: 4,
  }
});