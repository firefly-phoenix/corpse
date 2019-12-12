let express = require('express');
let router = express.Router();

let database = require('../database.js');
let StoryModel = require('../schema/story.js')

// const app = express()
//const port = 3000


router.get('/', function(req, res, next) {
  console.log("doing a get")
  StoryModel
    .find({

    })
    .then(doc => {
      //change back to []?
      let sendingtasks = [];
      for(let i=0; i < doc.length; i++) {
        sendingtasks.push(doc[i].storysection)

      }
      console.log('sending:', sendingtasks);
      res.send(sendingtasks)
    })
    .catch(err => {
      console.error(err)
    })
})



router.put('/', function(req, res, next) {
  console.log("doing a put")
  let newSection = new StoryModel ({
    storysection: req.body.input,
    //update for default check position
  })

  newSection.save()
    .then(doc => {
      res.send("Story Section added")
      console.log(doc)
    })
    .catch(err => {
      console.error(err)
    })

})


router.delete('/', function(req, res, next) {
  console.log("doing a delete: ", req.body.story)

      StoryModel

        .find({

          //storysection: req.body.storyString,
          storysection: req.body.story,
          //storysection: req.body.charactercheck,

        })
        .remove({

        })
        .then(response => {
          console.log(response)

          // let sendingtasks = [];
          // for(let i=0; i < response.length; i++) {
          //   sendingtasks.push(doc[i].task)
          // }
          // res.send(sendingtasks)

          res.send(response)

        })
        .catch(err => {
          console.error(err)
        })

        /*
        .findOneAndRemove({


          //storysection: req.body.story,

        })
        .then(response => {
          console.log(response)

          // let sendingtasks = [];
          // for(let i=0; i < response.length; i++) {
          //   sendingtasks.push(doc[i].task)
          // }
          // res.send(sendingtasks)

          res.send(response)

        })
        .catch(err => {
          console.error(err)
        })

        */




})



//router.listen(port, () => console.log(`Example app listening on port ${port}!`))


router.get('/', function(req,res,next) {
  res.send('API is working properly');
})

module.exports = router;
