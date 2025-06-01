import { IconType } from "@assets/icons";
import { AppTextType } from "@constants/AppTextType";

export type IHeaderProps = {
    isHaveHeader?: boolean;
    title?: string;
    titleType?: keyof typeof AppTextType;
    leftIconName?: string;
    leftIconShown?: boolean;
    leftIconOnPress?: () => void;
    rightIconName?: IconType;
    rightIconOnPress?: () => void;
};
