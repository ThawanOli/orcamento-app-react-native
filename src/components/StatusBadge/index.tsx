import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';
import { BudgetStatus } from '../../types/budget';

interface StatusBadgeProps {
  status: BudgetStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'Aprovado':
        return theme.colors.status.aprovado;
      case 'Enviado':
        return theme.colors.status.enviado;
      case 'Recusado':
        return theme.colors.status.recusado;
      case 'Rascunho':
      default:
        return theme.colors.status.rascunho;
    }
  };

  const colors = getStatusStyle();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99, 
    alignSelf: 'flex-start', 
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase', 
  },
});