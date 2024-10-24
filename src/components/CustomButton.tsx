import React, { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  children?: ReactNode;
  onPress(): void;
  text?: string;
  borderAndTextColor?: string;
  backgroundColor?: string;
}

export default function CustomButton({
  onPress,
  children,
  text,
  backgroundColor,
  borderAndTextColor,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={{ borderColor: borderAndTextColor, backgroundColor: backgroundColor }}
      className="border-2 rounded-lg py-2 px-4 w-fit"
      onPress={onPress}
    >
      {children}
      <Text style={{ color: borderAndTextColor }} className="text-lg text-center font-medium">
        {text}
      </Text>
    </TouchableOpacity>
  );
}
