
var client = {};
var produit = {};
var employe = {};
var fournisseur = {};

function liste_clients() {
    client = getLs("client");
    var html_client = '';
    for (let key in client) {
        html_client = html_client + "<tr><td>" + key + "</td><td>" + client[key] + "</td></tr>";
    }

    console.log(html_client);

    $("#liste_client").html(html_client);
}

function liste_produit() {
    produit = getLs("produit");
    var html_produit = '';
    for (let key in produit) {
        html_produit = html_produit + "<tr><td>" + key + "</td><td>" + produit[key] + "</td></tr>";
    }

    console.log(html_produit);

    $("#liste_produit").html(html_produit);
}

function liste_employe() {
    employe = getLs("employe");
    var html_employe = '';
    for (let key in employe) {
        html_employe = html_employe + "<tr><td>" + key + "</td><td>" + employe[key] + "</td></tr>";
    }

    console.log(html_employe);

    $("#liste_employe").html(html_employe);
}

function liste_fournisseur() {
    fournisseur = getLs("fournisseur");
    var html_fournisseur = '';
    for (let key in fournisseur) {
        html_fournisseur = html_fournisseur + "<tr><td>" + key + "</td><td>" + fournisseur[key] + "</td></tr>";
    }

    console.log(html_fournisseur);

    $("#liste_fournisseur").html(html_fournisseur);
}

function getLs(item) {
    let obj = window.localStorage.getItem(item);
    console.log(obj);
    if (obj) {
        obj = JSON.parse(obj);
        return obj;
    } else {
        return {};
    }

}

