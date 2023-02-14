import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentData } from './JS/actions/actions';
export const Locations = () => {
  const { name } = useParams();

  console.log(name);

  const data = useSelector(state => state.location.data);
  const onLoading = useSelector(state => state.location.onLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentData(name));
  }, [name]);

  return (
    <>
      {onLoading ? (
        <Spinner size="xl" />
      ) : (
        <ChakraProvider>
          <Card maxW="md">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="Segun Adebayo"
                    src={data.current.condition.icon}
                  />
                  <Box>
                    <Heading size="sm">Location: {data.location.name}</Heading>
                    <Text>
                      Region:{' '}
                      {data.location.region
                        ? data.location.region
                        : data.location.name}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>
                <p>It's {data.current.condition.text} today !</p>
                <p>with Temprature dwelling around {data.current.temp_c} °C</p>
              </Text>
            </CardBody>
            {/* <Map/> */}

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                '& > button': {
                  minW: '136px',
                },
              }}
            >
              {data.forecast.forecastday.map((el, key) => (
                <div>
                  {console.log(el)}
                  <p>{el.date}</p>
                  <p>{el.day.avgtemp_c} Degree Celcius</p>
                </div>
              ))}
            </CardFooter>
          </Card>
        </ChakraProvider>
      )}
    </>
  );
};
