import { Typography, ButtonGroup, Switch } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import { FormDatePicker, FormInput, FormSelect } from '../Components/Input/Input';
import { FormButton } from '../Components/Button/Button';
import _ from 'lodash';
import axios from 'axios';
import { Config } from '../../../config';

const schemeTypes = [
  {
    value: 'scholarship',
    label: 'Scholarship',
  },
  {
    value: 'grant',
    label: 'Grant',
  },
];

const schemeGender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'others', label: 'Others' },
  { value: 'all', label: 'All' },
];

const schemeCourseLevel = [{ value: 'grade', label: 'Grade' }];

const schemeScoreType = [
  { value: 'cgpa', label: 'CGPA' },
  { value: 'percentage', label: 'Percentage' },
];

export const Add = ({ edit }) => {
  const [globalState, setGlobalState] = useOutletContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: '',
    description: '',
    startDate: new Date(),
    lastDate: new Date(),
    type: searchParams.get('type'),
    amount: '',

    gender: '',
    income: '',
    cast: '',

    courseLevel: '',
    corseName: '',
    scoreType: '',
    score: '',
    yearOfPassing: '',

    spocName: '',
    spocEmail: '',
    deskNo: '',

    additionInfo: false,
  });

  const handleSubmit = () => {
    console.log(
      _.isEmpty(state.name),
      _.isEmpty(state.description),
      _.isEmpty(state.type),
      _.isEmpty(state.for),
      _.isEmpty(state.amount),
      _.isEmpty(state.startDate),
      _.isEmpty(state.lastDate),
      _.isEmpty(state.courseLevel),
      _.isEmpty(state.corseName),
      _.isEmpty(state.scoreType),
      _.isEmpty(state.score),
      _.isEmpty(state.yearOfPassing),
      _.isEmpty(state.gender),
      _.isEmpty(state.income),
    );
    if (
      _.isEmpty(state.name) ||
      _.isEmpty(state.description) ||
      _.isEmpty(state.type) ||
      _.isEmpty(state.for) ||
      _.isEmpty(state.amount) ||
      _.isEmpty(state.startDate) ||
      _.isEmpty(state.lastDate) ||
      _.isEmpty(state.courseLevel) ||
      _.isEmpty(state.corseName) ||
      _.isEmpty(state.scoreType) ||
      _.isEmpty(state.score) ||
      _.isEmpty(state.yearOfPassing) ||
      _.isEmpty(state.gender) ||
      _.isEmpty(state.income)
    ) {
      setGlobalState({
        ...globalState,
        snackbar: {
          open: true,
          message: 'Field Are Missing',
          severity: 'error',
        },
      });
      return;
    }
    var data = {
      schemeName: state?.name,
      schemeDescription: state?.description,
      schemeType: state?.type,
      schemeFor: state.for,
      financialYear: '2022-2023',
      schemeAmount: state.amount,
      startDate: state.startDate,
      endDate: state.lastDate,
      eligibility: {
        acadDtls: [
          {
            courseLevelID: 'gr',
            courseLevelName: state.courseLevel,
            courseName: state.corseName,
            scoreType: state.scoreType,
            scoreValue: state.score,
            passingYear: state.yearOfPassing,
          },
        ],
        gender: state.gender,
        familyIncome: state.income,
      },
      addtnlInfoReq: state.additionInfo,
    };

    if (state.additionInfo) {
      data.spocName = state.additionInfo ? state.spocName : '';
      data.spocEmail = state.additionInfo ? state.spocEmail : '';
      data.helpdeskNo = state.additionInfo ? state.deskNo : '';
    }

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/create`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Scheme Added',
            severity: 'success',
          },
        });
        navigate('/home/dashboard');
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

  const handleUpdate = () => {
    console.log(
      _.isEmpty(state.name),
      _.isEmpty(state.description),
      _.isEmpty(state.type),
      _.isEmpty(state.for),
      _.isEmpty(state.amount),
      _.isEmpty(state.startDate),
      _.isEmpty(state.lastDate),
      _.isEmpty(state.courseLevel),
      _.isEmpty(state.corseName),
      _.isEmpty(state.scoreType),
      _.isEmpty(state.score),
      _.isEmpty(state.yearOfPassing),
      _.isEmpty(state.gender),
      _.isEmpty(state.income),
    );
    if (
      _.isEmpty(state.name) ||
      _.isEmpty(state.description) ||
      _.isEmpty(state.type) ||
      _.isEmpty(state.for) ||
      _.isEmpty(state.amount) ||
      _.isEmpty(state.startDate) ||
      _.isEmpty(state.lastDate) ||
      _.isEmpty(state.courseLevel) ||
      _.isEmpty(state.corseName) ||
      _.isEmpty(state.scoreType) ||
      _.isEmpty(state.score) ||
      _.isEmpty(state.yearOfPassing) ||
      _.isEmpty(state.gender) ||
      _.isEmpty(state.income)
    ) {
      setGlobalState({
        ...globalState,
        snackbar: {
          open: true,
          message: 'Field Are Missing',
          severity: 'error',
        },
      });
      return;
    }
    var data = {
      schemeName: state?.name,
      schemeDescription: state?.description,
      schemeType: state?.type,
      schemeFor: state.for,
      financialYear: '2022-2023',
      schemeAmount: state.amount,
      startDate: state.startDate,
      endDate: state.lastDate,
      eligibility: {
        acadDtls: [
          {
            courseLevelID: 'gr',
            courseLevelName: state.courseLevel,
            courseName: state.corseName,
            scoreType: state.scoreType,
            scoreValue: state.score,
            passingYear: state.yearOfPassing,
          },
        ],
        gender: state.gender,
        familyIncome: state.income,
      },
      addtnlInfoReq: state.additionInfo,
      createdAt: state.createdAt,
    };

    if (state.additionInfo) {
      data.spocName = state.additionInfo ? state.spocName : '';
      data.spocEmail = state.additionInfo ? state.spocEmail : '';
      data.helpdeskNo = state.additionInfo ? state.deskNo : '';
    }

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${Config.apiEndPoint}/scheme/${searchParams.get('id')}`,
      headers: {
        Authorization: localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setGlobalState({
          ...globalState,
          snackbar: {
            open: true,
            message: 'Scheme Updated',
            severity: 'success',
          },
        });
        navigate('/home/dashboard');
        // TODO: redirect to view
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
    if (edit) {
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
          console.log(response.data);
          setState({
            ...state,
            name: response.data.schemeName,
            description: response.data.schemeDescription,
            startDate: response.data.startDate,
            lastDate: response.data.endDate,
            type: response.data.schemeType,
            amount: response.data.schemeAmount,
            for: response.data.schemeFor,

            gender: response.data.eligibility.gender,
            income: response.data.eligibility.familyIncome,

            courseLevel: response.data.eligibility.acadDtls[0].courseLevelName,
            corseName: response.data.eligibility.acadDtls[0].courseName,
            scoreType: response.data.eligibility.acadDtls[0].scoreType,
            score: response.data.eligibility.acadDtls[0].scoreValue,
            yearOfPassing: response.data.eligibility.acadDtls[0].passingYear,

            spocName: response.data.spocName,
            spocEmail: response.data.spocEmail,
            deskNo: response.data.helpdeskNo,

            additionInfo: response.data.addtnlInfoReq,

            createdAt: response.data.createdAt,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ backgroundColor: 'var(--bg-secondary)', my: 2, p: 1 }}>
        <Typography variant="h5">Basic info</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
        >
          {/* col 1 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInput label={'Name of Scheme'} value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
            <FormSelect label={'Scheme type'} value={state.type} items={schemeTypes} onChange={(e) => setState({ ...state, type: e.target.value })} />
          </Box>

          {/* col 2 */}
          <FormInput label={'Scheme description'} value={state.description} multiline={true} onChange={(e) => setState({ ...state, description: e.target.value })} />

          {/* col 3 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormDatePicker label={'Start date'} value={state.startDate} onChange={(e) => setState({ ...state, startDate: e })} />
            <FormDatePicker label={'Last date'} value={state.lastDate} onChange={(e) => setState({ ...state, lastDate: e })} />
          </Box>

          {/* col 4 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInput label={'Scheme amount'} value={state.amount} onChange={(e) => setState({ ...state, amount: e.target.value })} />
            <FormInput label={'Scheme for'} value={state.for} onChange={(e) => setState({ ...state, for: e.target.value })} />
          </Box>
        </Box>
      </Box>

      {/* Eligibility criteria */}
      <Box sx={{ backgroundColor: 'var(--bg-secondary)', my: 1, p: 1 }}>
        <Typography variant="h5">Eligibility criteria</Typography>
        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
          <FormSelect label={'Gender'} value={state.gender} items={schemeGender} onChange={(e) => setState({ ...state, gender: e.target.value })} />
          <FormInput label={'Family income'} value={state.income} onChange={(e) => setState({ ...state, income: e.target.value })} />
        </Box>
      </Box>

      {/* Academic criteria */}
      <Box sx={{ backgroundColor: 'var(--bg-secondary)', my: 1, p: 1 }}>
        <Typography variant="h5">Academic criteria</Typography>
        <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormSelect label={'Course Level Name'} value={state.courseLevel} items={schemeCourseLevel} onChange={(e) => setState({ ...state, courseLevel: e.target.value })} />
            <FormInput label={'Course Name'} value={state.corseName} onChange={(e) => setState({ ...state, corseName: e.target.value })} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormSelect label={'Score type'} value={state.scoreType} items={schemeScoreType} onChange={(e) => setState({ ...state, scoreType: e.target.value })} />
            <FormInput label={'Score'} value={state.score} onChange={(e) => setState({ ...state, score: e.target.value })} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormInput label={'Year of passing'} value={state.yearOfPassing} onChange={(e) => setState({ ...state, yearOfPassing: e.target.value })} />
          </Box>
        </Box>
      </Box>

      {/* Additional info */}

      <Box sx={{ backgroundColor: 'var(--bg-secondary)', my: 1, p: 1 }}>
        <Box>
          Addition information required? <Switch check={state.additionInfo ? 'true' : 'false'} onChange={() => setState({ ...state, additionInfo: !state.additionInfo })} />
        </Box>
        {state.additionInfo && (
          <>
            <Typography variant="h5">Additional information</Typography>
            <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormInput label={'Spoc Name'} value={state.spocName} onChange={(e) => setState({ ...state, spocName: e.target.value })} />
                <FormInput label={'Spoc Email'} value={state.spocEmail} onChange={(e) => setState({ ...state, spocEmail: e.target.value })} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormInput label={'Help desk no'} value={state.deskNo} onChange={(e) => setState({ ...state, deskNo: e.target.value })} />
              </Box>
            </Box>
          </>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <ButtonGroup>
          <FormButton label="Cancel" color={'error'} onClick={() => navigate('/home/dashboard')} />
          <FormButton label={edit ? 'Update' : 'Create'} color={'success'} onClick={edit ? handleUpdate : handleSubmit} />
        </ButtonGroup>
      </Box>
    </Box>
  );
};
