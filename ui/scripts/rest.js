/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
"use strict";

Axios.get('v1/vpgs', {headers: {token: 'sdfdf'}})
    .then((successResult) => {
        return successResult;

    }, (error) => {
        return error;
    };