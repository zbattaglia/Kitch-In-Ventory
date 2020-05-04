const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET ROUTE TO GET SHOPPING LIST FOR USER
router.get('/', rejectUnauthenticated, (req, res) => {
    // set id to user id if authenticated from rejectUnauthenticated
    const id = req.user.id;
    console.log( 'Getting shopping list for user with id:', id );

    // make queryText to query database to get all items on a list for the current user
    const queryText = `SELECT "shopping_list"."name" AS "listName", "shopping_list"."id" AS "listId", 
                        "item"."name" AS "itemName", "item"."id" AS "itemId", "shoppingList_item"."belowMin",
                        "shoppingList_item"."quantity" FROM "shoppingList_item"
                        FULL OUTER JOIN "item" ON "shoppingList_item"."item_id" = "item"."id"
                        FULL OUTER JOIN "shopping_list" ON "shoppingList_item"."list_id" = "shopping_list"."id"
                        FULL OUTER JOIN "kitchen" ON "kitchen"."shopping_list_id" = "shopping_list"."id"
                        FULL OUTER JOIN "user_kitchen" ON "user_kitchen"."kitchen_id" = "kitchen"."id"
                        FULL OUTER JOIN "user" ON "user"."id" = "user_kitchen"."user_id"
                        WHERE "user"."id" = $1;`;
    // query dataBase with query text for this user id
    pool.query( queryText, [ id ] )
        .then( (response) => {
            // console.log( 'Got shopping list for user', response.rows );
            // format the response.rows into an array that will be easier for the client side to map over
            // create a blank array for the formatted shopping list
            let shoppingList = [];
            // if there is anything returned on the list push an object into the list 
            // the listName and id are the name and id of the first response row, and the items object contains the
            // item, id, and quantity from the first response.row
            if( response.rows.length > 0 ){
                shoppingList.push( {
                    listName: response.rows[0].listName,
                    listId: response.rows[0].listId,
                    items: [ { itemName: response.rows[0].itemName, itemId: response.rows[0].itemId,
                        quantity: response.rows[0].quantity, belowMin: response.rows[0].belowMin } ]
                });
                // loop over the remaining response rows
                // if there list.name is the same as the list name already in the shoppingList array,
                // ignore the name and listId and push the item, itemId and quantity into the list of items in the shopping list
                for( let i = 1; i < response.rows.length; i++ ) {
                    if( response.rows[i].listName === shoppingList[shoppingList.length - 1].listName ) {
                        shoppingList[shoppingList.length - 1].items.push(
                            {itemName: response.rows[i].itemName, itemId: response.rows[i].itemId,
                                quantity: response.rows[i].quantity, belowMin: response.rows[i].belowMin }
                        )
                    }
                    // else create a new list object in the shopping list array, same as initial step
                    else {
                        shoppingList.push( {
                            listName: response.rows[i].listName,
                            listId: response.rows[i].listId,
                            items: [ { itemName: response.rows[i].itemName, itemId: response.rows[i].itemId,
                                quantity: response.rows[i].quantity, belowMin: response.rows[0].belowMin } ]
                        })
                    }
                }
            }
            // console.log( 'shoppingList =', shoppingList[0] );
            // send formatted shopping list back to the client
            res.send( shoppingList );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end GET route

// GET ROUTE TO GET SHOPPING LIST FOR USER
router.post('/', rejectUnauthenticated, (req, res) => {
    // set id to user id if authenticated from rejectUnauthenticated
    const id = req.user.id;
    const itemId = req.body.itemId;
    console.log( 'Adding item to shopping list with item id:', itemId );

    // make queryText to query database to get all items on a list for the current user
    // const queryText = `SELECT "user"."id", "shopping_list"."name" AS "listName", "item"."name", "shoppingList_item"."quantity" FROM "shoppingList_item"
    //                     FULL OUTER JOIN "item" ON "shoppingList_item"."item_id" = "item"."id"
    //                     FULL OUTER JOIN "shopping_list" ON "shoppingList_item"."list_id" = "shopping_list"."id"
    //                     FULL OUTER JOIN "kitchen" ON "kitchen"."shopping_list_id" = "shopping_list"."id"
    //                     FULL OUTER JOIN "user_kitchen" ON "user_kitchen"."kitchen_id" = "kitchen"."id"
    //                     FULL OUTER JOIN "user" ON "user"."id" = "user_kitchen"."user_id"
    //                     WHERE "user"."id" = $1;`;
    // // query dataBase with query text for this user id
    // pool.query( queryText, [ id ] )
    //     .then( (response) => {
    //         console.log( 'Got shopping list for user', response.rows );
    //         res.send( response.rows );
    //     })
    //     .catch( (error) => {
    //         console.log( 'Error Getting Kitchens', error );
    //         res.sendStatus( 500 );
    //     });
}); // end GET route

router.delete('/:itemId/:listId', rejectUnauthenticated, (req, res) => {
    // get current kitchen id from req.params
    const itemId = req.params.itemId;
    const listId = req.params.listId;
 
    console.log( 'Deleting Item from shopping list on database', itemId, listId );

    // make queryText to query database
    const queryText = `DELETE FROM "shoppingList_item"
                        WHERE "shoppingList_item"."item_id" = $1
                        AND "shoppingList_item"."list_id" = $2;`;
    // // query dataBase with query text
    pool.query( queryText, [ itemId, listId ] )
        .then( (response) => {
            res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error Getting Kitchens', error );
            res.sendStatus( 500 );
        });
}); // end DELETE ROUTE

// Route to update shopping list with items at or below their minimum specified quantity
router.put('/update/:kitchenId', rejectUnauthenticated, (req, res) => {
    // get current kitchen id from req.params
    // get inventory from req.body
    // create variable for items in inventory that are not to be on shopping list,
    // and items that are
    const kitchenId = req.params.kitchenId;
    const inventory = req.body;
    const removeFromList = [];
    const addToList = [];
    console.log( 'The inventory is:', inventory );
    // map over inventory and if items are at or below their minimum quantity,
    // add to list of items to be added to shopping list
    // else add to list of items that should not be on shopping list
    inventory.map( item => {
        if( item.item_id != null ) {
            if( Number(item.quantity) <= Number(item.minimum_quantity) ) {
                item.belowMin = true;
                addToList.push( item );
            }
            else {
                item.belowMin = false;
                removeFromList.push( item );
            }
        }
    }); // end map
    console.log( `Updating shopping list for kitchen with id ${kitchenId}.
                    Adding items: ${addToList} and removing: ${removeFromList}`, inventory );

    // first query uses kithen id to get the current shopping list id
    // the second query deletes items that no loner need to be on the list
    // the final query then adds all items that should be on the list
    const queryTextOne = `SELECT "shopping_list_id" FROM "kitchen"
                            WHERE "kitchen"."id" = $1;`;
    const queryTextTwo = `DELETE FROM "shoppingList_item"
                            WHERE "shoppingList_item"."list_id" = $1
                            AND "shoppingList_item"."item_id" = $2;`;
    const queryTextThree = `SELECT * FROM "shoppingList_item"
                            WHERE "shoppingList_item"."list_id" = $1
                            AND "shoppingList_item"."item_id" = $2;`
    const queryTextFour = `INSERT INTO "shoppingList_item" ("list_id", "item_id", "belowMin")
                            VALUES($1, $2, $3);`;
    // // query dataBase with query text
    pool.query( queryTextOne, [ kitchenId ] )
        .then( (response) => {
            console.log( 'Got Shopping list id', response.rows );
            for( removeItem of removeFromList ) {
                pool.query( queryTextTwo, [ response.rows[0].shopping_list_id, removeItem.item_id ] )
            };
            for( addItem of addToList ) {
                let listId = response.rows[0].shopping_list_id;
                pool.query( queryTextThree, [ listId, addItem.item_id ] )
                    .then( (response) => {
                        console.log( 'result of queryTextThree', response.rows[0] );
                        if( response.rows[0] === undefined ) {
                            pool.query( queryTextFour, [ listId, addItem.item_id, addItem.belowMin ] )
                                .then( (response) => {
                                    res.sendStatus( 200 );
                                })
                                .catch( (error) => {
                                    console.log( 'Error updating shopping list', error );
                                })
                        }
                    })
            };
            // res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error Updating shopping List', error );
            res.sendStatus( 500 );
        });
}); // end PUT ROUTE

// Route to update item on shopping list with specified quantity
router.put('/edit/:itemId/:listId', rejectUnauthenticated, (req, res) => {
    // extract id's from params and quantity from req.body
    const itemId = req.params.itemId;
    const listId = req.params.listId;
    const quantity = req.body.quantity;
    console.log( `Changing quantity of item ${itemId} to ${quantity} on list ${listId}` );

    // query the database
    let queryText = `UPDATE "shoppingList_item"
                    SET "quantity" = $1
                    WHERE "list_id"= $2 AND "item_id" = $3;`;

    pool.query( queryText, [ quantity, listId, itemId ] )
        .then( (response) => {
            res.sendStatus( 200 );
        })
        .catch( (error) => {
            console.log( 'Error editing item on database', error );
            res.sendStatus( 500 );
        });

}); // end PUT ROUTE



module.exports = router;