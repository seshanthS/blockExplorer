function display() {
    $.ajax({
      url: '/blocks',
      complete: (data)=>{
        value = data.responseJSON;
        console.log(value);
        for(var i=0; i< value.length; i++){
             console.log(value[i] );
             var size = value[i].size;
            // var tablejs = document.createElement("")
             $("#table1").append("<tr><td>" + i + "</td> <td>" + value[i].blockNumber + "</td> <td>" + value[i].hashValue 
             + "</td><td>" + value[i].difficulty + "</td> <td>" + size + "kb </td> <td>" + value[i].time +  "</td></tr>");
            // $("#row0").html("<td>" + i + "</td> <td>" + value[i].blockNumber + "</td> <td>" + value[i].hashValue + "</td>");
        }
        $("#newBlockTable1").text("New Block")
    }
    });
  }

  function displayTxTable(){
      $.ajax({
        url: '/blockData/latest',
        complete: (data)=>{
            txData = data.responseJSON;
            for(var i=0; i < txData.length; i++){
                $("#txTable").append("<tr><td>" + i + "</td> <td>" + txData[i].hash + "</td> <td>" + txData[i].from 
                + "</td><td>" + txData[i].value + " ethers</td> <td>" + txData[i].gas + "</td></tr>");
            }
            $("#newBlockTable1").text("New Block")
        }
      });
  }