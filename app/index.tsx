import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      setError('');
      router.replace('/manage-inventory');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to SmartAuction</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}><Text style={styles.linkText}>Forgot username or password?</Text></TouchableOpacity>
        <TouchableOpacity style={styles.link}><Text style={styles.linkText}>New to SmartAuction? Enroll Now</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6' },
  title: { fontWeight: '700', fontSize: 28, marginBottom: 24, color: '#222', letterSpacing: 0.5 },
  form: { width: '90%', maxWidth: 340, backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  label: { fontSize: 15, color: '#555', marginBottom: 4, marginLeft: 2 },
  input: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 16, fontSize: 16, backgroundColor: '#F9F9F9' },
  error: { color: 'red', marginBottom: 8, fontSize: 14, textAlign: 'center' },
  loginButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginBottom: 10, marginTop: 8 },
  loginButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  link: { marginTop: 8, alignItems: 'center' },
  linkText: { color: '#007AFF', fontSize: 15 },
});
