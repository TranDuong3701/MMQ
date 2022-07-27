$(function () {
  //fancyfileuplod
  $("#demo").FancyFileUpload({
    params: {
      action: "fileuploader",
    },
    maxfilesize: 100000000000,
    url: "/",
  });
});
