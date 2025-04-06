import { AppTextType } from "@constants/AppTextType";
import { TextStyle, TouchableOpacityProps } from "react-native";

export interface IButton extends TouchableOpacityProps {
    text: string;
    loading?: boolean;
    textStyle?: TextStyle;
    textType?: keyof typeof AppTextType;
  }