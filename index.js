$(function () {



  // 点击开始按钮
  $(".start").one('click', function () {
    // 点击开始后，开始按钮隐藏
    $(this).stop().fadeOut();
    // 进度条开始变化
    $('.score').text(0);
    progressChange();
    startAnimation();
  });
  // 点击重新开始按钮
  $("#restart").off('click').on('click', function () {
    // 防止同一时间多次触发事件
    $("#restart").attr("disabled", "true");
    // 点击开始后，开始按钮隐藏
    $(this).parent('div').stop().fadeOut();
    // 进度条开始变化
    $('.score').text(0); // 分数归零
    progressChange();
    startAnimation();
  });


  //开始进度条变化
  function progressChange () {
    var wid = 180;
    var setChange = setInterval(
      function () {
        if (wid > 0) {
          wid = wid - 0.9;
          $('.progress').css({
            width: wid
          });
        } else {
          clearInterval(setChange);
          // 当进度条走完时，弹出游戏结束画面
          $('.gOver').stop().fadeIn();
          // 结束动画；
          stopAnimation();
          // 让重新开始按钮再次可以触发点击事件
          $("#restart").attr("disabled", false);

        }
      }, 100);
  }
  // 定义动画的相关全局变量
  var animIndex;
  var animEnd;
  var anim;
  // 出现动画
  function startAnimation () {


    // 定义九个出现的位置
    var position = [
      { left: "100px", top: "115px" },
      { left: "20px", top: "160px" },
      { left: "190px", top: "142px" },
      { left: "105px", top: "193px" },
      { left: "19px", top: "221px" },
      { left: "202px", top: "212px" },
      { left: "120px", top: "275px" },
      { left: "30px", top: "295px" },
      { left: "209px", top: "297px" }];
    // 定义两组图片
    var wolf_1 = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png', 'images/h4.png', 'images/h5.png', 'images/h6.png', 'images/h7.png', 'images/h8.png', 'images/h9.png'];
    var wolf_2 = ['images/x0.png', 'images/x1.png', 'images/x2.png', 'images/x3.png', 'images/x4.png', 'images/x5.png', 'images/x6.png', 'images/x7.png', 'images/x8.png', 'images/x9.png'];
    // 1.实现添加一张图片
    var $images = $("<img src='' class='animImg'> ");

    // 定义一个随机的位置
    var randomPosition = parseInt(Math.random() * 9);// ;
    $images.css({
      position: "absolute",
      top: position[randomPosition].top,
      left: position[randomPosition].left
    });

    // 定义随机的图片组
    var randomImg = parseInt(Math.random() * 10);
    var wolf_ar = randomImg > 2 ? wolf_1 : wolf_2;
    // 设置动画
    animIndex = 0;
    animEnd = 5;
    anim = setInterval(function () {
      if (animIndex <= animEnd) {
        $images.attr("src", wolf_ar[animIndex]);
        animIndex++;
      } else {
        $images.remove();
        clearInterval(anim);
        startAnimation();
      }
    }, 150);
    $('.container').append($images);
    playRules();
  }
  // 结束动画
  function stopAnimation () {
    clearInterval(anim);
    $('.animImg').remove();
  }
  // 存储分数的变量
  var score = 0;
  // 打地鼠的方法，游戏规则
  function playRules () {
    $('.animImg').one('click', function () {
      // 当点击图片时，直接让图片变成被打的图片，也就是6-9张
      animIndex = 9;
      animEnd = 9;
      // 判断打的是哪个狼
      if ($(this).attr("src").indexOf("x") > 0) {
        score -= 10;
        $('.score').text(score);
      } else {
        score += 10;
        $('.score').text(score);
      }


    })
  }


  //游戏规则页面关闭与打开
  $('.rule').click(function () {
    $('.rules').fadeIn();
  });
  $('.close').click(function () {
    $('.rules').fadeOut();
  });


});