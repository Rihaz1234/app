export interface TableAPIResponse{
    data: {
        items: any[],
        total: number
    },
    message: string,
    status: string
}

export interface GetAPIResponse {
    data: any;
    message: string;
    status: string;
}