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
    // get user id and username
    const id = req.user.id;
    const username = req.user.username;
    // get kitchen name from req.body
    const kitchen = req.body.name;
    const listName = `${username}'s ${kitchen} Shopping List`;
    console.log( 'Got POST kitchen on server user id:', id, 'kitchen name:', kitchen );

    // requires two queries
    // first to create new shopping list into database and get id back
    const firstQueryText = `INSERT INTO "shopping_list" ("name")
                            VALUES ($1) RETURNING "id";`;
    // second to insert kitchen with new shopping list id into database and get id back
    const secondQueryText = `INSERT INTO "kitchen" ("name", "shopping_list_id")
                        VALUES ($1, $2) RETURNING "id";`;
    // third query to associate kitchen with user in user_kitchen table
    const thirdQueryText = `INSERT INTO "user_kitchen" ("user_id", "kitchen_id")
                        VALUES($1, $2);`;

    pool.query( firstQueryText, [listName])
        .then( (response) => {
            console.log( 'Created shopping list with id:', response.rows[0].id );
            pool.query( secondQueryText, [ `${username}'s ${kitchen}`, response.rows[0].id ] )
                .then( (response) => {
                    console.log( 'Created kitchen with id:', response.rows[0].id );
                    pool.query( thirdQueryText, [ id, response.rows[0].id ] )
                        .then( (response) => {
                            console.log( 'New kitchen created.' );
                            res.sendStatus( 201 );
                        })
                })
        })
        .catch( (error) => {
            console.log( 'Error adding kitchen', error );
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