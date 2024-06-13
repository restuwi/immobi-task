import Swal from "sweetalert2";

const AlertSwal = {
  success: (text) => {
    Swal.fire({
      toast: true,
      text: text,
      title: "Yeay!",
      icon: "success",
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  },
  error: (text) => {
    Swal.fire({
      toast: true,
      text: text,
      title: "Oops!",
      icon: "error",
      position: "top-end",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
  },
  confirm: (text) => {
    return Swal.fire({
      title: "Are you sure?",
      text: text || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  },
};

export default AlertSwal;
