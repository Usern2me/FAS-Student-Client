// 两个时间差 返回分钟
function timeDiff(a, b) {
  let [aHour, aMin] = a.split(":")
  let [bHour, bMin] = b.split(":")
  if (aHour < bHour) {
    [aHour, bHour] = [bHour, aHour];
    [aMin, bMin] = [bMin, aMin];
  }
  const Hour = Math.abs(aHour - bHour)
  const Min = aMin - bMin
  return Hour*60+Min
}
console.log(timeDiff('18:05','17:55'))