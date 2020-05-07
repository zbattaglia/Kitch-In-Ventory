const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// POST route to add invite to database
router.post( '/', (req, res) => {
    // extract userName and kitchenId from request body
    const userName = req.body.user;
    const kitchenId = req.body.kitchenId;
    console.log( `Inviting user ${userName} to kitchen with id ${kitchenId}` );

    // first query to get user id from username
    // second is to add invite to invite list on database
    queryTextOne = `SELECT "id" FROM "user" WHERE "username" = $1;`;
    queryTextTwo = `INSERT INTO "invite" ("user_id", "kitchen_id") VALUES ($1, $2);`;

    pool.query( queryTextOne, [ userName ] )
        .then( (response) => {
            // console.log( 'got kitchen it:', response.rows[0].id );
            pool.query( queryTextTwo, [ response.rows[0].id, kitchenId ] )
                .then( (response) => {
                    res.sendStatus( 200 );
                })
                .catch( (error) => {
                    console.log( 'Error adding invite', error );
                })
        })
        .catch( (error) => {
            console.log( 'Error getting user.id to add invite', error );
        })
}); // end POST route

module.exports = router;