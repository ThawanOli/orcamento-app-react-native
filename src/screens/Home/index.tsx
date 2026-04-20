import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BudgetCard } from '../../components/BudgetCard';
import { Button } from '../../components/Button';
import { Budget, BudgetStatus } from '../../types/budget';
import { styles } from './styles';

export function Home() {
  const [sortBy, setSortBy] = useState<'recent' | 'old' | 'highValue' | 'lowValue'>('recent');
  const [activeFilter, setActiveFilter] = useState<BudgetStatus | 'Todos'>('Todos');
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [budgets, setBudgets] = useState<Budget[]>([]);
  
  const navigation = useNavigation();

  async function loadBudgets() {
    try {
      const response = await AsyncStorage.getItem('@trab_orcamento:budgets');
      const data = response ? JSON.parse(response) : [];
      setBudgets(data);
    } catch (error) {
      //Erro ao carregar orçamentos
    }
  }

 useFocusEffect(
    useCallback(() => {
      loadBudgets();
    }, [])
  );

  const filteredBudgets = budgets
  .filter(budget => {
    const matchesStatus = activeFilter === 'Todos' || budget.status === activeFilter;
    const matchesSearch = budget.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          budget.client.toLowerCase().includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  })
  .sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'old') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === 'highValue') return b.total - a.total;
    if (sortBy === 'lowValue') return a.total - b.total;
    return 0;
  });

  const FILTERS: (BudgetStatus | 'Todos')[] = ['Todos', 'Rascunho', 'Enviado', 'Aprovado', 'Recusado'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Orçamentos</Text>
            <Text style={styles.subtitle}>Você tem {budgets.length} itens</Text>
          </View>
          <Button 
            title="+ Novo" 
            style={styles.newButton} 
            onPress={() => (navigation as any).navigate('details')} 
          />
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={{ marginRight: 10 }}>🔍</Text>
              <TextInput 
                placeholder="Título ou cliente" 
                style={{ flex: 1, outlineStyle: 'none', color: '#333' } as any}
                placeholderTextColor="#A1A2A1"
                value={searchText} 
                onChangeText={setSearchText} 
              />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setShowModal(true)}>
             <Text style={{ fontSize: 20, color: '#6A44EB' }}>≡</Text> 
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBadge, activeFilter === f && styles.filterBadgeActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredBudgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetCard 
            data={item} 
            onPress={() => navigation.navigate('view', { budget: item })} 
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
            Nenhum orçamento encontrado
          </Text>
        )}
      />

      {showModal && (
        <View style={{ 
          position: 'absolute', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          justifyContent: 'flex-end',
          zIndex: 999 
        }}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtrar e ordenar</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontWeight: 'bold', marginBottom: 15 }}>Status</Text>
            <View style={{ flex: 1 }} />
            <Button title="Aplicar" onPress={() => setShowModal(false)} />
          </View>
        </View>
      )}
      {showModal && (
          <View style={{ 
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 999 
          }}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filtrar e ordenar</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontWeight: 'bold', marginBottom: 15 }}>Status</Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {FILTERS.filter(f => f !== 'Todos').map(f => (
                  <TouchableOpacity 
                    key={f} 
                    onPress={() => { setActiveFilter(f); setShowModal(false); }}
                    style={[styles.filterBadge, activeFilter === f && styles.filterBadgeActive]}
                  >
                    <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ flex: 1 }} />
              <Button title="Fechar" onPress={() => setShowModal(false)} />
            </View>
          </View>
        )}
    </SafeAreaView>
  );
}