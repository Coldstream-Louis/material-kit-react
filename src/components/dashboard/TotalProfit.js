/* eslint-disable */
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo, green } from '@material-ui/core/colors';
import HealingIcon from '@material-ui/icons/Healing';
import { loadToday } from 'src/dataModel';
import { useState, useEffect } from 'react';

const TotalProfit = (props) => {
  const [recover, setRecover] = useState(0);
  const [totalRecover, setTotalRecover] = useState(0);

  useEffect(() => {
    if (recover === 0) {
      getTodayCases();
    }
  }, []);

  const getTodayCases = async () => {
    const jsonData = await loadToday();
    await setRecover(jsonData.todayRecovered);
    await setTotalRecover(jsonData.recovered);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL RECOVERED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {totalRecover}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: green[900],
                mr: 1
              }}
            >
              {recover} New Recovered Today
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <HealingIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default TotalProfit;
