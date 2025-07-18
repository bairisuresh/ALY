import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RespondToOffersScreen() {
  const [offer, setOffer] = useState('18200');
  const [counter, setCounter] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>2 Offers</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Offer amount</Text>
          <Text style={styles.offerAmount}>$18,200</Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#B0B0B0' }]}><Text style={styles.actionButtonText}>Decline</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFD600' }]}><Text style={styles.actionButtonText}>Counter</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF' }]}><Text style={styles.actionButtonText}>Accept Offer</Text></TouchableOpacity>
        </View>
        <Text style={styles.infoText}>This would be your best offer given the proposals. If not ideal, you can counter below.</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Other amount</Text>
          <TextInput style={styles.input} value={counter} onChangeText={setCounter} placeholder="Enter counter offer" keyboardType="numeric" />
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#B0B0B0' }]}><Text style={styles.actionButtonText}>Decline</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFD600' }]}><Text style={styles.actionButtonText}>Counter</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF' }]}><Text style={styles.actionButtonText}>Accept Offer</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6' },
  card: { width: '95%', backgroundColor: '#fff', borderRadius: 18, padding: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 18, textAlign: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label: { fontSize: 16, color: '#888' },
  offerAmount: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 8, width: 120, backgroundColor: '#FAFAFA', textAlign: 'right' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  actionButton: { flex: 1, marginHorizontal: 4, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  actionButtonText: { color: '#222', fontWeight: 'bold', fontSize: 15 },
  infoText: { color: '#666', fontSize: 13, marginVertical: 10, textAlign: 'center' },
});
