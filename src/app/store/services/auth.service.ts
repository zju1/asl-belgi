/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envVars } from "../../../constants/envVars";
import { RootState } from "../store.config";
import {
  AuthResult,
  CodeResponse,
  UserSigninData,
  UserSignupData,
} from "../../../interfaces/auth.interface";
import { BaseApi } from "../../../@types";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["MY_DATA", "ASSIGNED_MARKS"],
  baseQuery: fetchBaseQuery({
    baseUrl: envVars.BASE_URL,
    prepareHeaders: (headers, store) => {
      const state = store.getState() as RootState;
      if (state.auth.user) {
        headers.set("Authorization", `${state.auth.user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<BaseApi<AuthResult>, UserSigninData>({
      query: (body) => ({
        url: "signInUser",
        body,
        method: "POST",
      }),
    }),
    signup: builder.mutation<BaseApi<AuthResult>, UserSignupData>({
      query: (body) => ({
        url: "signUpUser",
        body,
        method: "POST",
      }),
    }),
    getAssignedMarks: builder.query<
      BaseApi<{ date: string; marks: CodeResponse[] }[]>,
      any
    >({
      query: (params) => ({
        url: "assignedMarks",
        params,
      }),
      providesTags: ["ASSIGNED_MARKS"],
    }),
    assignMark: builder.mutation<BaseApi, any>({
      query: (body) => ({
        url: "assignMark",
        body,
        method: "POST",
      }),
      invalidatesTags: ["ASSIGNED_MARKS"],
    }),
    getOrgs: builder.query<BaseApi<{ id: number; name: string }[]>, any>({
      query: (params) => ({
        url: "orgs",
        params,
      }),
    }),
    getUsersById: builder.query<
      BaseApi<{ id: number; user_id: string; login: string }[]>,
      any
    >({
      query: (params) => ({
        url: "usersByOrg",
        params,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useGetAssignedMarksQuery,
  useAssignMarkMutation,
  useGetOrgsQuery,
  useGetUsersByIdQuery,
  useSignupMutation,
} = authApi;
