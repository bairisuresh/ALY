import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const allVehicles = [
  {
    id: '1',
    vin: '1GCHK23D39F123456',
    make: 'Chevrolet',
    model: 'Silverado',
    year: 2009,
    title: '2009 Chevrolet Silverado DRW LT',
    image: require('../assets/images/vehicle.png'),
    price: '$16,800',
    mileage: '35,241 mi',
    distance: 56,
    tag: 'Accepting Offers',
    description: 'Single owner, no accidents, Carfax avail.',
  },
  {
    id: '2',
    vin: '1GNEK13ZX3R298765',
    make: 'Chevrolet',
    model: 'Tahoe',
    year: 2010,
    title: '2010 Chevrolet Tahoe LT',
    image: require('../assets/images/vehicle.png'),
    price: '$17,200',
    mileage: '36,241 mi',
    distance: 240,
    tag: 'Accepting Offers',
    description: 'Well maintained, leather interior.',
  },
  {
    id: '3',
    vin: '4T1BF1FK5FU123456',
    make: 'Toyota',
    model: 'Camry',
    year: 2015,
    title: '2015 Toyota Camry SE',
    image: require('../assets/images/vehicle.png'),
    price: '$14,900',
    mileage: '45,000 mi',
    distance: 42,
    tag: 'Accepting Offers',
    description: 'Low mileage, great fuel economy.',
  },
  {
    id: '4',
    vin: '2T1BURHE6JC123456',
    make: 'Toyota',
    model: 'Corolla',
    year: 2018,
    title: '2018 Toyota Corolla LE',
    image: require('../assets/images/vehicle.png'),
    price: '$13,800',
    mileage: '38,000 mi',
    distance: 360,
    tag: 'Accepting Offers',
    description: 'One owner, clean title.',
  },
  {
    id: '5',
    vin: 'JTMRFREV3JD123456',
    make: 'Toyota',
    model: 'RAV4',
    year: 2020,
    title: '2020 Toyota RAV4 XLE',
    image: require('../assets/images/vehicle.png'),
    price: '$21,500',
    mileage: '22,000 mi',
    distance: 580,
    tag: 'Accepting Offers',
    description: 'Like new, AWD, recent service.',
  },
];

const ManageInventoryScreen = () => {
  const router = useRouter();
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [distanceRange, setDistanceRange] = useState<'all' | '0-100' | '101-500' | '501+'>('all');

  // Filter logic
  const filteredVehicles = allVehicles.filter((v) => {
    const lowerSearch = searchText.toLowerCase();

    const matchesSearch =
      v.vin.toLowerCase().includes(lowerSearch) ||
      v.make.toLowerCase().includes(lowerSearch) ||
      v.model.toLowerCase().includes(lowerSearch) ||
      v.year.toString().includes(lowerSearch);

    const matchesMake = selectedMake ? v.make === selectedMake : true;

    let matchesDistance = true;
    if (distanceRange === '0-100') matchesDistance = v.distance <= 100;
    else if (distanceRange === '101-500') matchesDistance = v.distance > 100 && v.distance <= 500;
    else if (distanceRange === '501+') matchesDistance = v.distance > 500;

    return matchesSearch && matchesMake && matchesDistance;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy</Text>

      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setSelectedMake('Toyota')}>
          <Text style={[styles.filterTag, selectedMake === 'Toyota' && styles.activeFilterTag]}>
            Toyota
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedMake('Chevrolet')}>
          <Text style={[styles.filterTag, selectedMake === 'Chevrolet' && styles.activeFilterTag]}>
            Chevy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedMake(null)}>
          <Text style={styles.filterTag}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortContainer}>
        <Text>Filter Distance:</Text>
        <Picker
          selectedValue={distanceRange}
          style={styles.picker}
          onValueChange={(value) => setDistanceRange(value)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="0-100 miles" value="0-100" />
          <Picker.Item label="101-500 miles" value="101-500" />
          <Picker.Item label="501+ miles" value="501+" />
        </Picker>
      </View>

      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <TouchableOpacity onPress={() => router.push('/vehicle-details')}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.details}>{item.price} • {item.mileage}</Text>
              <Text style={styles.details}>{item.distance} mi away</Text>
              <Text style={styles.details}>VIN: {item.vin}</Text>
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
  activeFilterTag: {
    backgroundColor: '#4B0082',
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  picker: {
    height: Platform.OS === 'android' ? 40 : undefined,
    width: 180,
    marginLeft: 8,
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
