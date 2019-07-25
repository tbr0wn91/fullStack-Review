const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res , next) => {
        const db = req.app.get('db');
        let { password, email} = req.body;
        console.log(`hit endpoint`)
        const foundUser = await db.select_user(email).catch(err => console.log(err))
        if(!foundUser.length){
            res.status(401).send(`That user has been abducted and no longer exists in the db`)
        } else {
          const matchedPasswords = await bcrypt.compare(password, foundUser[0].password).catch(err => console.log(err));

          if(matchedPasswords){
              
              req.session.user = {
                  username: foundUser[0].username,
                  user_id: foundUser[0].user_id,
                  email: foundUser[0].email
              }
              res.status(200).send(req.session.user)
          }else {
              res.status(403).send(`Incorrect password`)
          }
        }
    },
    register: (req, res, next) => {
        const {username, password, email} = req.body;
        const db = req.app.get('db')

        db.select_user(email).then(([foundUser]) => {
            if(foundUser){
                res.status(409).send(`that user is already on the field getting blasted by aliens`);
            }else {
                const saltRounds = 12
                bcrypt.genSalt(saltRounds).then(salt => {
                    bcrypt.hash(password, salt).then(hashedPassword => {
                        db.create_user([username, hashedPassword, email]).then(([user]) => {
                            req.session.user = user;
                            res.status(200).send(req.session.user)
                        })
                    })
                })
            }
        })
    },
    logout: (req, res, next) => {

    },
    userSession: (req, res, next) => {

    }
}