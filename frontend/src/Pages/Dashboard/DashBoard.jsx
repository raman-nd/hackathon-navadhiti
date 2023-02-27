import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs } from '@mui/material';

// icon
import VisibilityIcon from '@mui/icons-material/Visibility';

import { IconWithLabelButton } from '../Components/Button/Button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Add } from '@mui/icons-material';
import { Config } from '../../../config';

export const Dashboard = () => {
  const [globalState, setGlobalState] = useOutletContext();
  const [state, setState] = useState({
    tabValue: 0,
    schemeData: {},
    applicantData: {},
  });

  const getApiData = async () => {
    let tempState = { ...state };

    var config_scheme = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/all`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    await axios(config_scheme)
      .then(function (response) {
        tempState.schemeData = response.data;
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });

    var config_applicant = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/applicant/all`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    await axios(config_applicant)
      .then(function (response) {
        tempState.applicantData = response.data;
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });

    setState(tempState);
  };

  // methods for scheme
  const handlePublish = (id) => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/publish/${id}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        getApiData();
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Published Scheme',
            severity: 'success',
          },
        });
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });
  };

  const handleUnpublish = (id) => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/unpublish/${id}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        getApiData();
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Un-Published Scheme',
            severity: 'success',
          },
        });
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });
  };

  const handleDelete = (id) => {
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/${id}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        getApiData();
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Scheme deleted',
            severity: 'success',
          },
        });
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });
  };

  // methods for applicant

  const handleAward = (id) => {
    var data = JSON.stringify({
      remarks: 'Application is accepted.',
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/applicant/award/${id}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getApiData();
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Application accepted',
            severity: 'success',
          },
        });
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });
  };

  const handleReject = (id) => {
    var data = JSON.stringify({
      remarks: 'Application is rejected.',
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/applicant/reject/${id}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getApiData();
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Application rejected',
            severity: 'success',
          },
        });
      })
      .catch(function (error) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          },
        });
      });
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
      <Tabs value={state.tabValue} onChange={(e, value) => setState({ ...state, tabValue: value })} aria-label="tabss">
        <Tab label="Scheme" />
        <Tab label="Applicant" />
      </Tabs>
      {state.tabValue === 0 && <ViewScheme state={state} handlePublish={handlePublish} handleUnpublish={handleUnpublish} handleDelete={handleDelete} />}
      {state.tabValue === 1 && <ViewAApplicant state={state} handleAward={handleAward} handleReject={handleReject} />}
    </Box>
  );
};

const ViewScheme = ({ state, handlePublish, handleUnpublish, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <IconWithLabelButton label={'Add'} icon={<Add />} onClick={() => navigate('/home/add')} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>For</TableCell>
              <TableCell>Financial Year</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.schemeData &&
              Object.keys(state?.schemeData).map((each, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {state.schemeData[each].schemeName}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>{state.schemeData[each].schemeDescription}</TableCell>
                    <TableCell>{state.schemeData[each].schemeType}</TableCell>
                    <TableCell>{state.schemeData[each].schemeFor}</TableCell>
                    <TableCell>{state.schemeData[each].financialYear}</TableCell>
                    <TableCell>{state.schemeData[each].schemeAmount}</TableCell>
                    <TableCell>{state.schemeData[each].published ? 'Published' : 'Not published'}</TableCell>

                    <TableCell align="right" sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                      <IconWithLabelButton label={'View'} icon={<VisibilityIcon />} onClick={() => navigate(`/home/viewscheme?id=${state.schemeData[each].schemeID}`)} />
                      <IconWithLabelButton label={'Delete'} onClick={() => handleDelete(state.schemeData[each].schemeID)} />
                      {state.schemeData[each].published ? (
                        <IconWithLabelButton label={'un-publish'} onClick={() => handleUnpublish(state.schemeData[each].schemeID)} />
                      ) : (
                        <IconWithLabelButton label={'publish'} onClick={() => handlePublish(state.schemeData[each].schemeID)} />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const ViewAApplicant = ({ state, handleAward, handleReject }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Scheme name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>For</TableCell>
            <TableCell>Status</TableCell>

            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.applicantData &&
            Object.keys(state.applicantData).map((each, index) => {
              return (
                <>
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {state.applicantData[each].applcntDtls.person.name ? state.applicantData[each].applcntDtls.person.name : 'N/A'} -{' '}
                      <small>
                        {state.applicantData[each].applcntDtls.person.age && `${state.applicantData[each].applcntDtls.person.age}, `}
                        {state.applicantData[each].applcntDtls.person.gender}
                      </small>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>{state.applicantData[each].schemeName}</TableCell>
                    <TableCell>{state.applicantData[each].schemeAmount}</TableCell>
                    <TableCell>{state.applicantData[each].schemeFor}</TableCell>
                    <TableCell>
                      {state.applicantData[each].appStatus === 5 && 'Accepted'}
                      {state.applicantData[each].appStatus === 2 && 'Rejected'}
                      {state.applicantData[each].appStatus === 1 && 'Pending'}
                    </TableCell>
                    <TableCell align="right" sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                      {/* <IconWithLabelButton label={'View'} icon={<VisibilityIcon />} onClick={() => navigate(`/home/viewapp?id=${state.applicantData[each].appId}`)} /> */}
                      {state.applicantData[each].appStatus === 1 && (
                        <>
                          <IconWithLabelButton label={'Accept'} onClick={() => handleAward(state.applicantData[each].appId)} />
                          <IconWithLabelButton label={'Reject'} onClick={() => handleReject(state.applicantData[each].appId)} />
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
