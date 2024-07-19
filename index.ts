import axios from 'axios';

/**
 * Number of users PS can add in Domain Adding
 */

// const _URL = "http://localhost:3002/api/v1/domains/store";
const _URL = "https://staging.emergencme.com/api/v1/domains/store";
const _SID = 4;

let count = 1;
let startTime: any = new Date();
let endTime;

let errorCount = 1;

function timeElasped() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  timeDiff /= 1000;

  // get seconds 
  return Math.round(timeDiff);
}


function randomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomNumber(length) {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

async function executeAPI(number: number) {

  for (let i = 0; i < number; i++) {
    const object = new FormData();
    object.set("sid", String(_SID))
    object.set("domain_name", randomString(5))
    object.set("no_of_groups", shuffleArray([1,2,3,4,5,6,7,8,9,10])[0])
    object.set("description", `${randomString(5)} ${randomNumber(5)} ${randomString(5)}`)
    object.set("domain_type", shuffleArray([1,2])[0])
    object.set("domain_status", '1')

    await axios.post(_URL, object, {headers: {'Content-Type': 'multipart/form-data' }})
      .then(res => {
        console.log(`%cRequest #: ${count++} executed at ${timeElasped()} seconds`, 'color: green');
      })
      .catch(err => {
        console.log(`%cRequest #: ${count++} failed. Error #: ${errorCount++}`, 'color: red');
      })
  }

  const result = {
    "Requests": count - 1, "Error": errorCount - 1, "Success": (count - 1) - (errorCount - 1), "Time": `${timeElasped()} sec`
  }

  console.table(result)

}

executeAPI(1);
