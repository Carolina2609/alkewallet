$(document).ready(function () {

    // ============================
    // LOGIN
    // ============================
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const emailCorrecto = "camunoz@alkewallet.cl";
        const passwordCorrecta = "123456";

        const emailIngresado = $("#email").val();
        const passwordIngresado = $("#password").val();

        if (emailIngresado === emailCorrecto && passwordIngresado === passwordCorrecta) {
            window.location.href = "menu.html";
        } else {
            $("#mensaje").text("Credenciales incorrectas");
        }
    });

    // ============================
    // SALDO GENERAL
    // ============================
    if ($("#saldo").length) {

        if (!localStorage.getItem("saldo")) {
            localStorage.setItem("saldo", 100000);
        }

        $("#saldo").text(localStorage.getItem("saldo"));
    }

    // ============================
    // DEPÓSITO
    // ============================
    $("#depositoForm").on("submit", function (e) {
        e.preventDefault();

        let monto = parseInt($("#montoDeposito").val());
        let saldoActual = parseInt(localStorage.getItem("saldo"));

        let nuevoSaldo = saldoActual + monto;
        localStorage.setItem("saldo", nuevoSaldo);

        guardarMovimiento("Depósito", monto);

        $("#saldo").text(nuevoSaldo);
        $("#mensajeDeposito")
            .text("Depósito realizado con éxito ✅")
            .removeClass("text-danger")
            .addClass("text-success");

        $("#montoDeposito").val("");
    });

    // ============================
    // ENVÍO
    // ============================
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

        guardarMovimiento("Envío", monto);

        $("#saldo").text(nuevoSaldo);
        $("#mensajeEnvio")
            .text("Envío realizado con éxito ✅")
            .removeClass("text-danger")
            .addClass("text-success");

        $("#montoEnvio").val("");
    });

    // ============================
    // MOSTRAR HISTORIAL
    // ============================
    if ($("#listaMovimientos").length) {
        let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

        if (movimientos.length === 0) {
            $("#listaMovimientos").html(
                '<li class="list-group-item text-center text-muted">Sin movimientos aún</li>'
            );
        } else {
        movimientos.forEach(mov => {
            $("#listaMovimientos").prepend(`
             <li class="list-group-item">
            <div class="d-flex justify-content-between">
                <strong>${mov.tipo}</strong>
                <span>$${mov.monto}</span>
            </div>
            <small class="text-muted">${mov.fecha}</small>
        </li>
    `);
});

        }
    }

});


//  HISTORIAL
function guardarMovimiento(tipo, monto) {
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    let fecha = new Date().toLocaleString("es-CL");

    movimientos.push({
        tipo: tipo,
        monto: monto,
        fecha: fecha
    });

    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}
// ============================
// CERRAR SESIÓN

$("#logoutBtn").on("click", function () {
    localStorage.removeItem("saldo");
    localStorage.removeItem("movimientos");

    window.location.href = "login.html";
});

