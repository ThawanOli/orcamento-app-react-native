import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { theme } from '../../styles/theme';
import { Budget } from '../../types/budget';
import { StatusBadge } from '../StatusBadge';

interface BudgetCardProps extends TouchableOpacityProps {
  data: Budget;
}

export function BudgetCard({ data, ...rest }: BudgetCardProps) {
  const totalValue = data.items.reduce((acc, item) => acc + (item.value * item.quantity), 0);
  const finalValue = data.discountPercentage 
    ? totalValue - (totalValue * (data.discountPercentage / 100)) 
    : totalValue;

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
        <StatusBadge status={data.status} />
      </View>

      <Text style={styles.client}>{data.client}</Text>

      <View style={styles.footer}>
        <Text style={styles.date}>{data.createdAt}</Text>
        <Text style={styles.total}>
          {finalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.black,
    flex: 1,
    marginRight: 8,
  },
  client: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray100,
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.brand,
  },
});