import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../styles/theme';
import { styles } from './styles'; 
import { Budget } from '../../types/budget';

export function BudgetDetailsView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { budget } = route.params as { budget: Budget };
  const params = route.params as { budget?: Budget };
  
  async function handleDeleteBudget() {
    try {
      const storageKey = '@trab_orcamento:budgets'; 
      const response = await AsyncStorage.getItem(storageKey);
      const budgets = response ? JSON.parse(response) : [];
      const filtered = budgets.filter((b: any) => b.id !== budget.id);
      
      await AsyncStorage.setItem(storageKey, JSON.stringify(filtered));
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }

  }

    const statusKey = budget.status.toLowerCase() as 'rascunho' | 'enviado' | 'aprovado' | 'recusado';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
             <Text style={{ fontSize: 24 }}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Orçamento #{budget.id.slice(-5)}</Text>
            <View style={[styles.statusBadge, { backgroundColor: theme.colors.status[statusKey].bg }]}>
                <Text style={{ color: theme.colors.status[statusKey].text, fontSize: 12, fontWeight: 'bold' }}>
                {budget.status.toUpperCase()}
                 </Text>
            </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.budgetTitle}>{budget.title}</Text>
          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.value}>{budget.client}</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View>
              <Text style={styles.label}>Criado em</Text>
              <Text style={styles.value}>{budget.createdAt}</Text>
            </View>
            <View>
              <Text style={styles.label}>Total</Text>
              <Text style={[styles.value, { color: theme.colors.brand, fontWeight: 'bold' }]}>
                R$ {budget.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Serviços inclusos</Text>
        {budget.items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <View>
              <Text style={styles.itemTitle}>{item.description}</Text>
              <Text style={styles.itemSub}>{item.quantity}x R$ {item.value.toFixed(2)}</Text>
            </View>
            <Text style={styles.itemTotal}>R$ {(item.value * item.quantity).toFixed(2)}</Text>
          </View>
        ))}

      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', gap: 15 }}>
          <TouchableOpacity style={styles.roundButton} onPress={handleDeleteBudget}>
             <Text>🗑️</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.roundButton} 
            onPress={() => navigation.navigate('details', { budget: budget })}
          >
            <Text>✏️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}