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
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.link} onPress={() => router.push('/vehicle-details')}>View Details</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  logoutButton: { padding: 8, paddingHorizontal: 12, backgroundColor: '#eee', borderRadius: 8 },
  logoutText: { color: '#d00', fontWeight: 'bold' },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  itemSub: { color: '#555' },
  status: { color: 'green', fontWeight: 'bold' },
  link: { color: '#007AFF', marginTop: 8 },
});
