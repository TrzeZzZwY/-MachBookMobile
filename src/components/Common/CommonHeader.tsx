import { Text, ViewProps } from "react-native";

export type CommonHeaderProps = {
  text: string;
} & ViewProps;

export default function CommonHeader({
  text,
  className,
  ...props
}: CommonHeaderProps) {
  return (
    <Text className={`font-merriweather text-xl ${className}`} {...props}>
      {text}
    </Text>
  );
}
