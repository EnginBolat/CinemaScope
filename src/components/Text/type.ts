import { AppTextType } from "@constants/AppTextType";
import { TextProps as RNTextProps } from "react-native";

export interface TextProps extends RNTextProps {
    type?: keyof typeof AppTextType,
    text: string
    color?: string;
}