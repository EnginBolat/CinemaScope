import { RootPopular } from '@models/Popular';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig } from 'axios';
import { AppEndpoints } from '@constants/AppEndpoints'
import { BASE_URL } from '@constants/AppConfig';
import { MovieDetails } from '@models/MovieDetailts';
import { CastRoot } from '@models/Cast';
import { NowPlayingRoot } from '@models/NowPlaying';

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
                        Authorization: `Bearer ${process.env.API_REQUEST_TOKEN}`
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
        }),
        movieDetailsById: build.query<MovieDetails, string>({
            query: (id: string) => ({
                url: AppEndpoints.movieDetailsById(id).url,
                method: AppEndpoints.movieDetailsById(id).method
            })
        }),
        movieCastByMovieId: build.query<CastRoot, string>({
            query: (movieId: string) => ({
                url: AppEndpoints.movieCastByMovieId(movieId).url,
                method: AppEndpoints.movieCastByMovieId(movieId).method
            })
        }),
        nowPlayingMovie: build.query<NowPlayingRoot, number>({
            query: (page: number) => ({
                url: AppEndpoints.nowPlayingMovie(page).url,
                method: AppEndpoints.nowPlayingMovie(page).method
            })
        }),
        upcomingMovie: build.query<NowPlayingRoot, number>({
            query: (page: number) => ({
                url: AppEndpoints.upcomingMovie(page).url,
                method: AppEndpoints.upcomingMovie(page).method
            })
        })
    }),
});

export const { useGetPopularContentQuery, useMovieDetailsByIdQuery, useMovieCastByMovieIdQuery, useNowPlayingMovieQuery, useUpcomingMovieQuery } = api;
