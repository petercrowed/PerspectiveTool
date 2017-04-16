var canvas = document.getElementById("testCanvas");
var input = document.getElementById("testFile");
var stage = new createjs.Stage(canvas);
var image = new Image();

var bitmap = new createjs.Bitmap();

var container = new createjs.Container();
var color = 0xFFFFFF;
var line = new createjs.Shape();

// var circle = new createjs.Shape().set({
//     x: 100,
//     y: 100,
//
//
// });

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
    stage.update()
}


if (input) {
    input.addEventListener("change", previewFile);
}


//
// circle.cursor = "pointer";
//
// circle.graphics.beginFill("red").drawCircle(0, 0, 50);

// circle.on("pressmove", function(evt) {
//     // currentTarget will be the container that the event listener was added to:
//     evt.currentTarget.x = evt.stageX;
//     evt.currentTarget.y = evt.stageY;
//     // make sure to redraw the stage to show the change:
//     stage.update();
// });


function previewFile() {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        image.src = reader.result;
        console.log(image.width);
        console.log(image.height);
        bitmap = new createjs.Bitmap(image);

        if (image.width > 6000 && image.height > 3200) {
            console.log("error");
        }
        if (image.width > 5000 && image.height > 2900) {
            bitmap.scaleX = 0.17;
            bitmap.scaleY = 0.17;
        }

        // if(image.width > 500 && image.width < 1000 && image.height > 750 && image.height < 1250 )
        //
        // {
        //   bitmap.scaleX = 0.5;
        //   bitmap.scaleY = 0.5;
        // }
        //
        // if(image.width > 1250 && image.width < 1750 && image.height > 1250 && image.height < 1750 )
        // {
        //   bitmap.scaleX = 0.37;
        //   bitmap.scaleY = 0.37;
        // }


        stage.addChild(bitmap);
        // stage.addChild(circle);
        stage.addChild(line);

        stage.update();
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        alert("fail");
    }
}
    stage.addChild(line);
image.onload = function() {

    bitmap.x = (stage.canvas.width - bitmap.image.width * bitmap.scaleX) / 2;
    bitmap.y = (stage.canvas.height - bitmap.image.height * bitmap.scaleY) / 2;
};

createjs.Ticker.addEventListener("tick", tick);
(createjs.Graphics.Dash = function(instr) {
    if (instr == null) {
        instr = [0];
    }
    this.instr = instr;
}).prototype.exec = function(ctx) {
    ctx.setLineDash(this.instr);
};

createjs.Graphics.prototype.dash = function(instr) {
    return this.append(new createjs.Graphics.Dash(instr));
}


line.graphics.setStrokeStyle(2);
line.graphics.s("#0xFFFFFF").dash([10, 5]).mt(0, 250).lt(1000, 250);

line.cursor = "pointer";
line.graphics.endStroke();


line.on('mousedown', function(e) {

    var posY = e.stageY;
    this.offset = {
        y: this.y - posY
    };

});
var posY = 250;
var circlePos;
var circle2 = new createjs.Shape();

  circle2.name = "target";

  circle2.cursor = "pointer";
line.on('pressmove', function(e) {

    posY = e.stageY;
    this.y = posY + this.offset.y;
    circle2.y = posY;

    console.log("lol " + posY);
});


line.on("dblclick", function(evt) {
    console.log(evt.stageX);
    console.log(evt.stageY);

    circle2.set({
        x: evt.stageX,
        y: evt.stageY,


    });
    circle2.graphics.beginFill("blue").drawCircle(0, 0, 14);
    circle2.on("pressmove", function(evt) {
        // currentTarget will be the container that the event listener was added to:
        console.log(posY);
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = posY;

        // make sure to redraw the stage to show the change:
        stage.update();
    });
    stage.addChild(circle2);

    stage.update();
});
createjs.Ticker.addEventListener("tick", tick);

var connection = null;
circle2.on("dblclick", function(evt) {


});

  circle2.on("dblclick", handlePress);


  function handlePress(event) {
      connection = new createjs.Shape().set({
          x:event.target.x,
          y:event.target.y,
          mouseEnabled:false,
          graphics: new createjs.Graphics().s("#00f").dc(0,0,50)
      });
      stage.addChild(connection);
      stage.addEventListener("stagemousemove", drawLine);
      stage.addEventListener("stagemouseup", endDraw);
  }

  function drawLine(event) {
      var isOver=false, targets = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY);
      for (var i=0; i<targets.length; i++) {
          if (targets[i].name == "target") { isOver = true; break; }
      }
      connection.graphics.clear()
          .s(isOver ? "#0f0" : "#f00")
          .mt(0,0).lt(stage.mouseX-connection.x, stage.mouseY-connection.y);


  }

  function endDraw(event) {
      var target, targets = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY);
      console.log(targets);
      for (var i=0; i<targets.length; i++) {
          if (targets[i].name == "target") { target = targets[i]; break; }
      }

      if (target != null) {
          connection.graphics.clear()
          .s("#00f")
          .mt(0,0).lt(target.x-connection.x, target.y-connection.y);

      }
      var end = new createjs.Shape().set({
          x: event.stageX,
          y: event.stageY,
          cursor: "pointer",
          name:"target"
      });
      end.graphics.f(createjs.Graphics.getRGB(Math.random()*0xFFFFFF))
          .dc(0,0,5);
        stage.addChild(end);

      stage.removeEventListener("stagemousemove", drawLine);
      stage.removeEventListener("stagemouseup", endDraw);
  }
function tick(event) {
    stage.update();
}

stage.enableMouseOver();
stage.update();

function tick(event) {
    stage.update();
}
