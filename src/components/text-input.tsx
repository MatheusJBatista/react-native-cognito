import React from 'react'
import { StyleSheet, Text, View, TextInput as ReactTextInput  } from 'react-native'

export interface TextInputProps {
    label: string,
    value: string,
    onChangeText: Function
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChangeText }) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <ReactTextInput value={value} onChangeText={onChangeText} style={styles.input}/>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      marginTop: 0,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    label: {
      padding: 10,
      fontSize: 25
    }
    
  });
  

export default TextInput