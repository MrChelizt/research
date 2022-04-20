import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const CustomButton = ({ text, onPress, type = 'filled', bordered = false}) => {
    const btnBgColor = type === 'filled' ? '#666666' : 'transparent'
    const btnTextColor = type === 'filled' ? '#ffffff' : '#6371c2'
    const btnBorderRadius = bordered ? 30 : 5

    const containerCommonStyle = {
        backgroundColor: btnBgColor,
        paddingVertical: 8,
        borderRadius: btnBorderRadius
    }

    const textCommonStyle = {
        color: btnTextColor,
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center'
    }

    const border = type === 'outlined' && { borderColor: '#e7e7e7', borderWidth: 2 }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={[containerCommonStyle, border]}>
                <Text style={[textCommonStyle]}> {text} </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton
