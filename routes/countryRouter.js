const router = require('express').Router();
const { countryModel } = require('../models/countryModel');
const { ErrorBody } = require('../utils/ErrorBody');


router.route('/')
    .get(async (req, res, next) => {
        try {
            var country = req.query.country;
            country = country ? country.toLowerCase() : null;
            if (!country) {
                return next(new ErrorBody(400, "Bad Inputs", []));
            }
            else {
                const record = await countryModel.findOne({ country: country });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ message: 'Successfully retrieved states.', error: false, data: record });
            }
        } catch (error) {
            next({});
        }
    })
    .post(async (req, res, next) => {
        try {
            const states = [
                'Andhra Pradesh',
                'Arunachal Pradesh',
                'Assam',
                'Bihar',
                'Chhattisgarh',
                'Goa',
                'Gujarat',
                'Haryana',
                'Himachal Pradesh',
                'Jharkhand',
                'Karnataka',
                'Kerala',
                'Madhya Pradesh',
                'Maharashtra',
                'Manipur',
                'Meghalaya',
                'Mizoram',
                'Nagaland',
                'Odisha',
                'Punjab',
                'Rajasthan',
                'Sikkim',
                'Tamil Nadu',
                'Telangana',
                'Tripura',
                'Uttar Pradesh',
                'Uttarakhand',
                'West Bengal',
                'Andaman and Nicobar Islands',
                'Chandigarh',
                'Dadra & Nagar Haveli and Daman & Dilu',
                'Delhi',
                'Jammu & Kashmir',
                'Ladakh',
                'Lakshadweep',
                'Puducherry'
            ];
            for (let [i, state] of states.entries()) {
                states[i] = state.replace(/\s+/g, ' ').trim();
            }
            const country = new countryModel({
                country: "India",
                state_list: states
            });
            await country.save();
            res.json({ status: "success" });
        } catch (error) {
            next({});
        }
    });

module.exports = router;

module.exports =router.get('/getCountryList',async (req, res, next) => {
    try {
        const record = await countryModel.find();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Successfully retrieved states.', error: false, data: record }); 
    } catch (error) {
        next({});
    }
});