import { Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { Genre } from '@models/Genre';
import { View } from 'react-native';

import {styles} from '../../style';

type Props = {
  genres: Genre[] | undefined;
  releaseDate: string | undefined;
};

const GenreAndReleaseDate = ({ genres, releaseDate }: Props) => (
  <View style={styles.releaseDateAndGenreContainer}>
    <View style={styles.genreContainer}>
      {genres?.map(genre => (
        <Text key={genre.id} text={genre.name} color={AppColors.white50} />
      ))}
    </View>
    {releaseDate && <Text text={releaseDate} color={AppColors.white50} />}
  </View>
);


export default GenreAndReleaseDate;
