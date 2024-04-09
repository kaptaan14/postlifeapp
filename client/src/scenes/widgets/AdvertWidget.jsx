import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Visit</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`https://images.livemint.com/img/2022/03/26/600x338/Screenshot_2022-03-26_at_5.04.23_PM_1648294554436_1648294575974.png`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Dream 11</Typography>
        <Typography color={medium}>www.dream11.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
       Win Exciting prices upto 1 crore.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;