// TAMBAH POST KONTEN
$(document).ready(function () {
    $("#create-news-form").submit(function (event) {
      event.preventDefault(); // Menghentikan pengiriman formulir secara default

      // Mengambil data dari formulir
      let title = $("#title").val();
      let cover = $("#cover").val();
      let content = $("#content").val();

      // Mengirim data ke API menggunakan AJAX
      $.ajax({
        url: "/api/v1/news", // Ganti dengan URL API sesuai dengan struktur Anda
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ title: title, cover: cover, content: content, isPublic: true, author: "Admin" }),
        success: function (response) {
          // Tindakan setelah berhasil
          alert("Berita berhasil ditambah.");
          // Redirect ke halaman lain atau lakukan sesuatu yang sesuai kebutuhan Anda
          window.location.href = "/";
        },
        error: function (error) {
          // Tindakan jika terjadi kesalahan
          console.error("Terjadi kesalahan: " + JSON.stringify(error));
          alert("Gagal menyimpan berita.");
        },
      });
    });
  });
//TAMBAHKAN KOMENTAR
  $("#comment-form").submit (function (event) {
    event.preventDefault();
    
    const name = $("#name").val();
    const commentText = $("#comment").val();
    const newsId = $("#newsId").val(); // Ambil ID berita dari input tersembunyi
    
      $.ajax({
        url: "/api/v1/comments",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ name, comment: commentText, news_id: newsId }), // Sertakan ID berita
        success: function (response) {
            // $("#success—toast").toast ("show");
            alert ("Komentar berhasil ditambah.");
    
            window. location.href = "/news/"+ newsId;
    
        },
    
        error: function (error) {
            console.error("Terjadi kesalahan: " + JSON.stringify(error));
            alert ("Gagal menyimpan komentar.");
        },
      });
    
        $("#name").val("");
        $("#comment").val("");
    });
//UPDATE KONTEN
$(document).ready(function () {
  $("#update-news-form").submit(function (event) {
    event.preventDefault(); // Menghentikan pengiriman formulir secara default

    // Mengambil data dari formulir
    let id = $("#id").val();
    let title = $("#title").val();
    let cover = $("#cover").val();
    let content = $("#content").val();

    // Mengirim data ke API menggunakan AJAX
    $.ajax({
      url: "/api/v1/news/" + id, // Ganti dengan URL API sesuai dengan struktur Anda
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({ title: title, cover: cover, content: content  }),
      success: function (response) {
        // Tindakan setelah berhasil
        alert("Berita berhasil diupdate.");
        // Redirect ke halaman lain atau lakukan sesuatu yang sesuai kebutuhan Anda
        window.location.href = "/";
      },
      error: function (error) {
        // Tindakan jika terjadi kesalahan
        console.error("Terjadi kesalahan: " + JSON.stringify(error));
        alert("Gagal menyimpan berita.");
      },
    });
  });
});

//HAPUS KOMEN
function deleteComment(commentId) {
  event.preventDefault(); 

  // Mengirim data ke API menggunakan AJAX
  $.ajax({
    url: "/api/v1/comments/" + commentId, // Ganti dengan URL API sesuai dengan struktur Anda
    type: "DELETE",
    contentType: "application/json",
    data: JSON.stringify({ id: commentId  }),
    success: function (response) {
      // Tindakan setelah berhasil
      alert("Komen Berhasil Di Hapus.");
      // Redirect ke halaman lain atau lakukan sesuatu yang sesuai kebutuhan Anda
      location.reload();
    },
    error: function (error) {
      // Tindakan jika terjadi kesalahan
      console.error("Terjadi kesalahan: " + JSON.stringify(error));
      alert("Gagal menyimpan berita.");
    },
  });
}