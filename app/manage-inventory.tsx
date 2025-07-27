import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface InventoryItem {
  id: string;
  year: string;
  make: string;
  model: string;
  type: string;
  fullVin: string;
  partialVin: string;
  price: string;
  mmr: string;
  offers: number;
  mileage: string;
  status: string;
  color: string;
  statusColor: string;
  hasDescription: boolean;
  description?: string;
  views?: number;
  likes?: number;
}

const ManageInventoryScreen = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState(false);
  const [offersFilter, setOffersFilter] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [dummyState, setDummyState] = useState(false); // for force re-render

  // Move inventoryData to state so updates trigger re-render
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: '1',
      year: '2008',
      make: 'Chevrolet',
      model: 'Silverado DRW LT',
      type: 'Chevrolet Silverado',
      fullVin: '4LGTIAKMU4284483',
      partialVin: '8912LSSSTVJU',
      price: '$19,200',
      mmr: '$22,316',
      offers: 1,
      mileage: '35,241 mi',
      status: 'Active',
      color: '#E8F5E8',
      statusColor: '#4CAF50',
      hasDescription: false,
      views: 34,
      likes: 2,
    },
    {
      id: '2',
      year: '2009',
      make: 'Chevrolet',
      model: 'Silverado DRW LT',
      type: 'Chevrolet Silverado',
      fullVin: '1FTSW21P26ED35483',
      partialVin: 'FT12LSSSTVJU',
      price: '$16,800',
      mmr: '$20,418',
      offers: 1,
      mileage: '35,241 mi',
      status: 'Active',
      color: '#E8F5E8',
      statusColor: '#4CAF50',
      hasDescription: true,
      description:
        'Great value, will need minor body work for the scratch and dent repair. Will bid at auction. Need to lookup VIN for future title issues and accidents.',
      views: 34,
      likes: 2,
    },
    {
      id: '3',
      year: '2008',
      make: 'Chevrolet',
      model: 'Silverado DRW LT',
      type: 'Chevrolet Silverado',
      fullVin: '5XYZU3LB2FG288563',
      partialVin: '5632LSSSTVJU',
      price: '$16,800',
      mmr: '$20,418',
      offers: 1,
      mileage: '35,241 mi',
      status: 'Active',
      color: '#E8F5E8',
      statusColor: '#4CAF50',
      hasDescription: false,
      views: 34,
      likes: 2,
    },
    {
      id: '4',
      year: '2012',
      make: 'Ford',
      model: 'F-150 XLT',
      type: 'Ford F-150',
      fullVin: '1FTEW1CM6CFB12345',
      partialVin: '1234FORDXLT',
      price: '$21,500',
      mmr: '$23,000',
      offers: 0,
      mileage: '42,000 mi',
      status: 'Not Active',
      color: '#FDECEA',
      statusColor: '#F44336',
      hasDescription: false,
      views: 34,
      likes: 2,
    },
    {
      id: '5',
      year: '2015',
      make: 'Toyota',
      model: 'Camry SE',
      type: 'Toyota Camry',
      fullVin: '4T1BF1FK5FU123456',
      partialVin: '4567TOYCAM',
      price: '$17,800',
      mmr: '$19,500',
      offers: 2,
      mileage: '28,000 mi',
      status: 'Active',
      color: '#E8F5E8',
      statusColor: '#4CAF50',
      hasDescription: true,
      description: 'Low mileage, single owner, well maintained.',
      views: 34,
      likes: 2,
    },
    {
      id: '6',
      year: '2017',
      make: 'Honda',
      model: 'Civic LX',
      type: 'Honda Civic',
      fullVin: '2HGFC2F59HH123456',
      partialVin: 'CIVIC2017LX',
      price: '$15,900',
      mmr: '$17,200',
      offers: 0,
      mileage: '31,000 mi',
      status: 'Not Active',
      color: '#FDECEA',
      statusColor: '#F44336',
      hasDescription: false,
      views: 34,
      likes: 2,
    },
    {
      id: '7',
      year: '2020',
      make: 'Tesla',
      model: 'Model 3',
      type: 'Tesla Model 3',
      fullVin: '5YJ3E1EA7LF123456',
      partialVin: 'TESLA2020M3',
      price: '$35,000',
      mmr: '$36,500',
      offers: 3,
      mileage: '12,000 mi',
      status: 'Active',
      color: '#E8F5E8',
      statusColor: '#4CAF50',
      hasDescription: true,
      description: 'Like new, autopilot included.',
      views: 34,
      likes: 2,
    },
    {
      id: '8',
      year: '2018',
      make: 'BMW',
      model: 'X5',
      type: 'BMW X5',
      fullVin: '5UXKR0C59J0X12345',
      partialVin: 'BMWX52018',
      price: '$29,900',
      mmr: '$31,000',
      offers: 1,
      mileage: '22,000 mi',
      status: 'Not Active',
      color: '#FDECEA',
      statusColor: '#F44336',
      hasDescription: false,
      views: 34,
      likes: 2,
    },
  ]);

  const filteredInventory = inventory.filter(item => {
    const query = searchText.toLowerCase();
    const matchesSearch = item.fullVin.toLowerCase().includes(query) || item.partialVin.toLowerCase().includes(query);
    const matchesActive = !activeFilter || item.status === 'Active';
    const matchesOffers = !offersFilter || item.offers > 1;
    return matchesSearch && matchesActive && matchesOffers;
  });

  const handleItemPress = (item: InventoryItem) => {
    router.push({ pathname: '/vehicle/[id]', params: { id: item.id, vehicle: JSON.stringify(item) } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Inventory</Text>
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.iconText}>≡</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, minWidth: 220 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Filter By</Text>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              onPress={() => {
                setActiveFilter(!activeFilter);
              }}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#007AFF', marginRight: 10,
                backgroundColor: activeFilter ? '#007AFF' : '#fff',
              }} />
              <Text style={{ fontSize: 16 }}>Active</Text>
            </Pressable>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
              onPress={() => {
                setOffersFilter(!offersFilter);
              }}
            >
              <View style={{
                width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#007AFF', marginRight: 10,
                backgroundColor: offersFilter ? '#007AFF' : '#fff',
              }} />
              <Text style={{ fontSize: 16 }}>Offers</Text>
            </Pressable>
            <TouchableOpacity
              style={{ marginTop: 8, alignSelf: 'flex-end' }}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by VIN or Stock ID"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.chipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.clearChip}
            onPress={() => {
              setSearchText('');
              setActiveFilter(false);
              setOffersFilter(false);
            }}
          >
            <Text style={styles.clearChipText}>Clear All</Text>
          </TouchableOpacity>

          {/* Show Active filter chip only if activeFilter is true */}
          {activeFilter && (
            <TouchableOpacity
              style={[styles.chip, styles.chipSelected]}
              onPress={() => setActiveFilter(false)}
            >
              <Text style={styles.chipTextSelected}>Active ✕</Text>
            </TouchableOpacity>
          )}

          {/* Show Offers filter chip only if offersFilter is true */}
          {offersFilter && (
            <TouchableOpacity
              style={[styles.chip, styles.chipSelected]}
              onPress={() => setOffersFilter(false)}
            >
              <Text style={styles.chipTextSelected}>Offers ✕</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>{filteredInventory.length} results</Text>
        <View style={styles.sortContainer}>
          <Text style={styles.sortIconMain}>≡</Text>
          <Text style={styles.sortText}>VIN</Text>
          <Text style={styles.sortChevron}>▼</Text>
        </View>
      </View>

      <FlatList
        data={filteredInventory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.vehicleCard}
            onPress={() => handleItemPress(item)}
          >
            <Text style={styles.cardTitle}>{`${item.year} ${item.make} ${item.model}`}</Text>
            <Text style={styles.cardVin}>{`${item.fullVin} • ${item.partialVin} • `}<Text style={styles.warningIcon}>⚠️</Text></Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Odometer</Text>
              <Text style={styles.cardValue}>{item.mileage}</Text>
            </View>
            <View style={styles.cardRow}>
              <View style={styles.offerContainer}>
                <Text style={styles.cardLabel}>Best Offer</Text>
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>{item.offers}</Text>
                </View>
              </View>
              <Text style={styles.cardValue}>{item.price}</Text>
            </View>
            <View style={styles.cardFooter}>
              <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
              <View style={styles.footerIcons}>
                <TouchableOpacity onPress={() => {
                  setInventory(prev => prev.map(i => i.id === item.id ? { ...i, views: (i.views || 0) + 1 } : i));
                }}>
                  <Text style={[styles.iconText, { color: '#B0B0B0' }]}>👁️ {item.views || 34}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setInventory(prev => prev.map(i => i.id === item.id ? { ...i, likes: (i.likes || 2) + 1 } : i));
                }}>
                  <Text style={[styles.iconText, { color: '#B0B0B0' }]}>❤️ {item.likes || 2}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {item.hasDescription && (
              <Text style={styles.cardDescription}>{item.description}</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B2995',
  },
  iconText: {
    fontSize: 18,
    color: '#007AFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 44,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    paddingVertical: 0,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  clearChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 8,
  },
  clearChipText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E1EEFF',
    marginRight: 8,
  },
  chipSelected: {
    backgroundColor: '#007AFF',
  },
  chipText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    minWidth: 120,
    justifyContent: 'space-between',
  },
  sortText: {
    fontSize: 14,
    color: '#333',
  },
  sortIconMain: {
    fontSize: 16,
    color: '#666',
    marginRight: 4,
  },
  sortChevron: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  list: {
    flex: 1,
    paddingHorizontal: 20,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  cardVin: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  warningIcon: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    color: '#999',
  },
  cardValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerBadge: {
    backgroundColor: '#E1DEFF',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 4,
  },
  offerBadgeText: {
    fontSize: 12,
    color: '#6E2EC7',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default ManageInventoryScreen;
