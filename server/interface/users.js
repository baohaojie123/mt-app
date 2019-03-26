import Router from 'koa-router';
// 利用redis把不同验证码对应不同用户
import Redis from 'koa-redis'
//使用node 用自己的邮箱向别人邮箱发送邮件
import nodeMailer from 'nodemailer'
// npm ls koa-redis 查看版本
import User from '../dbs/models/users'
import Email from '../dbs/config'
import axios from './utils/axios'
import Passport from './utils/passport'

