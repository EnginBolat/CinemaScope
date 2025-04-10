import { AppTextType } from "@constants/AppTextType";

export type IHeaderProps = {
    isHaveHeader?: boolean;
    title?: string;
    titleType?: keyof typeof AppTextType;
    leftIconName?: string;
    leftIconOnPress?: () => void;
    rightIconName?: string;
    rightIconOnPress?: () => void;
};
