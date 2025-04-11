import { RootPopular } from '@models/Popular';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig } from 'axios';
import { AppEndpoints, Token } from '@constants/AppEndpoints'
import { BASE_URL } from '@constants/AppConfig';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    config => config,
    error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
);

export default axiosInstance;

type IAxiosBaseQuery = {
    url: AxiosRequestConfig['url'];
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
};

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers }: IAxiosBaseQuery) => {
            try {
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: {
                        ...headers,
                        Authorization: `Bearer ${Token}`
                    },
                });
                return { data: result };
            } catch (axiosError: any) {
                const err = axiosError;
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export const api = createApi({
    baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
    endpoints: build => ({
        getPopularContent: build.query<RootPopular, void>({
            query: () => ({
                url: AppEndpoints.popular.url,
                method: AppEndpoints.popular.method
            })
        })
    }),
});

export const { useGetPopularContentQuery } = api;
