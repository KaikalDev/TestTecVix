import { useEffect, useState } from "react";
import { useZTheme } from "../../../../stores/useZTheme";
import { availableThemes, ThemeNames } from "../../themes";
import { Stack } from "@mui/material";
import { LeftCard } from "./LeftCard";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { TextRob16Font1S } from "../../../../components/Text1S";

export const WhiteLabel = () => {
  const { themeName, setTheme, version, themeNameDefault } = useZTheme();
  const themeNames = Object.keys(availableThemes) as ThemeNames[];
  const initialColor = themeNames.includes(themeName as ThemeNames)
    ? themeName
    : "default";
  const [colorSelected] = useState<ThemeNames>(initialColor as ThemeNames);
  const { idBrand } = useZBrandInfo();

  useEffect(() => {
    if (colorSelected !== themeName) {
      setTheme({
        themeName: colorSelected,
        themeNameDefault,
        light: availableThemes[colorSelected].light,
        dark: availableThemes[colorSelected].dark,
        version: version + 1,
      });
    }
  }, [colorSelected]);

  if (!idBrand) return <TextRob16Font1S>MSP não criada</TextRob16Font1S>;

  return (
    <Stack
      width={"100%"}
      sx={{
        alignItems: "center",
        overflow: "auto",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        gap: "32px",
        boxSizing: "border-box",
        "@media (max-width: 1000px)": {
          flexDirection: "column",
        },
      }}
    >
      <LeftCard theme={availableThemes[colorSelected]} />
    </Stack>
  );
};
