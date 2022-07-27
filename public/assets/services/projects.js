function updateData() {
  $("#data-table-projects").DataTable().ajax.reload();
}

function resetForm() {
  $("#name").val("");
  $("#sourceLanguageCode").val("vi");
  $("#targetLanguageCode").val("vi");
}

const createProject = () => {
  $("#btn-create-project").on("click", async function () {
    const response = await fetch("http://localhost:8000/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: $("#name").val(),
        sourceLanguageCode: $("#sourceLanguageCode").val(),
        targetLanguageCode: $("#targetLanguageCode").val(),
      }),
    });

    const data = await response.json();
    if (data.status === "success") {
      $("#create-project-modal").modal("hide");
      updateData();
      resetForm();
    }
  });
};

const deleteProject = () => {
  let project;
  $("#data-table-projects").on(
    "click",
    "a#open-modal-delete-project",
    function () {
      project = $("#data-table-projects")
        .DataTable()
        .row($(this).parents("tr"))
        .data();
    }
  );

  $("#btn-delete-project").on("click", async function () {
    const response = await fetch(
      `http://localhost:8000/api/projects/${project._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    if (data.status === "success") {
      $("#modal-delete-project").modal("hide");
      updateData();
    }
  });
};

const getProjects = () => {
  const table = $("#data-table-projects").DataTable({
    buttons: ["copy", "excel", "pdf", "colvis"],
    responsive: true,
    ajax: {
      type: "GET",
      url: `/api/projects/`,
      dataSrc: function (json) {
        json.data.forEach((project) => {
          project.actions = `<div class="g-2">
            <a
              class="btn text-danger btn-sm"
              data-bs-toggle="tooltip"
              data-bs-original-title="View"
              id="view-segments"
              href="/projects/${project._id}"
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
              data-bs-toggle="modal" 
              href="#modal-delete-project"
              id="open-modal-delete-project"
              ><span class="fe fe-trash-2 fs-14"></span
            ></a>
          </div>`;
        });
        return json.data;
      },
    },
    columns: [
      { data: "name" },
      { data: "sourceLanguageCode" },
      { data: "targetLanguageCode" },
      { data: "users.length" },
      { data: "actions" },
    ],
    columnDefs: [
      {
        targets: 0,
        width: "20%",
      },
    ],
    language: {
      searchPlaceholder: "Search...",
      sSearch: "",
      lengthMenu: "_MENU_ items/page",
      scrollX: "100%",
    },
  });

  table
    .buttons()
    .container()
    .appendTo("#file-datatable_wrapper .col-md-6:eq(0)");
};

$(document).ready(function () {
  getProjects();
  createProject();
  deleteProject();
});
