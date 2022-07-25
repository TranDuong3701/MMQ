function updateData() {
  $("#data-table").DataTable().ajax.reload();
}
const projectId = window.location.href.split("/").slice(-1)[0];

const getDocuments = () => {
  $("#data-table-documents").DataTable({
    responsive: true,
    ajax: {
      type: "GET",
      url: `/api/projects/${projectId}/documents`,
      dataSrc: function (json) {
        json.data.forEach((document) => {
          document.actions = `<div class="g-2">
          <a
            class="btn text-danger btn-sm"
            data-bs-toggle="tooltip"
            data-bs-original-title="View"
            id="view-segments"
            href="/documents/${document._id}/segments"
          >
            <span class="fe fe-navigation fs-14">
            </span>
          </a>
          <a
            class="btn text-primary btn-sm"
            data-bs-toggle="tooltip"
            data-bs-original-title="Edit"
            ><span class="fe fe-edit fs-14"></span
          ></a>
          <a
            class="btn text-danger btn-sm"
            data-bs-toggle="tooltip"
            data-bs-original-title="Delete"
            ><span class="fe fe-trash-2 fs-14"></span
          ></a>
        </div>`;
        });
        return json.data;
      },
    },
    columns: [
      { data: "filename" },
      { data: "version" },
      { data: "translator" },
      { data: "reviewer" },
      { data: "size" },
      { data: "progress" },
      { data: "actions" },
    ],
    columnDefs: [
      {
        targets: 0,
        width: "50%",
      },
    ],
    language: {
      searchPlaceholder: "Search...",
      sSearch: "",
      lengthMenu: "_MENU_ items/page",
    },
  });
};

$(document).ready(function () {
  getDocuments();
});
