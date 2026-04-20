import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.white },
  scrollContent: { padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.textPrimary },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  card: { backgroundColor: theme.colors.gray100, padding: 20, borderRadius: 16, marginBottom: 24 },
  budgetTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.brand, marginBottom: 16 },
  label: { fontSize: 12, color: theme.colors.textSecondary, textTransform: 'uppercase', marginBottom: 4 },
  value: { fontSize: 16, color: theme.colors.textPrimary, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 16 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  itemTitle: { fontSize: 14, fontWeight: '500', color: theme.colors.textPrimary },
  itemSub: { fontSize: 12, color: theme.colors.textSecondary },
  itemTotal: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textPrimary },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: theme.colors.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roundButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: theme.colors.gray100, justifyContent: 'center', alignItems: 'center' },
  shareButton: { backgroundColor: theme.colors.brand, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24 },
  shareButtonText: { color: theme.colors.white, fontWeight: 'bold' }
});