
import apiCreator from '@/utils/apiCreator';

import post from './post'
import user from './user'
import review from './review'
import admin from './admin'

const api = apiCreator();

export default {
  // 暴露api上的几个底层方法: get / post
  ...api,
  // post
  post: post(api),
  user: user(api),
  review: review(api),
  admin: admin(api),
}
