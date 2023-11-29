import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import { ActivityIndicator, Chip, Text } from 'react-native-paper';

import { BusinessDetailsFormData } from './BusinessEditDetailsScreen';
import { components } from '../../../../schema';
import { getAttributes } from '../../../api/business';

type Attribute = components['schemas']['Attribute']; // Update type

const CategoriesSheet = (
  props: SheetProps<{
    checkedAttributes: Attribute[]; // Update property name
    control: Control<BusinessDetailsFormData>;
    name: string;
  }>
) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('scrollview', actionSheetRef);

  const { data, isFetching } = useQuery({
    queryKey: ['attributes'], // Update query key
    queryFn: getAttributes, // Update query function
  });

  const { fields, append, remove } = useFieldArray({
    keyName: '_id',
    name: 'attributes', // Update field name
    control: props.payload?.control,
  });

  return (
    <ActionSheet id={props.sheetId} containerStyle={{ height: '80%' }}>
      {isFetching ? (
        <ActivityIndicator
          style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}
          color="black"
          size={30}
        />
      ) : (
        <ScrollView {...scrollHandlers} nestedScrollEnabled>
          <Text style={{ margin: 20 }} variant="headlineMedium">
            Select up to 5 attributes
          </Text>
          <View style={styles.wrap}>
            {data?.data.map((attribute) => (
              <Chip
                showSelectedCheck={false}
                mode={
                  fields?.find((field) => field.id === attribute.id) !== undefined
                    ? 'flat'
                    : 'outlined'
                }
                key={attribute.id}
                selected={fields?.find((pre) => pre.id === attribute.id) !== undefined}
                style={styles.chip}
                onPress={
                  fields?.find((field) => field.id === attribute.id) === undefined
                    ? fields.length < 5
                      ? () => append({ id: attribute.id!, name: attribute.name! })
                      : () => {}
                    : () => remove(fields.map((field) => field.id).indexOf(attribute.id!))
                }>
                {attribute.name}
              </Chip>
            ))}
          </View>
        </ScrollView>
      )}
    </ActionSheet>
  );
};

export default CategoriesSheet;

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'lightgray',
    marginHorizontal: 10,
  },
  chip: {
    margin: 5,
  },
});