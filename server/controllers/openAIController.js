
const { Configuration, OpenAIApi } = require("openai");


const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);



exports.getResponseFromOpenAI=async (req, res)=>{
try{
    console.log(req.params)
    const prompt = req.params.prompt;
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: prompt,
        temperature: 0.51,
        max_tokens: 356,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      

      
      }); 
      console.log(response.data.choices[0])
      data=response.data.choices[0];
    res.status(200).json({
      success: true,
   
      data
    });
    
      } catch (error) {
        console.log(error.message);
       
        return res.status(500).json({
          success: false,
          message: error.message});
        }
 }
    

