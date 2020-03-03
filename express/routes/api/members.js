express = require('express');
const router = express.Router();
const memberModel = require('../../Models/member');

// CREATE a new member
router.post('/', async(req,res,next)=> {
  try {
    const member = new memberModel({
      user_name: req.body.name,
      password: req.body.password
    });
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});


//  GET all members
router.get('/', async (req, res, next) => {
  try {
    const members = await memberModel.find();
    res.json(members);
  } catch (error) {
    res.json({message: error.message});
  }
});


//  GET one member
router.get('/:id', getMember, (req, res, next) => {
  res.json(res.member);
});


//  DELETE one member
router.delete('/:id', getMember, async (req, res, next) => {
  try {
    const deletedMember = await res.member.remove();
    res.json(deletedMember);
  } catch (error) {
    res.jason({message: error.message});
  }
})


//  UPDATE one member
router.patch('/:id', getMember, async (req, res, next)=> {
  try {
    if(req.body.name != null){
      res.member.user_name = req.body.name;
    }
    const updatedMember = await res.member.save();
    res.json(updatedMember);

  } catch (error) {
    res.json({message: error.message});
  }
});


//  Search user by name
router.get('/searchBy/name', async (req, res, next)=>{
  try {
    const members = await memberModel.find();
    if(members.some(member => member.user_name === req.body.name)){
      res.json(members.filter(member => member.user_name === req.body.name));
    }else{
      res.json({message: `no member found with the name of ${req.body.name}`});
    }
  } catch (error) {
    res.json({message: error.message});
  }

})


//  通过ID得到用户的一个中间件
async function getMember(req, res, next){
  let member;
  try {
    member = await memberModel.findById(req.params.id);
    if(member==null){
      return res.json({message: 'no member found'});
    }
  } catch (error) {
    return res.json({message: error});
  }
  res.member = member;
  next();
}

module.exports = router;