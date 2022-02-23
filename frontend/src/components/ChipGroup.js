import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";

const DeleteButton = styled(IconButton)(({ theme: { palette } }) => ({
  marginLeft: 5,
  padding: 1.8,
}));

const ChipGroup = function (props) {
  const justify = props.justifyContent || "flex-start";
  const editable = props.editable || false;
  const items = props.items || [];
  const onRemove = (index) => {
    props.onRemove(index);
  };

  return (
    <Stack direction="row" flex={1} flexWrap="wrap" justifyContent={justify}>
      {items.map((item, index) => (
        <Box
          key={index}
          sx={({ palette }) => ({
            borderRadius: 8,
            background: palette.grey.A200,
            display: "block",
            marginX: 0.6,
            marginY: 0.4,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 2,
            paddingRight: 2,
            paddingY: 1,
            ...(editable && {
              paddingRight: 1,
            }),
          })}>
          <Typography
            variant="body2"
            sx={({ palette }) => ({
              color: palette.grey[700],
            })}>
            {item.title}
            {editable && (
              <DeleteButton
                onClick={() => {
                  onRemove(index);
                }}>
                <CloseOutlined sx={{ fontSize: 12 }} />
              </DeleteButton>
            )}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default ChipGroup;
