
import { USER_LIST_API } from "../../apiEndpoints";
import { baseApi } from "../../baseApi";


export const userList = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserLists: builder.query({
            query: () => ({
                url: USER_LIST_API,
                method: 'get',
            }),
        }),
    }),
});

export const {
    useGetUserListsQuery
} = userList;


