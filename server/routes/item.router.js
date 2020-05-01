const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET ROUTE TO GET ALL USERS KITCHENS
router.get('/:itemId:kitchenId', rejectUnauthenticated, (req, res) => {
    // get current kitchen and item Id from req.params
    const kitchenId = req.params.kitchenId;
    const itemId = req.params.itemId;
    // console.log( 'Getting item to edit:', itemId, 'in kitchen:', kitchenId );

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
router.delete('/:itemId:kitchenId', rejectUnauthenticated, (req, res) => {
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

module.exports = router;