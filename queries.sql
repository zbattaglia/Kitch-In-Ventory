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
	"user_id" INT REFERENCES "user",
	"kitchen_id" INT REFERENCES "kitchen"
);

CREATE TABLE "kitchen_item" (
	"kitchen_id" INT REFERENCES "kitchen",
	"quantity" NUMERIC DEFAULT '0',
	"minimum_quantity" NUMERIC DEFAULT '0'
);

CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255)
);

ALTER TABLE "kitchen_item"
ADD "item_id" INT REFERENCES "item";

CREATE TABLE "shopping_list" (
	"id" SERIAL PRIMARY KEY,
	"item_id" INT REFERENCES "item",
	"quantity" NUMERIC DEFAULT '0'
);

ALTER TABLE "kitchen"
ADD "shopping_list_id" INT REFERENCES "shopping_list";


-- TABLES BELOW ARE FOR STRETCH GOALS ONLY
CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "recipes_item" (
	"item_id" INT REFERENCES "item",
	"recipe_id" INT REFERENCES "recipes",
	"quantity" NUMERIC DEFAULT '0'
);

ALTER TABLE "user"
ADD "email" VARCHAR(255) NOT NULL;