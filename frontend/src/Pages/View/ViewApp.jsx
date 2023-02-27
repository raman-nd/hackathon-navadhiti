import { ArrowBack, Close, Done, Edit, ForkLeft } from '@mui/icons-material';
import { Box, Typography, Grid, Divider, Link } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconWithLabelButton } from '../Components/Button/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Config } from '../../../config';

export const ViewApp = () => {
  const [searchParma] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({});

  const getApplicantData = () => {
    const requestOptions = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/applicant/all`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    };

    const ApplicantId = searchParma.get('id');
    return axios(`${Config.apiEndPoint}/applicant/${ApplicantId}`, requestOptions)
      .then((data) => {
        setState(data.data);
        console.log(data);
        return data;
      })
      .catch((error) => error.response);
  };
  useEffect(() => {
    getApplicantData();
  }, []);

  return (
    <Box sx={{ p: 2, gap: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconWithLabelButton icon={<ArrowBack />} label="Back" onClick={() => navigate('/home/dashboard')} /> <Typography variant="h5">Applicant Details</Typography>{' '}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {state?.appStatus === 1 && (
            <>
              <IconWithLabelButton icon={<Done />} label="Accept" onClick={() => navigate('/home/dashboard')} />
              <IconWithLabelButton icon={<Close />} label="Reject" onClick={() => navigate('/home/dashboard')} />
            </>
          )}
          {state?.appStatus === 2 && <Typography>Applicant was rejected</Typography>}
          {state?.appStatus === 5 && <Typography>Applicant was accepted</Typography>}
        </Box>
      </Box>

      <Box sx={{ backgroundColor: 'var(--bg-secondary)', display: 'flex', gap: 2, p: 1 }}>
        <Box>
          Name <b>{state?.addtnlDtls && JSON.parse(state?.addtnlDtls?.toString())?.name}</b>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box>
          Phone <b>{state?.addtnlDtls && JSON.parse(state?.addtnlDtls?.toString())?.phone}</b>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box>
          Address <b>{state?.addtnlDtls && JSON.parse(state?.addtnlDtls?.toString())?.address}</b>
        </Box>
        <Divider orientation="vertical" flexItem />

        <Box>
          Documents{' '}
          <Link sx={{ color: 'black' }} href={state?.addtnlDtls && JSON.parse(state?.addtnlDtls?.toString())?.docUrl}>
            Link
          </Link>
        </Box>
      </Box>
    </Box>

    // <Grid container>
    //   <Box sx={{ p: 2 }}>
    //     <IconWithLabelButton icon={<ArrowBack />} label="Back" onClick={() => navigate('/home/dashboard')} />
    //     {/* {searchParma.get("id")} */}
    //   </Box>
    //   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginLeft: '20%', paddingBottom: '53px' }}>
    //     <Grid item xs={6}>
    //       <Typography variant="h4">
    //         <u>Applicant Details</u>
    //       </Typography>
    //     </Grid>
    //   </Grid>
    //   <div className="card-container" style={{ border: '1px solid black', width: '90%', marginLeft: '40px', height: '400px', borderRadius: '9px', boxShadow: '4px 3px 2px 1px grey' }}>
    //     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginLeft: '20px', paddingTop: '3%' }}>
    //       <Grid item xs={6}>
    //         <Typography variant="h6">Additional Info Id:- &nbsp;{applicantData.addtnlInfoId}</Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography variant="h6">
    //           Remarks:-&nbsp;
    //           {applicantData.remarks}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography variant="h6">
    //           Scheme Provider Id:-&nbsp;
    //           {applicantData.schemeProviderId}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         <Typography variant="h6">
    //           Updated By:-&nbsp;
    //           {applicantData.updatedBy}
    //         </Typography>
    //       </Grid>
    //       <Grid item xs={6}>
    //         {applicantData?.applcntDtls?.person?.name && (
    //           <Typography variant="h6">
    //             Applicant Name:-&nbsp;
    //             {applicantData.applcntDtls.person.name}
    //           </Typography>
    //         )}
    //       </Grid>
    //       <Grid item xs={6}>
    //         {applicantData?.applcntDtls?.person?.age && (
    //           <Typography variant="h6">
    //             Applicant Age:-&nbsp;
    //             {applicantData.applcntDtls.person.age}
    //           </Typography>
    //         )}
    //       </Grid>
    //       <Grid item xs={6}>
    //         {applicantData?.applcntDtls?.person?.gender && (
    //           <Typography variant="h6">
    //             Applicant Gender:-&nbsp;
    //             {applicantData.applcntDtls.person.gender}
    //           </Typography>
    //         )}
    //       </Grid>
    //       <Grid item xs={6}>
    //         {applicantData?.applcntDtls?.person?.dob && (
    //           <Typography variant="h6">
    //             Applicant Date of Birth:-&nbsp;
    //             {applicantData.applcntDtls.person.dob}
    //           </Typography>
    //         )}
    //       </Grid>
    //     </Grid>
    //   </div>
    // </Grid>
  );
};
