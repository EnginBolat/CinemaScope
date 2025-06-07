import React, { FC, useState } from 'react';
import {
  FlatList,
  Text as RNText,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppColors } from '@constants/AppColors.ts';
import { NetworkLog, requestLogs } from '@store/slice/request.ts';
import { Icon, Text } from '@components/index.ts';
import { STATIC_PADDING } from '@constants/AppConstants.ts';
import { useAppDispatch } from '@store/store.ts';
import { setFavories, setWatchLater } from '@store/slice/mainSlice.ts';
import useLocalStorage from '@hooks/useLocalStorage.ts';
import moment from 'moment';
import 'moment/locale/tr';

type Props = {
  index: number;
  expandedIndex: number | null;
  setExpandedIndex: (index: number | null) => void;
  entry: NetworkLog;
};
const RequestDetails: FC<Props> = props => {
  const { index, expandedIndex, entry, setExpandedIndex } = props;
  return (
    <View key={index}>
      <Pressable onPress={() => setExpandedIndex(expandedIndex === index ? null : index)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="ChevronLeft" color="#fff" />
          <RNText style={{ color: 'white' }}>{index + 1}</RNText>
        </View>
      </Pressable>
      {expandedIndex === index && (
        <View
          style={{
            borderWidth: 1,
            borderRadius: 12,
            borderColor: AppColors.white50,
            padding: 12,
            marginHorizontal: 12,
            marginVertical: 8,
          }}>
          {Object.entries(entry).map(([key, value]) => (
            <View key={key} style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 4 }}>
              <RNText style={{ color: 'red', fontWeight: 'bold' }}>{key}:</RNText>
              <RNText style={{ color: 'white', marginLeft: 6 }}>
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </RNText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const QARequestLoggerScreen = () => {
  moment.locale('tr');
  const dispatch = useAppDispatch();
  const { RemoveFromStorage } = useLocalStorage();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [expandedIndexDetails, setExpandedIndexDetails] = useState<number | null>(null);

  const onPressCleanButton = () => {
    Alert.alert('State Sıfırlama Aracı', '', [
      {
        text: 'Favoriler',
        onPress: async () => {
          dispatch(setFavories([]));
          await RemoveFromStorage('FAVORITES');
        },
      },
      {
        text: 'Daha Sonra İzle',
        onPress: async () => {
          dispatch(setWatchLater([]));
          await RemoveFromStorage('WATCHLATER');
        },
      },
      {
        text: 'İptal',
        style: 'cancel',
      },
    ]);
  };
  const renderItem = ({ item, index }: { item: NetworkLog; index: number }) => {
    let parsedData: any = null;
    try {
      parsedData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
    } catch (e) {
      parsedData = item.data;
    }

    const resultsList = Array.isArray(parsedData?.results) ? parsedData.results : [];

    const makeCurl = () => {
      if (!item || !item.url || !item.headers) {
        console.warn('Missing required fields for curl');
        return;
      }

      const curlParts = [`curl -X ${item.method} "${item.url}"`];

      Object.entries(item.headers).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          curlParts.push(`-H "${key}: ${value}"`);
        }
      });

      if (item.body) {
        curlParts.push(`-d '${JSON.stringify(item.body)}'`);
      }

      const curlCommand = curlParts.join(' \\\n  ');
      console.log('[cURL]', curlCommand);
    };

    return (
      <Pressable onPress={() => setExpandedIndexDetails(expandedIndexDetails === index ? null : index)}>
        <View style={styles.logBox}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <RNText style={styles.type}>{`${item.type.toUpperCase()} - ${item?.method ?? ''}`}</RNText>
            <RNText style={styles.type}>{moment(item.date).format('D MMMM, h:mm')}</RNText>
          </View>

          <RNText style={styles.url}>{item.url}</RNText>
          {expandedIndexDetails === index &&
            (expandedIndexDetails === index && resultsList.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={resultsList}
                renderItem={({ item, index: itemIndex }) => (
                  <RequestDetails
                    index={itemIndex}
                    expandedIndex={expandedIndex}
                    entry={item}
                    setExpandedIndex={setExpandedIndex}
                  />
                )}
              />
            ) : (
              <RNText style={styles.data}>{JSON.stringify(parsedData, null, 2)}</RNText>
            ))}
          <TouchableOpacity
            onPress={makeCurl}
            style={{
              backgroundColor: AppColors.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 8,
              padding: 8,
              borderRadius: 8,
            }}>
            <RNText style={{ color: AppColors.white, fontWeight: 'bold' }}>Curl</RNText>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: AppColors.primary, flex: 1, marginHorizontal: STATIC_PADDING, gap: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text text="Requests" type="boldHeading620" />
        <Pressable onPress={onPressCleanButton}>
          <Text text="Clean" type="boldSmall12" />
        </Pressable>
      </View>
      <FlatList
        data={requestLogs}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<RNText style={styles.data}>Empty List</RNText>}
        renderItem={renderItem}
        style={{ backgroundColor: AppColors.primary, flex: 1 }}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};
export default QARequestLoggerScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: AppColors.primary,
  },
  logBox: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
  },
  type: {
    fontWeight: 'bold',
    color: '#61dafb',
  },
  url: {
    color: '#ffffff',
    marginVertical: 4,
  },
  data: {
    color: '#fff',
    fontSize: 12,
  },
});
