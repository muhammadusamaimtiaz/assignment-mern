import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useGetService } from "../service/useGetService";

export const UserDetails = () => {
  const { seed, loginId } = useParams();
  const navigate = useNavigate();

  const { data: user, loading } = useGetService({
    url: "",
    seed,
    loginId,
  });

  if (loading) {
    return <Typography variant="h6">Loading</Typography>;
  }
  if (!user) {
    return <Typography variant="h6">User not found</Typography>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="400"
        image={user.picture.large}
        alt={`${user.name.first} ${user.name.last}`}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
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
        <Button variant="contained" size="small" onClick={() => navigate("/")}>
          Back to Listing
        </Button>
      </CardContent>
    </Card>
  );
};
