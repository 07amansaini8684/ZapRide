import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-200";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-[0.5px] border-natural-500";
    default:
      return "bg-blue-500";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-500";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
                        onPress,
                        title,
                        bgVariant = "primary",
                        textVariant = "default",
                        IconLeft,
                        IconRight,
                        className,
                        ...props
                      }: ButtonProps) => {
  return (
      <TouchableOpacity
          onPress={onPress}
          className={`w-full rounded-full flex flex-row justify-center py-3 items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} p-3 ${className}`}
          {...props}
      >
        {IconLeft && <IconLeft />}
        <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
        {IconRight && <IconRight />}
      </TouchableOpacity>
  );
};

export default CustomButton;
