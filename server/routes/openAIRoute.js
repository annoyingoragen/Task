const Express =require( "express");
const {
   getResponseFromOpenAI
}=
      require( "../controllers/openAIController.js");

const router=Express.Router();


router.route("/getresponsefromai/:prompt").get( getResponseFromOpenAI);




module.exports=router;

