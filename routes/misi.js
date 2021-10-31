var express = require('express');
var router = express.Router();
var path = require("path")
var db  = require("../db/db")

// post new mission
router.post('/', function(req, res, next) {
   db.run(`INSERT INTO MissionPlan(planName, g3wp) VALUES (?,?)`,
   [req.body.namaMisi, req.body.GeoJSON], 
   (err) =>{
     if (err) {
       console.log(err)
       res.status(500).json({status:"error"})
       return
     }
     res.status(200).json({status:"success"})
   }
   )
 
 });


router.get('/', (req,res)=>{
  db.all("SELECT * FROM MissionPlan", (err, rows) => {
    if (err){
      console.log(err)
      res.send("error")
    } else {
        if(req.query.table === '1'){
            res.render("show.ejs", {data:rows})
        } else{
            res.json(rows)
        }
    }
  })
})

router.get('/delete/:id', (req,res)=>{
  let id =req.params.id
  console.log("mission deleted")
  db.run ("DELETE FROM MissionPlan WHERE planId=?",
  [id],
  (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({status:"error"})
      return
    } else{
      res.status(200).json({status:"success"})
    }
  }
  )
})



module.exports = router;