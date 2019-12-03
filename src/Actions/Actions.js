// Action Creators
export const request = () => {
    return { type: 'REQUESTED' }
};

export const requestDogSuccess = (data) => {
    return { type: 'REQUESTED_SUCCEEDED', payload: data }
};


export const requestDogError = () => {
    return { type: 'REQUESTED_FAILED' }
};

export const fetchDog = () => {
    return { type: 'FETCHED' }
};