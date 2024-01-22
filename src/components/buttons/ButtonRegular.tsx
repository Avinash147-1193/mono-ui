import * as React from "react";
import { Button } from "@rneui/base";

export default (props: {
  style?: { [key: string]: any } | { width: 150 };
  containerStyle?: { [key: string]: any } | { margin: number };
  disabledStyle?:
    | { [key: string]: any }
    | {
        borderWidth: number;
        borderColor: string;
      };
  disabledTitleStyle?: { [key: string]: any } | { color: string };
  linearGradientProps?:
    | {
        colors: string[];
        start: { x: number; y: number };
        end: { x: number; y: number };
      }
    | {
        colors: ["#FF9800", "#F44336"];
        start: { x: number; y: number };
        end: { x: number; y: number };
      };
  icon?: any;
  iconContainerStyle?: { [key: string]: any };
  loadingProps?: { [key: string]: any } | { animating: boolean };
  loadingStyle?: { [key: string]: any } | React.CSSProperties;
  onPress?: () => void;
  raised?: string;
  title?: string | "Hello";
  titleStyle?: React.CSSProperties | { marginHorizontal: number };
}) => {
  // Create a new object with only the properties that are passed in props
  const filteredProps = {
    ...(props.style && { style: props.style }),
    ...(props.containerStyle && { containerStyle: props.containerStyle }),
    ...(props.disabledStyle && { disabledStyle: props.disabledStyle }),
    ...(props.disabledTitleStyle && { disabledTitleStyle: props.disabledTitleStyle }),
    ...(props.linearGradientProps && { linearGradientProps: props.linearGradientProps }),
    ...(props.icon && { icon: props.icon }),
    ...(props.iconContainerStyle && { iconContainerStyle: { marginLeft: 10 } }),
    ...(props.loadingProps && { loadingProps: props.loadingProps }),
    ...(props.loadingStyle && { loadingStyle: props.loadingStyle }),
    ...(props.onPress && { onPress: props.onPress }),
    ...(props.title && { title: props.title }),
    ...(props.titleStyle && { titleStyle: props.titleStyle }),
  };

  return <Button {...filteredProps} />;
};
