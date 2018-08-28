const CONFIG_DEV = require('./development'); 
const CONFIG_PROD = require('./production'); 


module.exports = () => {
  const MODE = process.env.NODE_ENV.trim(); 

  if(MODE === 'development') {
    return CONFIG_DEV; 
  } else if(MODE === 'production') {
    return CONFIG_PROD; 
  } else {
    return false; 
  }
  
}



