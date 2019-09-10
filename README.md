# TrouvKach

## Install MONGODB => /!\ It is not a relational database = it is no SQL.It is based on documentation and collections so to add information (called collection here see the following steps).

sudo apt-get upgrade

sudo apt-get update

To install run this globally:

sudo apt-get install mongodb

To start run this globally:

sudo service mongodb start

To open run this golbaly:

mongo

To shut it down:

CTR + C

To see the default database information:

OPEN => mongo

....>show dbs;

///You will see the following defaulit info:

admin   0.000GB
config  0.000GB
local   0.000GB

To create a new database. Write the world use and then the name of your db:

OPEN => mongo (If it was shut down.)

....>use ozondb; 

/!\ It will be displayed in the terminal "switched to db ozondb

    > this arrow means that mongo is waiting for the next instruction.
    
 To print information about the mongodb:
 
 => to see the current database we working in:
 
 >db;
 
 To enter collection in inside mongo, write db then "dot" then "name of your collection" and then "insert"  parenthesis then curly brakets. Then documentation is the information inserted in the collection. The documentation can be put outside and inside the cury braces, like shown in the following example.
 
db.inventory.insertMany([

   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
   
])
 
 
To see collection (it is supposed that mongo is opened a database is created and and collection is created):

> show collections;

This command will show all the collections contained inside all the databases created by you and the default collcetions.

To show the information inside the collcetion (it is supposed that mongo is opened a database is created and and collection is created):

> db.inventory.find();

# Mogondb Compass 

It is a graphical tool that allows you to easily analyse and understand your database schema, as well as allowing you to visually construct queries, all without having to know MongoDB’s.

https://www.mongodb.com/blog/post/getting-started-with-mongodb-compass

https://www.mongodb.com/products/compass

## Robomongo

https://robomongo.org/


# DOCKER = Tools for running application in an isolated environnement. It gives an advantage similaire to running your application inside a virtual machine, so all your apps runs in the exactly same env and it will always act the if it runs in your env, in the server or your computer.

## Docker uses a special feature of the linux file system to create isolated environnement.

## Dockers works with something called "containers" that are an  running instance of an image. An image is a template for creating the environnement you wanted to snapshot of a systeme at a particular time. The os the software the application all contained inside the image.

## The docker file. It a file with a list of steps to perform in order to cretate the image for example to configure the OP, copy the projects files in the right places ect.

## Containers. It is what you got when you run the image.
 => So with docker file you build the image you run the image and you got the container. 

DOCKER Set up:
https://github.com/becodeorg/LIE-Hamilton-2.12/blob/master/contenu/03-la-montagne/03-trouvkach/docker-readme.md


# Precommit:

https://githooks.com/




 
    
 






