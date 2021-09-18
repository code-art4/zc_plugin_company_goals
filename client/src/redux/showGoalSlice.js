import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';

     export const getGoals = createAsyncThunk('showGoal/getGoals',async () => {
       return fetch('https://goals.zuri.chat/api/v1/goals?org_id=200').then(res => 
         res.json()
       )
     })

export const showGoalSlice = createSlice({
  name: 'showGoal',
  initialState: {
    list: [getGoals],
    status: null,
    errorMessage: null
  },
  extraReducers: {
    [getGoals.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getGoals.fulfilled]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getGoals.rejected]: (state, {error}) => {   
      state.errorMessage = error.message;
      state.status = 'failed';
    },
  },
});

export default showGoalSlice.reducer;