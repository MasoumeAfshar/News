import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NewsState = {
  fromDate?: string;
  source?: string[];
  cat?: string[];
}

const searchSlice = createSlice({
  name: 'news',
  initialState: {fromDate:'',source:[], cat:[] } as NewsState,
  reducers: {
    saveParams: (state, {payload}: PayloadAction<NewsState>) => {
     return{
      ...state,
        fromDate: payload.fromDate ,
        source: payload.source,
        cat: payload.cat
      }
    },
  },
});

export const { saveParams } = searchSlice.actions;

export default searchSlice.reducer;


