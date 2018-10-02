function checkActiveTime() {
  const currentTime = new Date().getTime();
  const activeTime = new Date("2018-01-26T10:00:00Z").getTime();
  return currentTime > activeTime ? true : false;
}
