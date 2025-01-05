import { Tooltip } from "@chakra-ui/react";

interface NiceTooltipProps {
  children?: React.ReactNode;
  [key: string]: any;
}

export default function NiceTooltip({ children, ...rest }: NiceTooltipProps) {
  return (
    <Tooltip
      borderRadius={"8px"}
      bg={"bgHover"}
      color={"whiteAlpha.700"}
      placement="top"
      borderColor={"border"}
      borderWidth={1}
      /* hasArrow
      arrowShadowColor="whitesmoke" */
      {...rest}
    >
      {children}
    </Tooltip>
  );
}
