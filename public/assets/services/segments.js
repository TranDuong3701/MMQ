function updateData() {
  $("#data-table-segments").DataTable().ajax.reload();
}
const baseUrl = `/api${window.location.pathname}/segments`;

const getSegments = () => {
  $("#data-table-segments").DataTable({
    responsive: true,
    ajax: {
      type: "GET",
      url: baseUrl,
      dataSrc: function (json) {
        json.data.forEach((segment) => {
          segment.actions = `<div class="g-2">
            <a
              class="btn text-primary btn-sm"
              data-bs-toggle="modal" 
              href="#edit-segment-modal"
              id="open-edit-segment-modal"
              >
              <span class="fe fe-edit fs-14">
              </span
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
      { data: "source" },
      {
        data: "status",
        render: function (data, type, row) {
          if (data === "unsubmit" || data === "rejected") {
            return `
              <div class="mt-sm-1 d-block ">
              <i class="fe fe-check-circle text-success"></i>
              </div>`;
          } else {
            return `
              <div class="mt-sm-1 d-block ">
              <i class="fe fe-x-circle text-danger"></i>
              </div>`;
          }
        },
      },
      { data: "actions" },
    ],
    columnDefs: [
      {
        targets: 1,
        width: "10%",
        className: "text-center",
      },
    ],
    language: {
      searchPlaceholder: "Search...",
      sSearch: "",
      lengthMenu: "_MENU_ items/page",
    },
  });
};

function fillData(segment) {
  $("#source-update").val(segment.source);
  $("#target-update").val(segment.target || "");
}

const editSegment = () => {
  let segment;
  $("#data-table-segments").on(
    "click",
    "a#open-edit-segment-modal",
    function () {
      segment = $("#data-table-segments")
        .DataTable()
        .row($(this).parents("tr"))
        .data();
      fillData(segment);
    }
  );

  $("#btn-edit-segment").on("click", async function () {
    const response = await fetch(
      `http://localhost:8000/api/segments/${segment._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: $("#source-update").val(),
          target: $("#target-update").val(),
        }),
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      $("#modal-delete-project").modal("hide");
      updateData();
    }
  });
};

$(document).ready(function () {
  getSegments();
  editSegment();
});
