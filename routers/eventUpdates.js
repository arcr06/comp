const express = require('express');
const router = express();

router.get('/',(req,res) => {
    const value = [{
            title: 'IT_MANAGER',
            desc: 'ROUND 5 PEOPLE',
            people: [
                'Person -1',
                'Person -2',
                'Person -3',
                'Person -4'
            ]
        },{
            title: 'CODING',
            desc: 'ROUND 9 PEOPLE',
            people: [
                'Person -1',
                'Person -4'
            ]
        },{
            title: 'TEMPLE_RUN',
            desc: 'ROUND 4 PEOPLE',
            people: [
                'Person -1',
                'Person -2',
                'Person -4'
            ]
        },{
            title: 'WEB_DESIGNING',
            desc: 'ROUND 4 PEOPLE',
            people: [
                'Person -1',
                'Person -2',
                'Person -3',
                'Person -4'
            ]
        }
    ]
    res.send({value});
});

module.exports = router;