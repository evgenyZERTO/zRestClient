/**
 * Created by evgeny.rivkin on 21/12/2016.
 */


axios.get('/api/auth', {
    params: {
        ip: 12345,
        port:123,
        username:'test',
        password:'pass'
    }
}).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });