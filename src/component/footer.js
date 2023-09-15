import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Footer() {
  return (
    <>
      {" "}
      <Box
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          textAlign: "center",
          py: 1,
          px: 2,

          backgroundColor: " #005C9E",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            textAlign: "center",
            backgroundColor: "#005C9E",
          }}
        >
          <Typography variant="h6 " color="white">
            สำนักงานใหญ่ประกันสังคม งานประกันสังคม สำนักงานใหญ่
          </Typography>
          <Typography variant="body2" color="white">
            เลขที่ 88/8 หมู่ 4 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมือง
            จังหวัดนนทบุรี รหัสไปษณีย์ 11000
          </Typography>
        </Container>
      </Box>
      <Box
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          textAlign: "center",

          backgroundColor: " #FFC324",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            textAlign: "center",
            backgroundColor: "#FFC324",
          }}
        >
          <Typography variant="body1" color="#333333">
            Copyright© 2022 Social Security Office. All right reserved
          </Typography>
        </Container>
      </Box>
    </>
  );
}
