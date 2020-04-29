const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET ROUTE TO GET ALL USERS KITCHENS
router.get('/', rejectUnauthenticated, (req, res) => {
    // console.log( 'Getting Kitchens on server', req.user)
    // set id to user id if authenticated from rejectUnauthenticated
    const id = req.user.id;

    // make queryText to query database
    const queryText = `SELECT "user"."id", "user"."username", "kitchen_id", "kitchen"."name" FROM "user_kitchen"
                        JOIN "user" ON "user_kitchen"."user_id" = "user"."id"
                        JOIN "kitchen" ON "user_kitchen"."kitchen_id" = "kitchen"."id"
                        WHERE "user"."id" = $1;`;
    // query dataBase with query text for this user id
    pool.query( queryText, [ id ] )
        .then( (response) => {
            // console.log( 'Got kitchens for user', response.rows );
            res.send( response.rows );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end GET route

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;