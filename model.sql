-- Creator:       MySQL Workbench 6.3.10/ExportSQLite Plugin 0.1.0
-- Author:        Jeremy Overman
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2018-05-28 08:30
-- Created:       2018-05-28 08:14
PRAGMA foreign_keys = OFF;

-- Schema: mydb
ATTACH "mydb.sdb" AS "mydb";
BEGIN;
CREATE TABLE "mydb"."user"(
  "username" VARCHAR(16) NOT NULL,
  "email" VARCHAR(255),
  "password" VARCHAR(32) NOT NULL,
  "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "mydb"."users"(
  "username" VARCHAR(45) PRIMARY KEY NOT NULL,
  "passhash" VARCHAR(45) NOT NULL,
  "email" VARCHAR(45) NOT NULL
);
CREATE TABLE "mydb"."containers"(
  "id" INTEGER PRIMARY KEY NOT NULL,
  "parent" INTEGER NOT NULL,
  "owner" VARCHAR(45) NOT NULL,
  "name" VARCHAR(45) NOT NULL,
  CONSTRAINT "fk_containers_containers1"
    FOREIGN KEY("parent")
    REFERENCES "containers"("id"),
  CONSTRAINT "fk_containers_users1"
    FOREIGN KEY("owner")
    REFERENCES "users"("username")
);
CREATE INDEX "mydb"."containers.fk_containers_containers1_idx" ON "containers" ("parent");
CREATE INDEX "mydb"."containers.fk_containers_users1_idx" ON "containers" ("owner");
CREATE TABLE "mydb"."notes"(
  "id" INTEGER NOT NULL,
  "container" INTEGER NOT NULL,
  "title" VARCHAR(45) NOT NULL,
  "contents" VARCHAR(45) NOT NULL,
  PRIMARY KEY("id","container"),
  CONSTRAINT "fk_notes_containers1"
    FOREIGN KEY("container")
    REFERENCES "containers"("parent")
);
CREATE INDEX "mydb"."notes.fk_notes_containers1_idx" ON "notes" ("container");
COMMIT;
