export default class DataFetch{

  constructor(){

  }

  async getData(callback){
    fetch('assets/data/rues.json')
    .then((response)=> response.json())
    .then((data)=>{
      console.log(data);
      callback(data);
    });

  

  }
}