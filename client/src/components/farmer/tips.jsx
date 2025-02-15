import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { 
  Container,  Typography,  Grid, 
  Card, CardContent, CardMedia,
  Button, 
} from "@mui/material";

export default function ViewTips() {
  const [tips, setTips] = useState([]);
  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/viewtips`);
      setTips(response.data);
    } catch (err) {
      console.error("Error fetching tips:", err);
    }
  };

  
  const navigate = useNavigate()

  // Function to check if the URL is a YouTube link and convert it to an embed URL
  const getEmbedUrl = (url) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(youtubeRegex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}>
        Tips & Guidance
      </Typography>
      <Button onClick={()=>navigate('/farmer')}>BACK TO DASH BOARD </Button>
      <Grid container spacing={3}>
        {tips.length > 0 ? (
          tips.map((tipItem) => (
            <Grid item xs={12} sm={6} md={4} key={tipItem._id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                <CardMedia
                  component="iframe"
                  src={getEmbedUrl(tipItem.url)}
                  title={tipItem.title}
                  sx={{ height: 200, border: "none" }}
                  allowFullScreen
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {tipItem.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            No tips available.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
