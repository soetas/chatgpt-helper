import { type Stream } from 'node:stream'
import { URL } from 'node:url'
import fetch from 'node-fetch'
import { SocksProxyAgent } from 'socks-proxy-agent'
import 'dotenv/config'

const { 
  OPENAI_API_BASE_URL, 
  OPENAI_API_KEY, 
  OPENAI_PROXY_URL 
} = process.env

fetch(`${OPENAI_API_BASE_URL}/v1/`, {
  headers:{
    Authorization: `Bearer ${OPENAI_API_KEY}`
  },
  agent: new SocksProxyAgent(OPENAI_PROXY_URL)
})


