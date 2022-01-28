'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    ctx.body = 'hi, egg'
  }
  async demo01() {
    const { ctx } = this
    console.log('%c 🍚 ctx.url: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', ctx.url)
    ctx.body = {
      status: 200,
      Msg: 'demo01测试',
      data: ctx.params
    }
  }
}

module.exports = HomeController
