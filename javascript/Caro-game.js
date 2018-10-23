var curplayer = "X";
var n,m;
var board;
var step = 0;
function createBoard()
{
    while(isNaN(n) || n === undefined)
    {
    n = parseInt(prompt("Enter number of row in board: "));
    }
    while(isNaN(m) || m === undefined)
    {
    m = parseInt(prompt("Enter number of column in board: "));
    }
    board = Array(n);
    for(var i=0;i<n;i++)
    {
    var subarray = Array(m).fill("");
    board[i]=subarray;
    }
    var array = document.createElement('div');
    for(var i=0;i<n;i++)
    {
        var subarray = document.createElement('div');
        subarray.classList.add("board-row");
        for(var j=0;j<m;j++)
        {
            var b = document.createElement('button');
            b.setAttribute("x",i);
            b.setAttribute("y",j);
            b.setAttribute("onclick","set(this)");
            b.innerHTML="";
            b.classList.add("squareX");
            subarray.appendChild(b);
        }
        //array.appendChild(line);
        array.appendChild(subarray);
    }
    document.getElementById("main").appendChild(array);
}

function set(arg)
{
    if(arg.innerHTML === "")
    {
    var x = parseInt(arg.getAttribute("x"));
    var y = parseInt(arg.getAttribute("y"));
    board[x][y]=curplayer;
    step++;
    if(check(x,y))
    {
        alert("winner is " + curplayer);
        disable();
        return;
    }
    arg.classList.remove("square");
    arg.classList.add("square" + curplayer);
    arg.innerHTML = curplayer;
    curplayer = (curplayer === "X" ? "O" : "X");
    if(step === n*m)
    {
      alert("draw game");
    }
    }
}
function disable()
{
  document.getElementById("main").innerHTML="";
  var array = document.createElement("div");
  for(var i=0;i<n;i++)
  {
    var subarray = document.createElement("div");
    subarray.classList.add("board-row");
    for(var j=0;j<m;j++)
    {
      var b = document.createElement("button");
      b.innerHTML = board[i][j];
      if(board[i][j] === "")
      b.classList.add("squareX");
      else
      b.classList.add("square" + board[i][j]);
      subarray.appendChild(b);
    }
    array.appendChild(subarray);
  }
  document.getElementById("main").appendChild(array);
}
function restart()
{
  document.getElementById("main").innerHTML="";
  step = 0;
  curplayer = "X";
  n=undefined;
  m=undefined;
  createBoard();
}
function check(x,y)
{
    if(horizontal(x,y)||vertical(x,y)||main_horizontal(x,y)||not_main_horizontal(x,y))
    return true;
}
function horizontal(x,y)
{
  var cntleft=0;
  var cntright=0;
  for(var i=y-1;i>=0;i--)
  {
    if(board[x][i]===board[x][y])
    cntleft++;
    else
    break;
  }
  for(var i=y+1;i<m;i++)
  {
    if(board[x][i]===board[x][y])
    cntright++;
    else
    break;
  }
  if(cntleft + cntright + 1 >= 5)
  return true;
  return false;
}
function vertical(x,y)
{
  var cntup = 0;
  var cntdown = 0;
  for(var i=x-1;i>=0;i--)
  {
    if(board[i][y]===board[x][y])
    cntup++;
    else
    break;
  }
  for(var i=x+1;i<n;i++)
  {
    if(board[i][y]===board[x][y])
    cntdown++;
    else
    break;
  }
  if(cntup + cntdown + 1 >= 5)
  return true;
  return false;
}
function main_horizontal(x,y)
{
  var cnt1=0;
  var cnt2=0;
  var i=x,j=y;
  while(i > 0 && j > 0)
  {
    i--;
    j--;
    if(board[i][j]===board[x][y])
    cnt1++;
    else
    break;
  }
  i=x,j=y;
  while(i < n-1 && j < m-1)
  {
    i++;
    j++;
    if(board[i][j]===board[x][y])
    cnt2++;
    else
    break;
  }
  if(cnt1 + cnt2 + 1 >= 5)
  return true;
  return false;
}
function not_main_horizontal(x,y)
{
  var cnt1=0;
  var cnt2=0;
  var i=x,j=y;
  while(i > 0 && j < m-1)
  {
    i--;
    j++;
    if(board[i][j]===board[x][y])
    cnt1++;
    else
    break;
  }
  i=x,j=y;
  while(i < n-1 && j > 0)
  {
    i++;
    j--;
    if(board[i][j]===board[x][y])
    cnt2++;
    else
    break;
  }
  if(cnt1 + cnt2 + 1 >= 5)
  return true;
  return false;
}
createBoard();
var b = document.createElement("button");
b.setAttribute("onclick","restart()");
b.innerHTML = "Restart";
document.getElementById("notmain").appendChild(b);