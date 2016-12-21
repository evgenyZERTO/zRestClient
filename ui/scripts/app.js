/**
 * Created by evgeny.rivkin on 21/12/2016.
 */
auth('172.20.133.234', '9669', 'administrator', 'zertodata')
auth('172.20.134.234', '9669', 'administrator', 'Zertodata1!')
auth('172.20.140.234', '9669', 'administrator', 'Zertodata1!')

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