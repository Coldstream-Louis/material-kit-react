/* eslint-disable */
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { loadMichigan } from 'src/dataModel';
import { useState, useEffect } from 'react';

const LatestProducts = (props) => {
  const [dataJSON, setData] = useState({cases: 0, todayCases: 0, deaths: 0, todayDeaths: 0, recovered: 0, active: 0, updated: 0});

  useEffect(() => {
    if (dataJSON.cases == 0) {
      getData();
    }
  }, []);

  const getData = async () => {
    const res = await loadMichigan();
    setData(res);
  }

  const products = [
    {
      id: uuid(),
      name: 'Total Cases: '+dataJSON.cases,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      id: uuid(),
      name: 'New Cases Today: '+dataJSON.todayCases,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      id: uuid(),
      name: 'Deaths: '+dataJSON.deaths,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      id: uuid(),
      name: 'New Deaths Today: '+dataJSON.todayDeaths,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      id: uuid(),
      name: 'Recovered: '+dataJSON.recovered,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    },
    {
      id: uuid(),
      name: 'Active: '+dataJSON.active,
      imageUrl: '/static/images/products/washtenaw.jpeg',
      updatedAt: moment(dataJSON.updated).format('MMMM Do YYYY, h:mm:ss a')
    }
  ];

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Michigan Statistic"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt={product.name}
                src={product.imageUrl}
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default LatestProducts;
