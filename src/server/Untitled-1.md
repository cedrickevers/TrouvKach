Application type

- Web application

Goals

- Locate geographical position

(See API REST)
- List nearby ATM
- User able to display ATM details
- User able to update ATM details (User able to mark ATM emtpy)
- User able to add ATM to "To delete" list

API REST

- GET /atmlist      =>      /atm
- GET /atm/{id}     =>      /atm/{id}
- POST /atm/update  =>      /atm/{id}
- POST /atmdelete   =>      /atm/{id}





Commenter l''image node dans docker.compose.yml => se simplifier la vie(faciliter acess db) de base l image node lane le site sur un port (12345) et il fait un transfert epuis le port 80 sur ce port la. L fait de l'enelver fait que on se connect dirrectement au docker de mango db 

J'ai  changer les import en require pour des pb de compabilité qqch ainsi.

J'ai changer mongoose.connect pour pouvoir se connecter en localhost
Changer la route atm pour listr tous les terminaux , gestion d erreur et stringify sur le jeson pour pouvoir lafficher en strign ds le navigateur


/*./node_modules/.bin/nodemon src/server/index.js */


*a = "/atm/10-50"
"/atm/10-50"
b = a.split('/')
(3) ["", "atm", "10-50"]
b[2]
"10-50"
lat = b[2].split('-')[0]
"10"
lat = b[2].split('-')
(2) ["10", "50"]
lat[0]
"10"
lat[1]
"50"
coord = b[2].split('-')
(2) ["10", "50"]
lat = coord[0]
"10"
long = coord[1]
"50"*/



  // Grab ID
    // req.url = /atm/id
    // req.url.split('/') = [ '', 'atm', 'id' ]
    // req.url.split('/').length = la grandeur du tableau
    // Pour avoir le dernier élément il suffit de faire grandeur du tableau - 1
    //let urlArray = req.url.split('/')
    //let urlArraySize = req.url.split('/').length
    //res.send("L'id est " + urlArray[urlArraySize - 1]);


    app.get("/profile", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);

    terminals.find().then(profiles => {
        res.send({
            confirmation: "success",
            data: profiles
        })
    })
        .catch(err => {
            res.send({
                confirmation: "fail",
            });
        }





        )
});