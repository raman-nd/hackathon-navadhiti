import { ArrowBack, Close, Done, Edit } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { IconWithLabelButton } from '../Components/Button/Button';
import { Config } from '../../../config';

export const ViewScheme = () => {
  const [globalState, setGlobalState] = useOutletContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({});

  const getData = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/${searchParams.get('id')}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        setState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePublish = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/publish/${searchParams.get('id')}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        getData();
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

  const handleUnpublish = () => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/unpublish/${searchParams.get('id')}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        getData();
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

  const handleDelete = () => {
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/${searchParams.get('id')}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    axios(config)
      .then(function (response) {
        navigate('/home/dashboard');
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <IconWithLabelButton icon={<ArrowBack />} label="Back" onClick={() => navigate('/home/dashboard')} /> <Typography variant="h5">Scheme Details</Typography>
          <IconWithLabelButton label={'Edit'} icon={<Edit />} onClick={() => navigate(`/home/edit?id=${searchParams.get('id')}`)} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {!state?.published ? <IconWithLabelButton icon={<Done />} label="Publish" onClick={handlePublish} /> : <IconWithLabelButton icon={<Done />} label="Un-publish" onClick={handleUnpublish} />}
          <IconWithLabelButton icon={<Close />} label="Delete" onClick={handleDelete} />
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: 2, p: 1, flexWrap: 'wrap' }}>
        <Typography variant="h5">Personal Information</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            Name: <b>{state?.schemeName}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Type: <b>{state?.schemeType}</b>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            For: <b>{state?.schemeFor}</b>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            Financial year: <b>{state?.financialYear}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Amount: <b>{state?.schemeAmount}</b>
          </Box>
        </Box>
        <Box>
          Description <b>{state?.schemeDescription}</b>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: 2, p: 1, flexWrap: 'wrap' }}>
        <Typography variant="h5">Eligibility</Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            Gender: <b>{state?.eligibility?.gender}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Family income: <b>{state?.eligibility?.familyIncome}</b>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            Course Level name: <b>{state?.eligibility?.acadDtls[0].courseLevelName}</b>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            Course name: <b>{state?.eligibility?.acadDtls[0].courseName}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Score type: <b>{state?.eligibility?.acadDtls[0].scoreType}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Score type: <b>{state?.eligibility?.acadDtls[0].scoreValue}</b>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            Score type: <b>{state?.eligibility?.acadDtls[0].passingYear}</b>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box>
            Start date: <b>{state?.startDate}</b>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box>
            Last date: <b>{state?.endDate}</b>
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: 2, p: 1, flexWrap: 'wrap' }}>
        <Typography variant="h5">Addition info required?</Typography>
        <Typography variant="h6">{state?.addtnlInfoReq ? 'Yes' : 'no'}</Typography>

        {state?.addtnlInfoReq && (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box>
              Spoc Name: <b>{state?.spocEmail}</b>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box>
              Spoc Email: <b>{state?.spocName}</b>
            </Box>
            <Divider orientation="vertical" flexItem />

            <Box>
              Help desk number: <b>{state?.helpdeskNo}</b>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
