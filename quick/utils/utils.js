function convertToCastString(casts){
  var castsjoin = "";
  for(var idx in casts){
    castsjoin = castsjoin + casts[idx].name + "/";
  }
  return castsjoin.substring(0,castsjoin.length - 2)
}

function convertToCastInfors(casts){
  var castsArray = []
  for(var idx in casts){
    var cast = {
      img:casts[idx].avatars ? casts[idx].avatars.large:"",
      name:casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}
export {
  convertToCastString,
  convertToCastInfors
}