var $input = $('#inField');
var $result = $('.result');

var $LS = $('#tagsField');

function doRefresh(){

  var n = $('#inField').val();
  if (n.trim() == '') {
    $result.html('0');
  } else {
  var num = math.eval(n);
  $result.html(+num);
  }
};

$input.on('keyup keypress keydown blur change click mouseup input paste propertychange', function()
{
  var n = $(this).val();
  doRefresh();
});


$LS.on('dblclick', function()
{
  store();
});


var pressTimer;

$LS.mouseup(function(){
  clearTimeout(pressTimer);
  return false;
}).mousedown(function(e){
  pressTimer = window.setTimeout(function() { 
    var our_string = e.target.innerHTML;
    if(our_string.indexOf('=') + 1) {
       var strIn = our_string.indexOf('=');
       var elem = document.getElementById('inField');
        elem.value = our_string.substring(0,strIn);
        doRefresh();
    }else{
       alert("err");
    }

  },1000);
  return false; 
});


if (localStorage.getItem('inField')!=null){
    var Name = localStorage.getItem('inField');
    $('#inField').val(Name);
    }
$(document).on('keyup keypress blur change click mouseup input paste propertychange','#inField',function(){
  var Name = $('#inField').val();
  localStorage.setItem("inField", Name);
});


function store(){
if (('localStorage' in window) && window['localStorage'] !== null) {
        var divtosave = $("#tagsField").html();
        localStorage.setItem('saveddiv', divtosave);
}
        }

if ('saveddiv' in localStorage) {
        $("#tagsField").html(localStorage.getItem('saveddiv'));
}


$(document).ready(function(){
$('div .memoryResultList').bind('dblclick',function(e){
$(e.target).remove();
});
doRefresh();
});


function deleteChar(input) {
    if ($('#inField').val().length == 1 && cursorPos == 1) {
      $result.html('0');
    }
    var elem = document.getElementById('inField');
    var old  = elem.value;
    getCaretPosition(input);
    var h1 = old.substring(0,cursorPos);
    elem.value = h1.substring(0,cursorPos-1)+old.substring(cursorPos);
    cursorPos = cursorPos-1;
    $('#inField').caretTo(cursorPos);
    doRefresh();
}


function deleteChar2(input) {
    var elem = document.getElementById('inField');
    var old  = elem.value;
    getCaretPosition(input);
    var h1 = old.substring(0,cursorPos);
    elem.value = h1.substring(0,cursorPos-1)+old.substring(cursorPos);
    cursorPos = cursorPos-1;
    $('#inField').caretTo(cursorPos);
    store();
}

var pi=Math.PI;
var e=Math.E;

function log(val) {
  return Math.log(val);
}

function log2(val) {
  return Math.log(val) / Math.LN2;
}

function log10(val) {
  return Math.log(val) / Math.LN10;
}

function abs(val) {
  return Math.abs(val);
}

function sqrt(val) {
  return Math.sqrt(val);
}

function cos(val) {
  return Math.cos(val);
}

function sin(val) {
  return Math.sin(val);
}

function exp(val) {
  return Math.exp(val);
}

function tan(val) {
  return Math.tan(val);
}

function atan(val) {
  return Math.atan(val);
}

var cursorPos;

function update(i){
    var elem = document.getElementById('inField');
    var old  = elem.value;
    var vl = old.length;
    if (vl > cursorPos) {
       elem.value = old.substring(0,cursorPos) + i.innerHTML+old.substring(cursorPos);
    } else {
      elem.value = old + i.innerHTML;
    }
    cursorPos = cursorPos + i.innerHTML.length;
    $('#inField').caretTo(cursorPos);
    doRefresh();
}

function update2(i){
    var elem = document.getElementById('inField');
    var old  = elem.value;
    var vl = old.length;
    if (vl > cursorPos) {
       elem.value = old.substring(0,cursorPos) + i + old.substring(cursorPos);
    } else {
      elem.value = old + i;
    }
    cursorPos = cursorPos + 1;
    $('#inField').caretTo(cursorPos);
    doRefresh(); 
}

function getCaretPosition(obj){
    
    if (document.selection){
        var range = document.selection.createRange();
        range.moveStart('textedit', -1);
        cursorPos = range.text.length;
    }
    else 
    {
        cursorPos = obj.selectionStart;
    }
  md = document.getElementById("inField");
  md.innerHTML = cursorPos;
}

function main()
    {
      var textHobbyField=document.getElementById('inField').value 
      if (textHobbyField.length>0){
        var hobbyTag = document.createElement("div");
        var result = document.getElementsByClassName("result")[0].innerHTML;
        var textHobbyTag = document.createTextNode(textHobbyField+"="+result);
        hobbyTag.appendChild(textHobbyTag);
        hobbyTag.className = "memoryResultList text2";
        var list=document.getElementById("tagsField");
        list.insertBefore(hobbyTag, list.firstChild);
        $('div .memoryResultList').bind('dblclick',function(e){
        $(e.target).remove();
        });
        store();
      }
   
    }
 
document.getElementById("addButton").addEventListener("click", function() {
    main();
});

$("#inField").on('keypress', function (e) {
    if (e.keyCode == 13) {
        main();
    }
});

(function ($) {
    $.caretTo = function (el, index) {
        if (el.createTextRange) { 
            var range = el.createTextRange(); 
            range.move("character", index); 
            range.select(); 
        } else if (el.selectionStart != null) { 
            el.focus(); 
            el.setSelectionRange(index, index); 
        }
    };

    $.fn.caretTo = function (index, offset) {
        return this.queue(function (next) {
            if (isNaN(index)) {
                var i = $(this).val().indexOf(index);
                
                if (offset === true) {
                    i += index.length;
                } else if (offset) {
                    i += offset;
                }
                
                $.caretTo(this, i);
            } else {
                $.caretTo(this, index);
            }
            
            next();
        });
    };

    $.fn.caretToStart = function () {
        return this.caretTo(0);
    };

    $.fn.caretToEnd = function () {
        return this.queue(function (next) {
            $.caretTo(this, $(this).val().length);
            next();
        });
    };
}(jQuery));
