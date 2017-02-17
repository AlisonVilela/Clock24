app.controller('clockController', function($scope) {
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

    canvas2d.clearRect(0,0,canvas.width,canvas.height);

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
        canvas2d.font= "Bold 20px Arial";
        nx = seno *  (150);
        ny = cosseno * -(150);
        canvas2d.fillText(i/5,nx,ny);

        canvas2d.font= "12px Arial";
        nx = seno *  (100);
        ny = cosseno * -(100);

        //Lógica criada para que os minutos a esquerda comecem novamento de forma crescente no sentido horario
        if (i > 60) {
         min = i - 60;
        } else {
         min = i;
        }
        if (i == 120){
         min = 0;
        }

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
		canvas2d.moveTo(-5,20);
		canvas2d.lineTo(5,20);
		canvas2d.lineTo(0,-80);
		canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.save();

		//Minutos
		canvas2d.fillStyle="rgba(0, 0, 0, 1)"; //Preto
		canvas2d.rotate(Math.PI/60 * (horas % 2 === 0 ? minutos : minutos + 60));

		canvas2d.beginPath();
		canvas2d.moveTo(-5,20);
		canvas2d.lineTo(5,20);
		canvas2d.lineTo(0,-150);
		canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.save();

		//Segundos
		canvas2d.rotate(Math.PI/60 * (minutos % 2 === 0 ? segundos : segundos + 60));
		canvas2d.fillStyle="rgba(255, 51, 51, 1)"; //Vermelho

		canvas2d.beginPath();
		canvas2d.moveTo(-2,20);
		canvas2d.lineTo(2,20);
		canvas2d.lineTo(0,-150);
		canvas2d.closePath();

		canvas2d.fill();
		canvas2d.restore();
		canvas2d.restore();
    setTimeout(Clock, 1000);
  };
});
