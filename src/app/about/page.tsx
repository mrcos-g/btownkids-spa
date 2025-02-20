import Head from 'next/head';
import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';

const About = () => {
  return (
    <>
      <Head>
        <title>About BTownKids</title>
        <meta
          name="description"
          content="BTownKids is your one-stop hub for child and family-friendly events in Bloomington, Indiana."
        />
      </Head>
      <Container maxWidth="md" sx={{ pt: 8 }}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About BTownKids
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Your One-Stop Hub for Child and Family-Friendly Events in Bloomington, Indiana
          </Typography>

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              Our goal is simple: to simplify the process of finding engaging, family-friendly
              events so you can spend more time making memories with your loved ones. Whether you’re
              new to Bloomington or have lived here all your life, BTownKids is designed to keep you
              connected with your community and ensure your family always has something fun to do.
            </Typography>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              What We Offer
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <strong>Event Aggregation:</strong> We automatically pull event data from
                      trusted local sources such as the Monroe County Public Library, Visit
                      Bloomington, and the IU Sports calendar. (More sources are coming soon!)
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <strong>User-Friendly Interface:</strong> Our intuitive design makes it easy
                      for everyone to browse and discover events.
                    </>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <>
                      <strong>Comprehensive Listings:</strong> We focus solely on child and
                      family-friendly activities to ensure you see only the events that matter to
                      you.
                    </>
                  }
                />
              </ListItem>
            </List>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Why Choose BTownKids?
            </Typography>
            <Typography variant="body1">
              Many families find themselves hopping between multiple websites to plan their
              weekends. BTownKids eliminates that hassle by offering a one-stop hub where all the
              best local events are just a click away. Save time, reduce stress, and make the most
              out of your family time with our curated listings.
            </Typography>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Acknowledgments
            </Typography>
            <Typography variant="body1">
              We’re grateful for the support of the Monroe County Public Library, Visit Bloomington,
              and the IU Sports for providing the essential event data that powers our listings. A
              huge thank you to the families of Bloomington—you are the inspiration behind
              BTownKids.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default About;
