$(document).ready(function(){

    $("#enviar").on("click", function(){
        $(".error-form").hide();
        var nombre = $("#nombre").val();
        var aPaterno = $("#aPaterno").val();
        var aMaterno = $("#aMaterno").val();
        var telefono = $("#telefono").val();
        var celular = $("#celular").val();
        var email = $("#email").val();       
        var mensaje = $("#mensaje-txt").val();        
        var telLocal = true;
        var enviar = true;
        var acentos = new RegExp(/[á|é|í|ó|ú]/); 

        if(nombre == "" || nombre == null){
            $("#err-nombre").show("slow");
            enviar = false;
        }

        if(aPaterno == "" || aPaterno == null){            
            $("#err-paterno").show("slow");
            enviar = false;
        }


        if(telefono == "" || telefono == null || isNaN(telefono))
            telLocal = false;
        if(!telLocal){
            if(celular == "" || celular == null || isNaN(celular)){
                $("#err-telefono").show("slow");
                enviar = false;
            }
        }
        
        var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        if (caract.test(email) == false){
            enviar = false;
            $("#err-email").show("slow");
        }                

        
        if(enviar){

            var datos = {
                'nombre' : nombre,
                'aPaterno' : aPaterno,
                'aMaterno' : aMaterno,
                'telefono' : telefono,
                'celular' : celular,
                'email' : email,                
                'mensaje' : mensaje                
            };
            
            $.ajax({
                type: 'POST',
                url : 'process.php',
                data : datos,
                dataType : 'json',
                encode: true,
                success: function(json){
                    console.log("json: " + json);
                    $("#success-form").show("slow");
                    $("#contactform").hide("slow");
                    $("#danger-form").hide("slow");
                    $("#calculo").show("slow");
                    $("#titulo-formulario").hide("slow");                    
                },
                error: function(xhr, status){
                    $("#danger-form").show("slow");
                }                
            });
        }
        else
            return false;
    });
})