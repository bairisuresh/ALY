import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ManageInventoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Buy All');

  const inventoryData = [
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
    },
  ];

  const filters = ['Buy All', 'Toyota', 'Lexus', 'Nissan/Infiniti'];

  // Filter inventory by searchText
  const filteredInventory = inventoryData.filter(item => {
    const query = searchText.toLowerCase();
    return (
      item.fullVin.toLowerCase().includes(query) ||
      item.partialVin.toLowerCase().includes(query)
    );
  });

  const resultsCount = filteredInventory.length;

  const handleItemPress = item => {
    navigation.navigate('VehicleDetails', { vehicle: item });
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={styles.vehicleCard}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.cardTitle}>
        {`${item.year} ${item.make} ${item.model}`}
      </Text>
      <Text style={styles.cardVin}>
        {`${item.fullVin} • ${item.partialVin} • `}
        <Text style={styles.warningIcon}>⚠️</Text>
      </Text>
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
          <Text style={styles.iconText}>👁️ 34</Text>
          <Text style={styles.iconText}> ❤️ 2</Text>
        </View>
      </View>
      {item.hasDescription && (
        <Text style={styles.cardDescription}>{item.description}</Text>
      )}
    </TouchableOpacity>
  );

  const renderFilterButton = filter => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.selectedFilterButton,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter && styles.selectedFilterText,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Inventory</Text>
        <TouchableOpacity style={styles.filterIcon}>
          <Text style={styles.iconText}>≡</Text>
        </TouchableOpacity>
      </View>

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
              setSelectedFilter('Buy All');
            }}
          >
            <Text style={styles.clearChipText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Offers</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>{resultsCount} results</Text>
        <TouchableOpacity style={styles.sortContainer}>
          <Text style={styles.sortIconMain}>≡</Text>
          <Text style={styles.sortText}>VIN</Text>
          <Text style={styles.sortChevron}>▼</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredInventory}
        renderItem={renderVehicleItem}
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
  chipText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
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
