$(document).ready(function () {

    // =====================
    // LOGIN
    // =====================
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const emailCorrecto = "usuario@alkewallet.cl";
        const passwordCorrecta = "123456";

        const emailIngresado = $("#email").val();
        const passwordIngresado = $("#password").val();

        if (emailIngresado === emailCorrecto && passwordIngresado === passwordCorrecta) {
            window.location.href = "menu.html";
        } else {
            $("#mensaje").text("Credenciales incorrectas");
        }
    });

    // =====================
    // SALDO (MENU / DEPOSITO / ENVIO)
    // =====================
    if ($("#saldo").length) {

        if (!localStorage.getItem("saldo")) {
            localStorage.setItem("saldo", 100000);
        }

        $("#saldo").text(localStorage.getItem("saldo"));
    }

    // =====================
    // DEPÓSITO
    // =====================
    $("#depositoForm").on("submit", function (e) {
        e.preventDefault();

        let monto = parseInt($("#montoDeposito").val());
        let saldoActual = parseInt(localStorage.getItem("saldo"));

        let nuevoSaldo = saldoActual + monto;
        localStorage.setItem("saldo", nuevoSaldo);

        $("#saldo").text(nuevoSaldo);
        $("#mensajeDeposito")
            .text("Depósito realizado con éxito ✅")
            .removeClass("text-danger")
            .addClass("text-success");

        $("#montoDeposito").val("");
    });

    // =====================
    // ENVÍO
    // =====================
    $("#envioForm").on("submit", function (e) {
        e.preventDefault();

        let monto = parseInt($("#montoEnvio").val());
        let saldoActual = parseInt(localStorage.getItem("saldo"));

        if (monto > saldoActual) {
            $("#mensajeEnvio")
                .text("Saldo insuficiente ❌")
                .removeClass("text-success")
                .addClass("text-danger");
            return;
        }

        let nuevoSaldo = saldoActual - monto;
        localStorage.setItem("saldo", nuevoSaldo);

        $("#saldo").text(nuevoSaldo);
        $("#mensajeEnvio")
            .text("Envío realizado con éxito ✅")
            .removeClass("text-danger")
            .addClass("text-success");

        $("#montoEnvio").val("");
    });

});

