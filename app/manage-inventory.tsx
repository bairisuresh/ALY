import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const vehicles = [
  {
    id: '1',
    title: '2009 Chevrolet Silverado DRW LT',
    image: require('../assets/images/vehicle.png'), // Changed to local asset
    price: '$16,800',
    mileage: '35,241 mi',
    distance: '56 mi',
    tag: 'Accepting Offers',
    description: 'Single owner, no accidents, Carfax avail.',
  },
  {
    id: '2',
    title: '2009 Chevrolet Silverado DRW LT',
    image: require('../assets/images/vehicle.png'), // Changed to local asset
    price: '$17,200',
    mileage: '36,241 mi',
    distance: '56 mi',
    tag: 'Accepting Offers',
    description: 'Single owner, no accidents, Carfax avail.',
  },
];

const ManageInventoryScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy</Text>

      <TextInput style={styles.searchInput} placeholder="Search by Make, Model or VIN" />

      <View style={styles.filterRow}>
        <Text style={styles.filterTag}>Toyota</Text>
        <Text style={styles.filterTag}>Chevy</Text>
        <Text style={styles.filterTag}>Within 150 miles</Text>
      </View>

      <View style={styles.sortContainer}>
        <Text>Sort by:</Text>
        <TouchableOpacity>
          <Text style={styles.sortText}>Distance ▼</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <TouchableOpacity onPress={() => router.push('/vehicle-details')}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.details}>{item.price} • {item.mileage}</Text>
              <Text style={styles.details}>{item.distance} away</Text>
              <Text style={styles.tag}>{item.tag}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterTag: {
    marginRight: 8,
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sortText: {
    fontWeight: '600',
    color: '#0000CD',
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: '#333',
  },
  tag: {
    fontSize: 12,
    color: 'green',
    fontWeight: '600',
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default ManageInventoryScreen;
