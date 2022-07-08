function updateData() {
  $("#file-datatable-project").DataTable().ajax.reload();
}
const getAllProjects = () => {
  const apiUrl = "http://localhost:8000/api/projects";

  var table = $("#file-datatable-project").DataTable({
    buttons: ["copy", "excel", "pdf", "colvis"],
    ajax: {
      type: "GET",
      url: apiUrl,
      dataSrc: function (json) {
        console.log(json.data);
        return result;
      },
    },
    language: {
      searchPlaceholder: "Search...",
      scrollX: "100%",
      sSearch: "",
    },
  });
  table
    .buttons()
    .container()
    .appendTo("#file-datatable_wrapper .col-md-6:eq(0)");
};

$(function (e) {
  //______File-Export Data Table
});
