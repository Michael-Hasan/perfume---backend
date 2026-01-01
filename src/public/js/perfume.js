console.log("Perfumes frontend javascript file");

$(function () {
  // Show/hide perfume capacity based on perfume collection
  $(".perfume-collection").on("change", () => {
    const selectedValue = $(".perfume-collection").val();
    console.log("Selected perfume collection:", selectedValue);

    if (selectedValue === "BEDROOM") {
      $(".perfume-volume").parent().show();
      $(".perfume-size").parent().hide();
      // Show capacity select container
    } else {
      $(".perfume-volume").parent().hide();
      $(".perfume-size").parent().show();
      // Hide capacity select container
    }
  });

  // Trigger change event on page load to initialize correct visibility
  $(".perfume-collection").trigger("change");

  // Show new perfume form on process button click
  $("#process-btn").on("click", () => {
    $(".dish-container").slideToggle(500);
    $("#process-btn").css("display", "none");
  });

  // Hide new perfume form on cancel button click
  $("#cancel-btn").on("click", () => {
    $(".dish-container").slideToggle(100);
    $("#process-btn").css("display", "flex");
  });

  // Handle status change for perfume via AJAX
  $(".new-perfume-status").on("change", async function (e) {
    const id = e.target.id;
    const perfumeStatus = $(`#${id}.new-perfume-status`).val();

    try {
      const response = await axios.post(`/admin/perfume/${id}`, {
        perfumeStatus: perfumeStatus,
      });
      const result = response.data;
      if (result.data) {
        console.log("perfume updated!");
        $(".new-perfume-status").blur();
      } else {
        alert("perfume update failed");
      }
    } catch (err) {
      console.log(err);
      alert("perfume update failed");
    }
  });
});
function validateForm() {
  const perfumeName = $(".perfume-name").val();
  const perfumePrice = $(".perfume-price").val();
  const perfumeLeftCount = $(".perfume-left-count").val();
  const perfumeCollection = $(".perfume-collection").val();
  const perfumeDesc = $(".perfume-desc").val();
  const perfumeStatus = $(".perfume-status").val();

  if (
    perfumeName == "" ||
    perfumePrice == "" ||
    perfumeLeftCount == "" ||
    perfumeCollection == "" ||
    perfumeDesc == "" ||
    perfumeStatus == ""
  ) {
    alert("Please insert all required credentials");
    return false;
  } else return true;
}

function previewFileHandler(input, order) {
  const imgClassName = input.className;

  const file = $(`.${imgClassName}`).get(0).files[0]; //gives detail infos about the file
  console.log("file:", file);

  const fileType = file["type"];

  const validImageType = ["image/jpg", "image/jpeg", "image/png"]; //mime type

  if (!validImageType.includes(fileType)) {
    alert(
      "Please insert only the following image file types: .jpg, .jpeg, .png"
    );
  } else {
    if (file) {
      let reader = new FileReader();

      reader.onload = function () {
        $(`#image-section-${order}`).attr("src", reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
}
