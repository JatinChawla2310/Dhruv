import {
  Avatar,
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Image,
  Layer,
  List,
  Select,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import React from 'react';
import laptop from 'assets/laptop.png';
import monitor from 'assets/monitor.png';
import { Edit, User } from 'grommet-icons';
import { useState } from 'react';
import { useEffect } from 'react';
// import SplitLayout from 'granite-admin/core/components/SplitLayout';

function Jatin() {
  const [value, setValue] = useState({});
  const [show, setShow] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const fetchApi = async () => {
    try {
      const res = await fetch(`https://api.publicapis.org/entries`);
      const data = await res.json();
      const passData = data.entries.slice(10, 38);
      console.log(passData);
      setFetchedData(passData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Box overflow="hidden">
      <Grid
        rows={['large', 'large']}
        columns={['1/3', 'auto']}
        gap="small"
        areas={[
          { name: 'nav', start: [0, 0], end: [1, 1] },
          { name: 'main', start: [1, 0], end: [1, 1] },
        ]}
      >
        <Box gridArea="nav" pad="medium">
          <Box background="white" height="96vh" align="center" elevation="large">
            <Box>
              <Stack anchor="bottom-right" margin="medium">
                <Avatar size="15rem">
                  <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
                </Avatar>
                <Box background="white" pad="medium" round="full" border={{ size: '2px', color: 'purple' }}>
                  <Edit color="black" size="medium" />
                </Box>
              </Stack>
            </Box>
            <Box margin={{ top: '20px', bottom: '20px' }} height="2px" background="purple" width="70%" />
            <Box>
              <Text textAlign="center" margin={{ top: '5px' }} size="xxlarge">
                Jatin Chawla
              </Text>
              <Text textAlign="center" margin={{ top: '5px' }} size="xlarge" color="#afafaf">
                7836035292
              </Text>
              <Text textAlign="center" margin={{ top: '5px' }}>
                Sec-23, Faridabad
              </Text>
            </Box>
            <Box></Box>
          </Box>
        </Box>
        <Box gridArea="main" pad="medium">
          <Box background="white" height="96vh" elevation="large">
            <Tabs>
              <Tab title="User List">
                <Box pad="medium">
                  <List
                    label={'Customer'}
                    selectable={true}
                    queryKey="q"
                    columns={COLUMNS}
                    actionIconColor="secondary"
                    // deleteHandler={handleDeleteClick}
                    fetch={getCustomers}
                    update={updateCustomer}
                    eventEmitter={eventEmitter}
                    // searchPlaceholder="Search Customers by Name and Email ID"
                    // deleteBulk={true}
                    // bulkActions={[
                    //   // {
                    //   //   name: 'archive',
                    //   //   label: 'Archive',
                    //   //   icon: <Archive size="20px" />,
                    //   //   onClick: e => console.log('action 1', e),
                    //   // },
                    //   // {
                    //   //   name: 'export',
                    //   //   label: 'Export',
                    //   //   icon: <Download size="20px" />,
                    //   //   onClick: e => console.log('action 1', e),
                    //   // },
                    //   {
                    //     name: 'delete',
                    //     label: 'Delete',
                    //     icon: <Trash size="20px" />,
                    //     onClick: deleteBulkRows,
                    //   },
                    // ]}
                    filters={[
                      {
                        name: 'employee',
                        label: 'User',
                        value: '',
                        type: 'autocomplete',
                        fetch: q => searchEmployee(q),
                        labelKey: 'name',
                        valueKey: 'name',
                      },
                    ]}
                    sideContent={Details}
                    status={statusList}
                    editInNewTab={true}
                    addRowOptions={{
                      colsId: ['name', 'email', 'phone'],
                      defaultObject: {
                        status: 1,
                        country_code: 'IN',
                        phone: { phone: '+91' },
                      },
                      validate: {
                        name: d => (d ? true : 'Name is required'),
                        email: d => (d ? true : 'Email is required'),
                        'phone.phone': d => (d.length > 7 && d.length < 14 ? true : 'Not a valid number'),
                      },
                      saveOn: 'phone.phone',
                    }}
                  />
                  {/* <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell scope="col" border="bottom">
                          API
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Category
                        </TableCell>
                        <TableCell scope="col" border="bottom">
                          Cors
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fetchedData.map(e => {
                        return (
                          <TableRow>
                            <TableCell scope="row">{e.API}</TableCell>
                            <TableCell scope="row">{e.Category}</TableCell>
                            <TableCell scope="row">{e.Cors}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table> */}
                </Box>
              </Tab>
              <Tab title="Admin Settings">
                <Box align="end" pad="medium">
                  <Button
                    primary
                    label="View Registration"
                    onClick={() => {
                      setShow(true);
                    }}
                  />
                  {show && (
                    <Layer onEsc={() => setShow(false)} onClickOutside={() => setShow(false)}>
                      <Box pad="20px">
                        <FormField name="phone" htmlFor="rPhone" label="Registered Phone Number">
                          <TextInput value="9456546546" id="rPhone" disabled />
                        </FormField>
                        <FormField name="email" htmlFor="rEmail" label="Registered Email">
                          <TextInput value="user@admin.com" id="rEmail" disabled />
                        </FormField>
                        <Button label="close" onClick={() => setShow(false)} />
                      </Box>
                    </Layer>
                  )}
                </Box>
                <Box pad="medium">
                  <Form
                    value={value}
                    onChange={nextValue => setValue(nextValue)}
                    onSubmit={({ value }) => {
                      alert('Hello');
                    }}
                  >
                    <Box direction="row" gap="large">
                      <FormField name="userDescription" htmlFor="select" label="User Timezone">
                        <Select
                          options={['UTC', 'Asia/Kolkata', 'Australia/Sydney']}
                          name="select"
                          id="select"
                          required
                          // value={value}
                          // onChange={({ option }) => setValue(option)}
                        />
                      </FormField>
                      <FormField name="userDescription" htmlFor="description" label="User Description">
                        <TextArea placeholder="type here" name="message" id="description" maxSize="5" />
                      </FormField>
                      <FormField name="name" htmlFor="email" label="Admin Email">
                        <TextInput id="email" name="email" type="email" placeholder="user@admin.com" required />
                      </FormField>
                    </Box>
                    <Box direction="row" gap="medium">
                      <Button type="submit" primary label="Submit" />
                    </Box>
                  </Form>
                </Box>
              </Tab>
            </Tabs>
            {/* <Box background="light-5">vfdvfd</Box> */}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Jatin;
