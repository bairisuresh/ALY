import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Trim whitespace and make username case-insensitive for comparison
    if (
      username.trim().toLowerCase() === 'admin' &&
      password === 'admin'
    ) {
      setError('');
      router.replace('/manage-inventory');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartAuction</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity style={styles.link}><Text>Forgot username or password?</Text></TouchableOpacity>
      <TouchableOpacity style={styles.link}><Text>New to SmartAuction? Enroll Now</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6' },
  title: { fontWeight: '700', fontSize: 32, marginBottom: 32, color: '#222' },
  input: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 16, fontSize: 16, width: 300 },
  error: { color: 'red', marginBottom: 8, fontSize: 14 },
  link: { marginTop: 10 },
});
