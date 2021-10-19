import React from 'react'
import { StyleSheet, Text, TouchableOpacity  } from 'react-native'

export interface ButtonProps {
    name: string,
    onPress: Function,
    disabled: boolean,
}

const Button: React.FC<ButtonProps> = ({name, onPress, disabled, ...rest}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled} {...rest}>
        <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
      margin: 10,
      width: '50%',
      backgroundColor: "#fffb00a0",
      textAlign: "center",
      padding: 10,
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#000"
    },
    buttonText: {
      color: "#000000"
    }
  });
  

export default Button