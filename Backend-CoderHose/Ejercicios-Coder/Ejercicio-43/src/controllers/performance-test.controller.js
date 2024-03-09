function simple (req, res){
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    };
    res.send({sum});
};

function complex (req, res){
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({sum});
};

export {simple, complex}