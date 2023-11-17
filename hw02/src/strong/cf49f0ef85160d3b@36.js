function _1(md){return(
md`# Strong baseline -1`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _yCounts(){return(
[]
)}

function _years(){return(
['牡羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座']
)}

function _5(yCounts,years,data)
{
  yCounts.length = 0; //將yCounts清空
  for (var y=0; y<years.length; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    yCounts.push({Constellation:years[y], gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    yCounts.push({Constellation:years[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation)*2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return yCounts
}


function _6(Plot,yCounts){return(
Plot.plot({
  grid: true,
  x: {domain: ['牡羊座','金牛座','雙子座','巨蟹座','獅子座','處女座','天秤座','天蠍座','射手座','摩羯座','水瓶座','雙魚座']},
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("years")).define("years", _years);
  main.variable(observer()).define(["yCounts","years","data"], _5);
  main.variable(observer()).define(["Plot","yCounts"], _6);
  return main;
}
