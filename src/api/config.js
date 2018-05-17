let env = 'prod'
if(process.env.NODE_ENV=='development'){
  env = 'dev'
}

export default {
  env: env
};
