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
    const queryText = `SELECT "kitchen_id", "kitchen"."name" FROM "user_kitchen"
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

// POST ROUTE TO ADD A NEW KITCHEN TO DATABASE
router.post('/', rejectUnauthenticated, (req, res) => {
    const id = req.user.id;
    const kitchen = req.body.name;
    console.log( 'Got POST kitchen on server', id, kitchen );

    const firstQueryText = `INSERT INTO "kitchen" ("name")
                        VALUES ($1) RETURNING "id";`;
    const secondQueryText = `INSERT INTO "user_kitchen" ("user_id", "kitchen_id")
                        VALUES($1, $2);`;

    pool.query( firstQueryText, [ kitchen ] )
        .then( (response) => {
            console.log( 'Added kitchen to database', response.rows[0] );
            pool.query( secondQueryText, [ id, response.rows[0].id ] )
                .then( (response) => {
                    console.log( 'Added kitchen to kitchen table and updated kitchen_user table' );
                    res.sendStatus( 201 );
                })
        })
        .catch( (error) => {
            console.log( 'Error adding kitchen to databse', error );
            res.sendStatus( 501 );
        })
});

// GET ROUTE TO GET ALL ITEMS IN A USERS KITCHEN
router.get('/inventory/:kitchenId', rejectUnauthenticated, (req, res) => {
    const kitchenId = req.params.kitchenId;
    // console.log( 'Getting items on server', req.user, req.params.kitchenId );

    // make queryText to query database
    const queryText = `SELECT "item_id",  "item"."name", "quantity", "unit", "minimum_quantity" FROM "kitchen_item"
                        FULL OUTER JOIN "kitchen" ON "kitchen_item"."kitchen_id" = "kitchen"."id"
                        FULL OUTER JOIN "item" ON "kitchen_item"."item_id" = "item"."id"
                        WHERE "kitchen"."id" = $1;`;
    // // query dataBase with query text for this user id
    pool.query( queryText, [ kitchenId ] )
        .then( (response) => {
            console.log( 'Got kitchen inventory', response.rows );
            res.send( response.rows );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end GET route

module.exports = router;