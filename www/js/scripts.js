
var numA=Math.floor(Math.random()*3.999)+6; //Число А от 6 до 9
var numAB=Math.floor(Math.random()*3.999)+11; //Сумма от 11 до 14
var numB=numAB-numA; //Расчет числа В


var vector = document.getElementById("vector"),
ctx = vector.getContext('2d');

var x1=0;  //Координаты изображения по Х
var y1=vector.clientHeight-85; //Координаты изображения по У. 85-высота рисунка

var image = document.getElementById("lineVector");
ctx.drawImage(image, x1, y1);

//расчет начальных и конечных точек дуг. 
//815-длинна линии
//38-шаг 1ед
//20-количество шагов

var step=(815-38)/20;
var lX1=38;

var lX2=lX1+(numA*step);
var lX3=lX2+(numB*step);

//Отображение задания
addInput(20, 220,2, numA, true);
addInput(20, 250,3, "+", true);
addInput(20, 280,4, numB, true);
addInput(20, 310,5, "=", true);
addInput(18, 340,6, "?", true);

drawLines(lX1,lX2,0);
/*
Если введеное число не равно первому числу, то первое число подсвечивается, цвет введеного числа меняется на красный
Если введеное число равно первому числу, то поле становится недоступным для ввода, появляется вторая дуга и поле для ввода второго числа
*/
$('#input0').keyup(function(e){
    var num11=Number($('#input0').val());
    if (num11!=numA){
        $('#input0').css('color','red');
        $('#input2').css('background-color','rgba(255, 0, 0, 0.7)');
    }else{
        $('#input0').css('color','black');
        $('#input2').css('background-color','rgba(0, 0, 0, 0)');
        $('#input0').attr('disabled','disabled');

        drawLines(lX2,lX3,1);
        input1();
    }
});
/*
Если введеное число не равно второму числу, то второе число подсвечивается, цвет введеного числа меняется на красный
Если введеное число равно второму числу, то поле становится недоступным для ввода, знак ? заменяется на поле ввода
*/
function input1(){
    $('#input1').keyup(function(e){
        var num12=Number($('#input1').val());
        if (num12!=numB){
            $('#input1').css('color','red');
            $('#input4').css('background-color','rgba(255, 0, 0, 0.7)');
        }else{
            $('#input1').css('color','black');
            $('#input1').attr('disabled','disabled');
            $('#input4').css('background-color','rgba(255, 0, 0, 0)');
            $('#input6').detach();
            addInput(18, 340,6, "", false);
            inputResult();
        }
    });
}
/*
Если введеное число не равно сумме двух чисел, то цвет введеного числа меняется на красный
Если введеное число равно сумме двух чисел, то поле становится недоступным для ввода
*/
function inputResult(){
    $('#input6').keyup(function(e){
        var numResult=Number($('#input6').val());
        if (numResult!=numAB){
            $('#input6').css('color','red');
        }else{
            $('#input6').css('color','black');
            $('#input6').attr('disabled','disabled');
            $('#input6').css('border','none');
        }
    });
}
/* 
Рисование дуги.  
lineX1 - начальная точка дуги по Х.
lineX2 - конечная точка дуги по Х.
ii - число для уникальности id
*/
function drawLines(lineX1,lineX2,ii){
    var lineY1=y1+21;    
    var lineX12=lineX1+(lineX2-lineX1)/2;
    var lineY12=lineY1-(lineX2-lineX1)/2;
    if(ii==0){coef=numA};
    if(ii==1){coef=numB+1};

    ctx.beginPath();
    ctx.lineWidth=3; //толщина линии
    ctx.lineCap = "round"; //форма концов линии
    ctx.strokeStyle = "rgb(255,0,0)"; //цвет линии
    ctx.moveTo(lineX1,lineY1); //начальные координаты
    ctx.quadraticCurveTo(lineX12, lineY12, lineX2, lineY1); //рисование квадратичной дуги
    //рисование стрелки
    ctx.moveTo(lineX2,lineY1);
    ctx.lineTo((lineX2-(20*coef/10)),(lineY1-(10*coef/10)));
    ctx.moveTo(lineX2,lineY1);
    ctx.lineTo((lineX2-(10*coef/10)),(lineY1-(20*coef/10)));
    ctx.stroke(); 

    addInput((y1-50-((lineX2-lineX1)/6)), (lineX12-17),ii, "", false); //Отображение поля ввода
}

/*
Отображение поля ввода.
XX1, YY1 - координаты поля
iii - число для уникальности id
str - сожержимое поля
bool - логическая переменная запрета ввода. true - ввод запрещен
*/
function addInput(XX1, YY1,iii, str, bool){
    var input = document.createElement('input');
    input.type = 'text'; //тип поля ввода 
    input.id = 'input'+iii; //id поля ввода
    input.style.position = 'fixed'; //позиционирование поля ввода
    input.style.width = 34 + 'px'; //ширина поля ввода
    input.value=str; //текст поля ввода
    input.style.left = YY1 + 'px'; //растояние от левого края браузера      
    input.style.top = XX1 + 'px'; //расстояния от верха браузера
    input.style.fontSize = '20pt' ; //размер шрифта. Изменение влечет некоректное отображение полей ввода
    input.style.textAlign = 'center' ; //положение текста в поля ввода
    input.style.borderRadius='4px'; //закругление границы поля ввода
    if (bool){
        input.disabled="disabled"   ; //запрет редактирования поля ввода
        input.style.border="none";    //убрается  граница поля ввода    
    }   
    input.style.backgroundColor='rgba(0, 0, 0, 0)'; //прозрачный фон. Задается четвертым нулём
    document.body.appendChild(input); //добавление поля ввода
}