$(document).ready(function () {

    //----Debut MG1 ######################################
    /* fonction qui test si un nombre est bien un nombre entier positif supérieur à 0 */
    function NombreEntierPositif(nb) {
        if (!isNaN(nb) && nb > 0 && nb % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }

    //console.time("temps d'exécution");
    var nomclient, numtele, stop;
    //----Fin MG1 #####################################

    function verif_form(champ1, champ2) {
        if ($("#" + champ1).val() === "" || $("#" + champ2).val() === "") { // on vérifie si un champ est vide
            $("#message").html('<strong style="color:red">Tous les champs sont obligatoires</strong>'); // on injecte un message d'erreur dans le DOM (html de la page)
            return false;
        }
        return true;
    }

    function close_form(id_form) {
        $("#message").html(""); // on vide l'html de la div au dessus du formulaire
        $("#" + id_form).slideUp(400, function () { // effet de slideUp sur le formulaire
            $(this).remove(); // on supprime le formulaire du DOM à la fin de l'animation de slideUp
            $("#message").html("<strong>Ajouté</strong>").css({ "border": "2px solid green", "color": "green" }); // on injecte l'html du message de succès dans la div a dessus du formulaire et on change la couleur de sa bordure en vert
        });
    }

    function verif_form_vide(verif_vide) {
        $(verif_vide).focusin(function (e) { // événement lorsqu'un utilisateur entre dans un champ de formulaire
            $(this).css({ "border": "2px solid green" }); // on change la bordure de l'élément (champ de formulaire) en vert
        });
        $(verif_vide).focusout(function (e) { // événement lorsqu'un utilisateur sort d'un champ de formulaire
            if ($(this).val() === "") { // si le champ n'est pas rempli (sa valeur est vide)
                $("#message").html('<strong style="color:red">Tous les champs sont obligatoires</strong>'); // on injecte un message d'erreur dans le DOM (html de la page)
                $(this).css({ "border": "2px solid red" }); // on change la bordure de l'élément (champ de formulaire) en rouge
            } else {
                $(this).css({ "border": "2px solid green" }); // on change la bordure de l'élément (champ de formulaire) en vert
            }
        });
    }

    verif_form_vide("input[type = text]");

    $("input[type=submit]").mouseover(function () { // événement au survol du bouton
        $(this).css({ "border": "1px solid blue", "color": "blue", "background-color": "white" }); // on change le css du bouton
    });

    $("input[type=submit]").mouseleave(function () { // événement lorsque la souris sort de la zone du bouton
        $(this).css({ "border": "none", "color": "white", "background-color": "blue" }); // on change le css du bouton
    });

    /* page ajout client */
    $("#ajout_client").submit(function (e) {
        e.preventDefault();
        if (verif_form("nom", "num")) {
            client = getLs("client");
            // Debut MG2
            var val1 = $("#nom").val();
            //alert("val1" + $("#nom").val() + "val2" + $("#numero").val());
            if (client[val1]) {
                $("#message").html('<strong style="color:red">ce client existe déjà</strong > ');
            } else {
                var val2 = $("#numero").val();
                client[val1] = val2;
                close_form("ajout_client");
            }
            //alert("val1" + val1 + "val2" + val2);
            console.log(client);
            var clientjson = JSON.stringify(client);
            window.localStorage.setItem('client', clientjson);
            console.log(clientjson);
            // Fin MG2
        }
    });



    /* page ajout produit */
    $("#ajout_produit").submit(function (e) {
        e.preventDefault();
        if (verif_form("nom_produit", "stock")) {
            produit = getLs("produit");
            // Debut MG2
            var val1 = $("#nom_produit").val();
            //alert("val1" + $("#nom").val() + "val2" + $("#numero").val());
            if (produit[val1]) {
                $("#message").html('<strong style="color:red">ce produit existe déjà</strong > ');
            } else {
                var val2 = $("#stock").val();
                produit[val1] = val2;
                close_form("ajout_produit");
            }
            //alert("val1" + val1 + "val2" + val2);
            console.log(produit);
            var produitjson = JSON.stringify(produit);
            window.localStorage.setItem('produit', produitjson);
            console.log(produitjson);
            // Fin MG2
        }
    });

    /* page ajout employe */
    $("#ajout_employe").submit(function (e) {
        e.preventDefault();
        if (verif_form("nom_employe", "poste")) {
            employe = getLs("employe");
            // Debut MG2
            var val1 = $("#nom_employe").val();
            //alert("val1" + $("#nom").val() + "val2" + $("#numero").val());
            if (employe[val1]) {
                $("#message").html('<strong style="color:red">ce employe existe déjà</strong > ');
            } else {
                var val2 = $("#poste").val();
                employe[val1] = val2;
                close_form("ajout_employe");
            }
            //alert("val1" + val1 + "val2" + val2);
            console.log(employe);
            var employejson = JSON.stringify(employe);
            window.localStorage.setItem('employe', JSON.stringify(employe));
            console.log(employejson);
            // Fin MG2
        }
    });

    /* page ajout fournisseur */
    $("#ajout_fournisseur").submit(function (e) {
        e.preventDefault();
        if (verif_form("nom_fournisseur", "adresse_fournisseur")) {
            fournisseur = getLs("fournisseur");
            // Debut MG2
            var val1 = $("#nom_fournisseur").val();
            //alert("val1" + $("#nom").val() + "val2" + $("#numero").val());
            if (fournisseur[val1]) {
                $("#message").html('<strong style="color:red">ce fournisseur existe déjà</strong > ');
            } else {
                var val2 = $("#adresse_fournisseur").val();
                fournisseur[val1] = val2;
                close_form("ajout_fournisseur");
            }
            //alert("val1" + val1 + "val2" + val2);
            console.log(fournisseur);
            var fournisseurjson = JSON.stringify(fournisseur);
            window.localStorage.setItem('fournisseur', fournisseurjson);
            console.log(fournisseurjson);
            // Fin MG2
        }
    });

    /* page liste */
    var tab_client = [];
    var tab_produit = [];
    var tab_employe = [];
    var tab_fournisseur = [];

    /* page liste client */
    /*  client = JSON.parse(window.localStorage.getItem("client"));
      console.log(client);  */



});


