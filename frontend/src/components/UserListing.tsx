import { ChangeEvent, SetStateAction, useState } from "react";
import { useGetAllService } from "../service";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Pagination,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import { SearchBar } from "./Searchbar";

export const UserListing = () => {
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [search, setSearch] = useState("");

  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (gender: SetStateAction<string>) => {
    setSelectedGender(gender);
  };

  const { data, loading, pagination } = useGetAllService({
    url: "",
    page,
    size,
    selectedGender,
  });
  const navigate = useNavigate();

  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const onSearch = (message: SetStateAction<string>) => {
    setSearch(message);
  };

  console.log("search", search);

  if (loading) {
    return <Typography variant="h6">Loading</Typography>;
  }

  return (
    <div>
      <SearchBar onSearchChange={onSearch} />
      <Divider orientation="horizontal" flexItem sx={{ marginTop: "10px" }} />
      <Dropdown onGenderChange={handleGenderChange} />
      <Grid container spacing={3} mt={4}>
        {data.map((user, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0" }}
            >
              <CardMedia
                component="img"
                width="100%" // Specify width to maintain aspect ratio
                image={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {`${user.name.title} ${user.name.first} ${user.name.last}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Gender:</strong> {user.gender}
                  <br />
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Location:</strong>{" "}
                  {`${user.location.city}, ${user.location.state}, ${user.location.country}`}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => {
                    navigate(`/${pagination?.seed}/${user.login.username}`);
                  }}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={100}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};
