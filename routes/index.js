var express = require('express');
var router = express.Router();
var Web3 = require('web3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tx',(req,res,next)=>{
	var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/26a5f300569d4e938e10e3abd2caef74"));
	
	var data1=[];
	var lastBlock ;
    web3.eth.getBlockNumber().then(blockNumber=>{
    	lastBlock = blockNumber;
       console.log("block : " + lastBlock);
    }).then (function(){
       var hash;
       for( var i=0; i<10; i++) {
            web3.eth.getBlock(lastBlock - i).then(block =>{
              hash = block.hash;
              console.log(block.number)
              var number = block.number;
              data1.push(
                {
                  hashValue: hash,
                  blockNumber: number
                });
              console.log("data1[i].hash : "+ data1);
              if (data1.length == 10){
                res.json(data1);
              }
             });
            // console.log("tets ");
         }
        // return data1;
        });
    //});
 });
  
  

module.exports = router;
