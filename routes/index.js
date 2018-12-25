var express = require('express');
var router = express.Router();
var Web3 = require('web3');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

router.get('/blockData/:blockNumber',(req, res, next)=>{
  var blockNumber = req.params.blockNumber;
  var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/26a5f300569d4e938e10e3abd2caef74"));
  var txList;
  web3.eth.getBlock(blockNumber).then(block => {
    var listOfTxns = block.transactions;
    txList = listOfTxns;

  }).then(function(){
    var txData=[];
    for(var i=0; i< txList.length; i++){
      web3.eth.getTransaction(txList[i]).then(tx =>{
        var valueInEthers = web3.utils.fromWei(tx.value)
        txData.push({
          from: tx.from,
          value: valueInEthers,
          gas: tx.gas,
          input: tx.input,
          hash: tx.hash
        });
      if(txData.length == txList.length)
      res.send(txData);
      });
    }
  });
});

router.get('/blocks',(req,res,next)=>{
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
              console.log(block.number);
              var number = block.number;
              var timeStamp = (block.timestamp/60) % 60;
              var blockSize = (block.size/1024);
              data1.push(
                {
                  hashValue: hash,
                  blockNumber: number,
                  time: timeStamp,
                  size: blockSize,
                  difficulty: block.difficulty
                });
              console.log("data1[i].hash : "+ data1);
              if (data1.length == 10){
                console.log("output : " + data1);
                res.json(data1);
              }
             });
            // console.log("tets ");
         }
        // return data1;
        });
    //});
 });
  
 function getTransactionsFromBlock(blockNumber) {
 
  
}

module.exports = router;
