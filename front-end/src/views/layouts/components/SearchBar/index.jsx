import { styled, alpha } from "@mui/material/styles";
import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchRoot = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.black, 0.04),
  "&:hover": { backgroundColor: alpha(theme.palette.common.black, 0.06) },
  width: "100%",
  maxWidth: 520,
  border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`
}));
const IconWrap = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));
const Input = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`
  }
}));

export default function SearchBar() {
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
      <SearchRoot>
        <IconWrap><SearchIcon /></IconWrap>
        <Input placeholder="Search" inputProps={{ "aria-label": "search" }} />
      </SearchRoot>
    </Box>
  );
}
