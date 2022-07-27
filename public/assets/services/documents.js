function updateData() {
  $("#data-table-documents").DataTable().ajax.reload();
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
            href="/documents/${document._id}"
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
      {
        targets: 6,
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

const getUsers = () => {
  $("#data-table-users").DataTable({
    responsive: true,
    ajax: {
      type: "GET",
      url: `/api/projects/${projectId}`,
      dataSrc: function (json) {
        json.data.users.forEach((project) => {
          project.actions = `<div class="g-2">
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
        return json.data.users;
      },
    },
    columns: [{ data: "username" }, { data: "role" }, { data: "actions" }],
    columnDefs: [
      {
        targets: 0,
      },
      {
        targets: 0,
        width: "30%",
      },
      {
        targets: 0,
        width: "30%",
      },
    ],
    language: {
      searchPlaceholder: "Search...",
      sSearch: "",
      lengthMenu: "_MENU_ items/page",
    },
  });
};

const importDocument = () => {
  $("#file").FancyFileUpload({
    params: {
      action: "fileuploader",
    },
    maxfilesize: 100000000000,
    startupload: async function (SubmitUpload, e, data) {
      const formData = new FormData();
      formData.append("file", data.files[0]);

      for (const [key, value] of formData) {
        console.log(key, value);
      }
      const response = await fetch(
        `http://localhost:8000/api/projects/${projectId}/documents`,
        {
          body: formData,
          method: "POST",
        }
      );
      const { status } = await response.json();
      if (status === "success") {
        $("#import-document").modal("hide");
        updateData();
      }
    },
  });
};

$(document).ready(function () {
  getDocuments();
  getUsers();
  importDocument();
});
