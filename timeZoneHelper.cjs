exports.getESTTimeZone = function (date, timeZone) {
  // if (typeof date === "string") {
  var offset = new Date().getTimezoneOffset(); // getting offset to make time in gmt+0 zone (UTC) (for gmt+5 offset comes as -300 minutes)
  var date = new Date();
  date.setMinutes(date.getMinutes() + offset);

  var easternTimeOffset = -240; //for dayLight saving, Eastern time become 4 hours behind UTC thats why its offset is -4x60 = -240 minutes. So when Day light is not active the offset will be -300
  date.setMinutes(date.getMinutes() + easternTimeOffset);
  return date.toLocaleString();
  //   return new Date(
  //     new Date(date).toLocaleString("en-US", {
  //       timeZone,
  //     })
  //   );
  // }

  // return new Date(
  //   date.toLocaleString("en-US", {
  //     timeZone,
  //   })
  // );
};
