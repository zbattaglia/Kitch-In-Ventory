const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// sendEmail to sendEmails to users
const sendEmail = require('../modules/emailer');
const cron = require('node-cron');

// this router exists only on the server to send automated email updates to user's
cron.schedule( '*/10 * * * * *', () => {

console.log( 'In automated email router' );

queryTextOne = `SELECT * FROM "user";`;
queryTextTwo = `SELECT "user"."username", "user"."email", "shopping_list"."name" AS "listName", "item"."name" AS "itemName", "shoppingList_item"."quantity" FROM "shoppingList_item"
FULL OUTER JOIN "item" ON "shoppingList_item"."item_id" = "item"."id"
FULL OUTER JOIN "shopping_list" ON "shoppingList_item"."list_id" = "shopping_list"."id"
FULL OUTER JOIN "kitchen" ON "shopping_list"."id" = "kitchen"."shopping_list_id"
FULL OUTER JOIN "user_kitchen" ON "kitchen"."id" = "user_kitchen"."kitchen_id"
FULL OUTER JOIN "user" ON "user_kitchen"."user_id" = "user"."id"
WHERE "user"."id" = '2';`

pool.query( queryText )
    .then( (response) => {
        console.log( 'Automatically got all users', response.rows );
        let users = response.rows;
        users.map( user => {
            pool.query( queryTextTwo, [ user.id ] )
        })
    })
    .catch( (error) => {
        console.log( 'Error automatically getting users', error );
    })

    console.log( 'Got all users', users)
});

module.exports = router;