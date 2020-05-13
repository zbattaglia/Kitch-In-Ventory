CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR (255) NOT NULL,
);

CREATE TABLE "kitchen" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL
);

CREATE TABLE "user_kitchen" (
	"user_id" integer REFERENCES "user",
	"kitchen_id" integer REFERENCES "kitchen"
);

CREATE TABLE "kitchen_item" (
	"kitchen_id" INT REFERENCES "kitchen",
	"quantity" NUMERIC DEFAULT '0',
	"unit" VARCHAR(255) NOT NULL,
	"minimum_quantity" NUMERIC DEFAULT '0',
	"added_to_list" BOOLEAN DEFAULT 'FALSE'
);

ALTER TABLE "kitchen_item"
DROP COLUMN "added_to_list";

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255)
);

ALTER TABLE "kitchen_item"
ADD "item_id" INT REFERENCES "item";

CREATE TABLE "shopping_list" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"added_to_list" BOOLEAN DEFAULT 'FALSE'
);

CREATE TABLE "shoppingList_item" (
"list_id" INT REFERENCES "shopping_list",
"item_id" INT REFERENCES "item",
"quantity" NUMERIC DEFAULT '0',
"belowMin" BOOLEAN DEFAULT 'FALSE',);

CREATE TABLE "invite" (
"user_id" INT REFERENCES "user",
"kitchen_id" INT REFERENCES "kitchen");