import { Popular } from "@models/Popular"

export type IMovileCardProps = {
    item: Popular,
    onPress: (item: Popular) => void;
}