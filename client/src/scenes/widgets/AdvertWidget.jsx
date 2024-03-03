import { Typography, useTheme } from "@mui/material";
import { baseUrl } from "Urls";
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
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${baseUrl}/assets/add.jpg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>PostLife</Typography>
        <Typography color={medium}>postlife.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
       Use my web app to post your life here
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;