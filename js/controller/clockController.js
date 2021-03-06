app.controller('clockController', function($scope) {
  $scope.header = "Relógio analógico de 24 horas";
  $scope.footer = "Alison Vilela";

  $scope.active = false;
  $scope.button = "Mostar Relógio";
  var canvas = null;
  var div = null;

  $scope.clickButton = function(){
	  if ($scope.active) {
		$scope.active = false;
		$scope.button = "Mostar Relógio";
	  } else {
		$scope.active = true;
		$scope.button = "Esconder Relógio";
	  }
  }

  window.addEventListener("load", function()
  {
    canvas = document.getElementById('clock');
    div = document.getElementById('canvas')
    function resize()
    {
      canvas.width = (div.offsetWidth < 190? 190: div.offsetWidth);
      canvas.height = (div.offsetHeight < 190? 190: div.offsetHeight);
    }
    window.addEventListener("resize", resize);
    resize();
    Clock();
  });

  function Clock(){
    var canvas2d = canvas.getContext('2d');
    var min = 0;
    var size = canvas.width < canvas.height? canvas.width-6: canvas.height-6;

    canvas2d.clearRect(0,0,canvas.width,canvas.height);

    canvas2d.lineWidth= (size/2) - ((size/2)/1.01);
    canvas2d.beginPath();
    canvas2d.arc((canvas.width/2),(canvas.height/2), size/2,0,Math.PI*2);
    canvas2d.fillStyle="rgba(255, 255, 255, 0.5)";
    canvas2d.fill();
    canvas2d.stroke();

    canvas2d.save();
    canvas2d.translate((canvas.width/2),(canvas.height/2));

    canvas2d.textBaseline="middle";
    canvas2d.textAlign="center";
    for (i = 1; i <= 120; i++) {
      angulo = Math.PI/60*i;
      seno = Math.sin(angulo);
      cosseno = Math.cos(angulo);

      min = 0;
      if (i % 5 == 0) {
        canvas2d.fillStyle="rgba(0, 0, 0, 1)";
        canvas2d.font= "Bold " + Math.round((size/2) - ((size/2)/1.15)).toString() + "px Arial";
        nx = seno * ((size / 2) - ((size / 2) / 10));
        ny = cosseno * -((size / 2) - ((size / 2) / 10));
        canvas2d.fillText(i/5,nx,ny);

        canvas2d.font= Math.round((size/2) - ((size/2)/1.08)).toString() + "px Arial";
        nx = seno * ((size / 2) - ((size / 2) / 2.5));
        ny = cosseno * -((size / 2) - ((size / 2) / 2.5));

        //Lógica criada para que os minutos a esquerda comecem novamento de forma crescente no sentido horario
        if (i > 60) {
         min = i - 60;
        } else {
         min = i;
        }
        if (i == 120){
         min = 0;
        }

        canvas2d.beginPath();
        canvas2d.arc(nx,ny,(size/2) - ((size/2)/1.06),0,Math.PI*2);
        canvas2d.fillStyle="rgba(0, 0, 0, 1)";
        canvas2d.fill();
        canvas2d.fillStyle="rgba(255, 255, 255, 1)";
        canvas2d.fillText(min,nx,ny);
      };
    }
    var agora = new Date();
		var horas = agora.getHours();
		var minutos = agora.getMinutes();
		var segundos = agora.getSeconds();

		canvas2d.save();
		//Horas
		canvas2d.fillStyle="rgba(0, 0, 0, 1)"; //Preto
		canvas2d.rotate(Math.PI/12 * (horas + (minutos / 60) + (segundos / 3600)));

    canvas2d.beginPath();
    canvas2d.moveTo(-((size / 2) / 30),(size / 2) - ((size / 2) / 1.25));
    canvas2d.lineTo((size / 2) / 30,((size / 2) - ((size / 2) / 1.25)));
    canvas2d.lineTo(0,-((size / 2) - ((size / 2) / 2.2)));
    canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.save();

		//Minutos
		canvas2d.fillStyle="rgba(0, 0, 0, 1)"; //Preto
		canvas2d.rotate(Math.PI/60 * (horas % 2 === 0 ? minutos : minutos + 60));

    canvas2d.beginPath();
    canvas2d.moveTo(-((size / 2) / 30),(size / 2) - ((size / 2) / 1.25));
    canvas2d.lineTo((size / 2) / 30,((size / 2) - ((size / 2) / 1.25)));
    canvas2d.lineTo(0,-((size / 2) - ((size / 2) / 8)));
    canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.save();

		//Segundos
		canvas2d.rotate(Math.PI/60 * (minutos % 2 === 0 ? segundos : segundos + 60));
		canvas2d.fillStyle="rgba(255, 51, 51, 1)"; //Vermelho

    canvas2d.beginPath();
    canvas2d.moveTo(-((size / 2) / 60),(size / 2) - ((size / 2) / 1.25));
    canvas2d.lineTo((size / 2) / 60,((size / 2) - ((size / 2) / 1.25)));
    canvas2d.lineTo(0,-((size / 2) - ((size / 2) / 8)));
    canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.restore();
    setTimeout(Clock, 1000);
  };
});
