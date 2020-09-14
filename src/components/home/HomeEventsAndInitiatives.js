import {
  Box,
  Button,
  Grid,
  Container,
  Typography,
  Card,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import featured from "../../data/featured";
import { Image } from "cloudinary-react";

export default function HomeEventsAndIniatives({ classes }) {
  return (
    <Box className={classes.about} py={8}>
      <Container>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography className={classes.aboutHeading} variant="h2">
              Events and Initiatives
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="stretch" spacing={3}>
              {featured.map((item) => (
                <Grid key={item.title + item.path} item xs={12} md={6}>
                  <Card className={classes.featuredCard}>
                    <Box p={3}>
                      <Grid
                        container
                        direction="column"
                        justify="space-between"
                        wrap="nowrap"
                        style={{ height: "100%" }}
                      >
                        <Grid item>
                          <Box mb={2}>
                            <Typography variant="h3">
                              <b>{item.title}</b>
                            </Typography>
                          </Box>
                          <Box mb={3}>
                            <Typography variant="body1">
                              {item.description}{" "}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Link to={item.path}>
                            <Button variant="contained" color="secondary">
                              Learn More
                            </Button>
                          </Link>
                        </Grid>
                        <Image
                          cloudName="masonwang"
                          className={classes.featuredCardLogo}
                          publicId={
                            item.imgURL
                              ? item.imgURL
                              : "https://res.cloudinary.com/masonwang/image/upload/v1600056092/yei-website/logo.png"
                          }
                        />
                      </Grid>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}