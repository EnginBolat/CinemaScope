import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalStorageKeys = {
    ONBOARD: 'ONBOARD'
};

const useLocalStorage = () => {
    const SaveToStorage = async (key: keyof typeof LocalStorageKeys, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.log(`value cannot saved: ${e}`)
        }
    }

    const GetFromStorage = async <T>(key: keyof typeof LocalStorageKeys): Promise<T | undefined> => {
        try {
            const val = await AsyncStorage.getItem(key);
            return val as T;
        } catch (e) {
            console.log(`value cannot saved: ${e}`)
            return undefined;
        }
    }

    return { SaveToStorage, GetFromStorage }
}

export default useLocalStorage;
