const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET ROUTE TO GET ALL USERS KITCHENS
router.get('/:itemId/:kitchenId', rejectUnauthenticated, (req, res) => {
    // get current kitchen and item Id from req.params
    const kitchenId = req.params.kitchenId;
    const itemId = req.params.itemId;
    console.log( 'Getting item to edit:', itemId, 'in kitchen:', kitchenId );

    // make queryText to query database
    const queryText = `SELECT "item"."id", "item"."name", "quantity", "unit", "minimum_quantity" FROM "kitchen_item"
                        FULL OUTER JOIN "item" ON "kitchen_item"."item_id" = "item"."id"
                        FULL OUTER JOIN "kitchen" ON "kitchen_item"."kitchen_id" = "kitchen"."id"
                        WHERE "kitchen"."id" = $1
                        AND "item"."id" = $2;`;
    // query dataBase with query text for this user id
    pool.query( queryText, [ kitchenId, itemId ] )
        .then( (response) => {
            // console.log( 'Got item to edit', response.rows );
            res.send( response.rows[0] );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end GET route

// PUT ROUTE to update specific item on database
router.put('/:kitchenId', rejectUnauthenticated, (req, res) => {
    // get current kitchen id from req.params
    const kitchenId = req.params.kitchenId;
    // extract variables to pass to SQL from req.body
    const itemId = req.body.itemId
    const quantity = req.body.itemDetails.quantity;
    const unit = req.body.itemDetails.unit;
    const minimum_quantity = req.body.itemDetails.minimumQuantity;
    // console.log( 'Passing edit info to database', req.body, quantity, unit, minimum_quantity, kitchenId );

    // make queryText to query database
    const queryText = `UPDATE "kitchen_item"
                        SET "quantity" = $1, "unit" = $2, "minimum_quantity" = $3
                        WHERE "kitchen_item"."kitchen_id" = $4 AND "kitchen_item"."item_id" = $5;`;
    // query dataBase with query text
    pool.query( queryText, [ quantity, unit, minimum_quantity, kitchenId, itemId ] )
        .then( (response) => {
            // console.log( 'Edited Item' );
            res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end PUT ROUTE

// DELETE ROUTE to delete item form kitchen on database
router.delete('/:itemId/:kitchenId', rejectUnauthenticated, (req, res) => {
    // get current kitchen id from req.params
    const itemId = req.params.itemId;
    const kitchenId = req.params.kitchenId;
 
    console.log( 'Deleting Item from database', itemId, kitchenId );

    // // make queryText to query database
    const queryText = `DELETE FROM "kitchen_item"
                        WHERE "kitchen_item"."kitchen_id" = $1
                        AND "kitchen_item"."item_id" = $2;`;
    // // query dataBase with query text
    pool.query( queryText, [ kitchenId, itemId ] )
        .then( (response) => {
            res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end DELETE ROUTE

// POST ROUTE TO ADD A NEW ITEM TO A KITCHEN ON DATABASE
router.post('/:id', rejectUnauthenticated, (req, res) => {
    // extract current kitchen id from params
    const kitchenId = req.params.id;
    // destructure variables from req.body
    const name = req.body.name;
    const quantity = req.body.quantity;
    const minimum_quantity = req.body.minimumQuantity;
    const unit = req.body.unit;

    console.log( 'Got POST new item on server', kitchenId, name, quantity, minimum_quantity, unit );

    // need multiple queries
    // first query to determine if the item already exists in database
    const firstQueryText = 'SELECT "id" FROM "item" WHERE "name" = $1;';
    // if item does not exist, it will be inserted into table
    const secondQueryText = `INSERT INTO "item" ("name")
                        VALUES ($1) RETURNING "id";`;
    // final query to add item info, kitchen id and item id into kitchen table
    const thirdQueryText = `INSERT INTO "kitchen_item" 
                            ("kitchen_id", "item_id", "quantity", "minimum_quantity", "unit")
                            VALUES($1, $2, $3, $4, $5);`;

    pool.query( firstQueryText, [ name ] )
        .then( (response) => {
            console.log( 'queryOne returned', response.rows[0]);
            // if item dows not exist in table the response from query one will be undefined
            if( response.rows[0] === undefined ) {
                console.log( 'Item does not exist in database' );
                // then the second query will insert new item into table and get new id
                pool.query( secondQueryText, [ name ] )
                    .then( (response) => {
                        pool.query( thirdQueryText, [ kitchenId, response.rows[0].id, quantity, minimum_quantity, unit ] )
                        .then( (response) => {
                            console.log( 'Item added to database', response );
                            res.sendStatus( 201 );
                        })
                    })
            }
            else {
                pool.query( thirdQueryText, [ kitchenId, response.rows[0].id, quantity, minimum_quantity, unit ] )
                .then( (response) => {
                    console.log( 'Item added to database', response );
                    res.sendStatus( 201 );
                })
            }
        })
        .catch( (error) => {
            console.log( 'Error adding item to database', error );
        });
});

module.exports = router;