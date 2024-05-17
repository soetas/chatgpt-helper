import { type Stream } from 'node:stream'
import { URL } from 'node:url'
import fetch from 'node-fetch'
import { SocksProxyAgent } from 'socks-proxy-agent'
import Koa from 'koa'
import koaBody from 'koa-body'
import KoaRouter from 'koa-router'
import { OpenAI } from 'openai'
import Cookie from 'js-cookie'
import 'dotenv/config'

const { 
  OPENAI_API_BASE_URL, 
  OPENAI_API_KEY, 
  OPENAI_PROXY_URL 
} = process.env

class HTTPServer {
  private app = new Koa()

  constructor() {
    this.app.use(koaBody({ multipart:true }))

    const router = new KoaRouter()

    router.get('/', async ctx=>{
      const response = await fetch(`${OPENAI_API_BASE_URL}/v1/`, {
        headers:{
          Authorization: `Bearer ${OPENAI_API_KEY}`
        },
        agent: new SocksProxyAgent(OPENAI_PROXY_URL)
      })

      const result = await response.text()
      
      ctx.body = result
    })

    router.get('/gpt', async ctx=>{
      const { prompt } = ctx.response.body

      const openai = new OpenAI({ apiKey:'' })

      const chatRes = await openai.chat.completions.create({
        messages:[
          {role:'user', content:''}
        ],
        model:'gpt-3.5-turbo'
      })

      chatRes.choices[0].message

      const imgRes = await openai.images.generate({
        prompt,
        n:1,
        size:'512x512',
        response_format:'url'
      })

      const imgUrl = imgRes.data[0].url

      ctx.body = { status:'ok', imgUrl }
    })

    this.app.use(router.routes)
  }

  listenAndServe(port:number, hostname:string) {
    this.app.listen(port, hostname, ()=>{
      console.log(`server is ready on http://${hostname}:${port}`)
    })
  }
}

class HTTPClient {
  constructor() {
    const eventSource = new EventSource('')

  }
}
