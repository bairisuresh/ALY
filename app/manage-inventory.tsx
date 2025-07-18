import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const inventory = [
  { id: '1', year: 2020, make: 'Chevrolet', model: 'Silverado DRW LT', vin: '123456', price: '$34,000', status: 'Active' },
  { id: '2', year: 2020, make: 'Chevrolet', model: 'Silverado DRW LT', vin: '654321', price: '$32,000', status: 'Active' },
];

export default function ManageInventoryScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Manage Inventory</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.search} placeholder="Search by VIN or Stock ID" />
      <FlatList
        data={inventory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.year} {item.make} {item.model}</Text>
            <Text style={styles.itemSub}>{item.vin} | {item.price}</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.status}>{item.status}</Text>
              <TouchableOpacity onPress={() => router.push('/vehicle-details')}>
                <Text style={styles.link}>View Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No inventory found.</Text>}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F6F6F6' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#222', marginBottom: 8 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  logoutButton: { padding: 8, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 8 },
  logoutText: { color: '#d00', fontWeight: 'bold' },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fff' },
  item: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  itemText: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  itemSub: { color: '#555', marginBottom: 6 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  status: { color: 'green', fontWeight: 'bold', fontSize: 15 },
  link: { color: '#007AFF', fontWeight: 'bold', fontSize: 15 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 32, fontSize: 16 },
});
