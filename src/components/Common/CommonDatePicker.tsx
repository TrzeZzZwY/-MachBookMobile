import {
  TextInput,
  View,
  Text,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import { inputHeight } from "./CommonInput";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";

export type CommonDatePickerProps = {
  label: string;
  onChange: (date: Date) => void;
} & ViewProps;

export default function CommonDatePicker({
  label,
  onChange,
  ...props
}: CommonDatePickerProps) {
  const [date, setDate] = useState<Date>(new Date());

  const openDateTimePicker = () => {
    DateTimePickerAndroid.open({
      mode: "date",
      value: date,
      onChange: onPickerChange,
    });
  };

  const onPickerChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;

    onChange(date);
    setDate(date);
  };

  const dateString = date.toLocaleDateString("pl-pl", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <TouchableOpacity
        className={props.className}
        {...props}
        onPress={openDateTimePicker}
      >
        <View>
          {label !== null ? (
            <Text className="font-roboto-light mt-3 mb-1">{label}</Text>
          ) : null}
          <TextInput
            editable={false}
            value={dateString}
            onPress={openDateTimePicker}
            className={`w-full bg-neutral-100 color-neutral-900 rounded-md text-md px-4`}
            style={{ height: inputHeight }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}
