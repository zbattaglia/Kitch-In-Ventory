const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();
const sendEmail = require('../modules/emailer');

// POST route to add invite to database
router.post( '/', (req, res) => {
    // extract userName and kitchenId from request body
    const userName = req.body.user;
    const kitchenId = req.body.kitchenId;
    const sender = req.user.username;
    // empty global variable for email to be assigned from query response to invited user's email
    let email;
    console.log( `Inviting user ${userName} to kitchen with id ${kitchenId}` );

    // first query to get user id from username
    // second is to add invite to invite list on database
    queryTextOne = `SELECT "id", "email" FROM "user" WHERE "username" = $1;`;
    queryTextTwo = `INSERT INTO "invite" ("user_id", "kitchen_id") VALUES ($1, $2);`;

    pool.query( queryTextOne, [ userName ] )
        .then( (response) => {
            // console.log( 'got kitchen it:', response.rows[0].id );
            // pass response.id into next query, and pass userName and email to sendEmail function
            email = response.rows[0].email;
            sendEmail( {userName, email, sender} );
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

// GET route to get user's open invites
router.get( '/', rejectUnauthenticated, (req, res) => {
    // console.log( 'Getting user invites', req.user );

    queryText = `SELECT "kitchen"."id", "kitchen"."name" FROM "invite"
                    JOIN "kitchen" ON "invite"."kitchen_id" = "kitchen"."id"
                    WHERE "invite"."user_id" = $1;`
    pool.query( queryText, [ req.user.id ] )
        .then( (response) => {
            console.log( 'Got user invites', response.rows );
            res.send( response.rows );
        })
        .catch( (error) => {
            console.log( 'Error getting invites from database', error );
        })
}); // end GET ROUTE

// DELETE ROUTE to delete invite when it is accepted
router.delete( '/:kitchenId', rejectUnauthenticated, (req, res) => {
    // extract kitchenId from params and userId from authentication
    const kitchenId = req.params.kitchenId;
    const userId = req.user.id;
    console.log( `Accepting invite to kitchen ${kitchenId} for user ${userId}` );
    
    // first query to delete invite from invite table,
    // second query to add that user to kitchen
    const queryTextOne = `DELETE FROM "invite" WHERE "invite"."user_id" = $1
                        AND "invite"."kitchen_id" = $2;`;
    const queryTextTwo = `INSERT INTO "user_kitchen" ("user_id", "kitchen_id")
                            VALUES ($1, $2);`;

    pool.query( queryTextOne, [ userId, kitchenId ] )
        .then( (response) => {
            pool.query( queryTextTwo, [ userId, kitchenId ] )
                .then( (response) => {
                    console.log( 'Added user to invited kitchen' );
                    res.sendStatus( 200 );
                })
                .catch( (error) => {
                    console.log( 'Error adding user to kitchen', error );
                    res.sendStatus( 500 );
                });
            })
            .catch( (error) => {
                console.log( 'Error deleting invite', error );
                res.sendStatus( 500 );
            })
    })

module.exports = router;