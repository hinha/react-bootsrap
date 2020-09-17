// const dotenv = require("dotenv");
// const result = dotenv.config()
const service = () =>{
    if ("serviceWorker" in navigator) {
        registerServiceWorker();
    } else {
        console.log("ServiceWorker belum didukung browser ini.");
    }

    function registerServiceWorker(){
        window.addEventListener("load", function() {
            navigator.serviceWorker
                .register(`/sw.js`)
                .then(function() {
                    console.log("Pendaftaran ServiceWorker berhasil");
                })
                .catch(function() {
                    console.log("Pendaftaran ServiceWorker gagal");
                });
        });
    }
}

export default service;
