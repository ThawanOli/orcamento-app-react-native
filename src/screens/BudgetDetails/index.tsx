import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from '../../styles/theme';
import { Button } from '../../components/Button';
import { ServiceItem, BudgetStatus, Budget } from '../../types/budget';
import { styles } from './styles';

export function BudgetDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { budget?: Budget };
  
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [discount, setDiscount] = useState('0');
  const [status, setStatus] = useState<BudgetStatus>('Rascunho');
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [isItemModalVisible, setIsItemModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [tempDesc, setTempDesc] = useState('');
  const [tempVal, setTempVal] = useState(0);
  const [tempQty, setTempQty] = useState(1);

  useEffect(() => {
    if (params?.budget) {
      setTitle(params.budget.title);
      setClient(params.budget.client);
      setDiscount(String(params.budget.discountPercentage || 0));
      setStatus(params.budget.status);
      setItems(params.budget.items);
    }
  }, [params]);

  function handleOpenAddItem() {
    setEditingItem(null);
    setTempDesc('');
    setTempVal(100);
    setTempQty(1);
    setIsItemModalVisible(true);
  }

  function handleSaveItem() {
    const newItem: ServiceItem = {
      id: editingItem ? editingItem.id : String(new Date().getTime()),
      description: tempDesc || `Serviço #${items.length + 1}`,
      value: tempVal,
      quantity: tempQty
    };

    if (editingItem) {
      setItems(items.map(i => i.id === editingItem.id ? newItem : i));
    } else {
      setItems([...items, newItem]);
    }
    setIsItemModalVisible(false);
  }

    const subtotal = items.reduce((acc, item) => acc + (item.value * item.quantity), 0);
    const discountValue = (subtotal * Number(discount)) / 100;
    const total = subtotal - discountValue;

 async function handleSave() {
  try {
    const storageKey = '@trab_orcamento:budgets';
    const response = await AsyncStorage.getItem(storageKey);
    const previousBudgets = response ? JSON.parse(response) : [];
    const budgetId = params?.budget?.id || String(new Date().getTime());
    const budgetData = {
      id: budgetId,
      title,
      client,
      items,
      total: items.reduce((acc, item) => acc + (item.value * item.quantity), 0),
      status: params?.budget?.status || 'Rascunho',
      createdAt: params?.budget?.createdAt || new Date().toLocaleDateString('pt-BR'),
    };

    const index = previousBudgets.findIndex((b: any) => b.id === budgetId);
    let newBudgets;
    if (index !== -1) {
      newBudgets = [...previousBudgets];
      newBudgets[index] = budgetData;
    } else {
      newBudgets = [...previousBudgets, budgetData];
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(newBudgets));
    
    navigation.navigate('Home');
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

  function handleDeleteItem() {
    if (editingItem) {
      setItems(items.filter(item => item.id !== editingItem.id));
      setIsItemModalVisible(false); 
      setEditingItem(null); 
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 24, color: theme.colors.textPrimary }}>←</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.textPrimary }}>
            Novo Orçamento
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Informações Gerais</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Título</Text>
            <TextInput 
              style={styles.input as any} 
              placeholder="Ex: Desenvolvimento Web"
              placeholderTextColor="#A1A2A1" 
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cliente</Text>
            <TextInput 
              style={styles.input as any} 
              placeholder="Nome do cliente ou empresa"
              placeholderTextColor="#A1A2A1"
              value={client}
              onChangeText={setClient}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Itens do Serviço</Text>
          
         {items.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              activeOpacity={0.7}
              onPress={() => {
                setEditingItem(item);
                setTempDesc(item.description);
                setTempVal(item.value);
                setTempQty(item.quantity);
                setIsItemModalVisible(true);
              }}
              style={{
                backgroundColor: '#FFF',
                padding: 16,
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#EEE',
                cursor: 'pointer', 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10, 
              } as any}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
                  {item.description}
                </Text>
                <Text style={{ fontSize: 13, color: '#666' }}>
                  {item.quantity}x R$ {item.value.toFixed(2)}
                </Text>
              </View>
              
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#4A44EB' }}>
                R$ {(item.value * item.quantity).toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}

          <Button 
            title="+ Adicionar Item" 
            variant="secondary" 
            onPress={handleOpenAddItem}
            style={{ marginTop: 16 }}
          />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Definir Status</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {(['Rascunho', 'Enviado', 'Aprovado', 'Recusado'] as BudgetStatus[]).map((s) => (
              <TouchableOpacity 
                key={s} 
                onPress={() => setStatus(s)}
                style={{
                  paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1,
                  borderColor: status === s ? theme.colors.brand : theme.colors.border,
                  backgroundColor: status === s ? theme.colors.brand : theme.colors.white
                }}
              >
                <Text style={{ color: status === s ? '#fff' : '#666', fontWeight: 'bold' }}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Resumo Financeiro</Text>
          
          <View style={[styles.inputContainer, { marginBottom: 24 }]}>
            <Text style={styles.inputLabel}>Desconto (%)</Text>
            <TextInput 
              style={styles.input as any} 
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#A1A2A1"
              value={discount}
              onChangeText={setDiscount}
            />
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.colors.textPrimary }}>Subtotal:</Text>
              <Text style={{ color: theme.colors.textPrimary }}>R$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.colors.textPrimary }}>Desconto ({discount}%):</Text>
              <Text style={{ color: theme.colors.status.recusado.text }}>
                - R$ {discountValue.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={{ fontWeight: 'bold', color: theme.colors.textPrimary }}>Total Final:</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Button title="Salvar Orçamento" onPress={handleSave} style={{ marginBottom: 24 }} />
        {isItemModalVisible && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Serviço</Text>
                <TouchableOpacity onPress={() => setIsItemModalVisible(false)}>
                  <Text style={{ fontSize: 20, color: '#999' }}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Descrição</Text>
              <TextInput 
                style={[styles.input, { marginBottom: 15 }] as any} 
                value={tempDesc} 
                onChangeText={setTempDesc} 
                placeholder="Design de interfaces"
              />

              <View style={{ flexDirection: 'row', gap: 15, alignItems: 'flex-end', marginBottom: 20 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputLabel}>Valor (R$)</Text>
                  <TextInput 
                    style={styles.input as any} 
                    keyboardType="numeric" 
                    value={String(tempVal)} 
                    onChangeText={(t) => setTempVal(Number(t) || 0)} 
                  />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F1FD', borderRadius: 24, height: 48, paddingHorizontal: 10 }}>
                  <TouchableOpacity onPress={() => setTempQty(Math.max(1, tempQty - 1))} style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, color: theme.colors.brand }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 15, fontWeight: 'bold' }}>{tempQty}</Text>
                  <TouchableOpacity onPress={() => setTempQty(tempQty + 1)} style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, color: theme.colors.brand }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity 
                  onPress={handleDeleteItem} 
                  style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 24, 
                    borderWidth: 1, 
                    borderColor: '#FF3B3B', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                  }}
                >
                  <Text style={{ fontSize: 20 }}>🗑️</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleSaveItem}
                  style={{ flex: 1, 
                    backgroundColor: theme.colors.brand, 
                    borderRadius: 24, 
                    justifyContent: 'center', 
                    alignItems: 'center' }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}