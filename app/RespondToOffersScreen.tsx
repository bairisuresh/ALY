import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RespondToOffersScreen() {
  const [offer, setOffer] = useState('18200');
  const [counter, setCounter] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>2 Offers</Text>
      <Text>Offer amount</Text>
      <TextInput style={styles.input} value={offer} editable={false} />
      <View style={styles.buttonRow}>
        <Button title="Decline" onPress={() => {}} />
        <Button title="Counter" onPress={() => {}} />
        <Button title="Accept Offer" onPress={() => {}} />
      </View>
      <Text style={styles.section}>Other amount</Text>
      <TextInput style={styles.input} value={counter} onChangeText={setCounter} placeholder="Enter counter offer" />
      <View style={styles.buttonRow}>
        <Button title="Decline" onPress={() => {}} />
        <Button title="Counter" onPress={() => {}} />
        <Button title="Accept Offer" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  section: { fontWeight: 'bold', marginTop: 16 },
});
