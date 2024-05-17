import OpenAI from 'openai'

class Chatbot {
  constructor() {}

  async chat() {
    const openai = new OpenAI({ apiKey:''})

    const { choices } = await openai.chat.completions.create({
      temperature:1,
      messages:[
        { role:'user', content:' '},
        { role:'system', content:''},
        
      ],
      model:'gpt-3.5-turbo',
    })

    const {  } = await openai.completions.create({
      prompt:'',
      model:'gpt-3.5-turbo-instruct',
      temperature:1,
      max_tokens:300
    })


    openai.models.list().then(({data:models})=>{})

  }

}

export default Chatbot
