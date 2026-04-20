import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    padding: 24,
    backgroundColor: theme.colors.white,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.brand },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },
  newButton: { width: 100, height: 40 },
  
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.gray100,
    borderRadius: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    outlineStyle: 'none',
  } as any,
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },

  filterScroll: { paddingHorizontal: 24, paddingVertical: 16 },
  filterBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  filterBadgeActive: { backgroundColor: theme.colors.brand, borderColor: theme.colors.brand },
  filterText: { color: theme.colors.textSecondary, fontWeight: '600' },
  filterTextActive: { color: theme.colors.white },
  listContent: { padding: 24, paddingTop: 0 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 500,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold' }
});