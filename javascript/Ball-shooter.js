var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var bar_width = 80;
var bar_height = 20;
var doc_width = 1340;
var doc_height = 600;
var brick_width = 76;
var brick_height = 20;
var brick_dist = 10;
var ball_radious=10;
var dx=6;
var dy=6;
var dx2=4;
bar_x = doc_width/2;
bar_y = doc_height - bar_height;
ball_x = bar_x - ball_radious;
ball_y = bar_y - ball_radious;
var row = 4;
var col = 15;
var bricks;
var launch = false;
var initial_state;
var lives = 3;
var lefts = col * row;
var req_y;
var req_row;
function ask()
{
    while(isNaN(req_y) || req_y === undefined)
    {
    req_y = parseInt(prompt("Enter the speed of the ball (the value recommended is 6): "));
    }
    while(isNaN(req_row) || req_row === undefined || parseInt(req_row) > 18)
    {
        req_row = parseInt(prompt("Enter the number of rows in game (maximum value is 18): "));
    }
}
function choose_position()
{
    launch = false;
    bar_x = doc_width/2;
    bar_y = doc_height - bar_height;
    ball_x = bar_x - ball_radious;
    ball_y = bar_y - ball_radious;
    dx2=4;
    dy = req_y;
    row = req_row;
    lefts = col * row;
    draw_ball();
    draw_bar();
    initial_state = setInterval(prepare,40);
}
function create_object()
{
    bricks = [];
    for(var i=1;i<=row;i++)
    {
        bricks[i] = [];
        for(var j=1;j<=col;j++)
        {
            bricks[i][j] = {x : i, y : j, status: row - i + 1};
        }
    }
}
function draw_brick()
{
    var y = 20;
    for(var i=1;i<=row;i++)
    {
        var x = 20;
        for(var j=1;j<=col;j++)
        {
            bricks[i][j].x=x;
            bricks[i][j].y=y;
            if(bricks[i][j].status !== 0)
            {
            ctx.beginPath();
            var s = String(bricks[i][j].status);
            ctx.rect(x,y,brick_width,brick_height);
            ctx.fillStyle="#00ffff";
            ctx.fill();
            ctx.font="15px Georgia";
            ctx.fillStyle = "red";
            ctx.fillText(s,x+brick_width/2,y+brick_height/2);
            ctx.closePath();
            }
            x=x+brick_dist+brick_width;
        }
        y=y+10+brick_height;
    }
}
function process_collision()
{
    var unchange=false;
    for(var i=row;i>=1;i--)
    {
        for(var j=col;j>=1;j--)
        {
            if(bricks[i][j].status !== 0)
            {
            var x = bricks[i][j].x;
            var y = bricks[i][j].y;
            if(ball_y - ball_radious + dy <= y + brick_height && ball_x >= x - ball_radious && ball_x <= x + brick_width + ball_radious||(ball_y + ball_radious + dy >= y && ball_y < y) && ball_x >= x - ball_radious && ball_x <= x + brick_width + ball_radious)
            {
                bricks[i][j].status = bricks[i][j].status - 1;
                if(!unchange)
                {
                dy = -dy;
                unchange=true;
                }
                if(bricks[i][j].status === 0)
                {
                    ctx.clearRect(x,y,brick_width,brick_height);
                    lefts--;
                    if(lefts === 0)
                    {
                        alert("You win");
                        launch = false;
                    }
                }
            }
            }
        }
    }
}
function draw_bar()
{
    ctx.beginPath();
    ctx.rect(bar_x,bar_y,bar_width,bar_height);
    ctx.fillStyle="#FF0000";
    ctx.fill();
    ctx.closePath();
}
function draw_ball()
{
    ctx.beginPath();
    ctx.arc(ball_x,ball_y,ball_radious,0,2*Math.PI);
    ctx.fillStyle="#ff0000";
    ctx.fill();
    ctx.closePath();
}
function bar_move(x,y)
{
    ctx.beginPath();
    ctx.clearRect(bar_x,bar_y,bar_width,bar_height);
    ctx.rect(x,y,bar_width,bar_height);
    ctx.fillStyle="#FF0000";
    ctx.fill();
    ctx.closePath();
    bar_x = x;
    bar_y = y;
}
function ball_move()
{
    if(launch)
    {
    ctx.clearRect(ball_x-ball_radious - 1,ball_y-ball_radious - 1,ball_radious*2 + 4,ball_radious*2 + 4);
    draw_bar();
    draw_brick();
    process_collision();
    if(ball_y  <= ball_radious)
    dy = -dy;
    else if(ball_y + ball_radious >= bar_y && ball_y + ball_radious <= bar_y && ball_x >= bar_x - ball_radious && ball_x <= bar_x + bar_width + ball_radious)
    dy = -dy;
    if(ball_x - ball_radious <= 0||ball_x + ball_radious >= doc_width)
    dx = -dx;
    ball_x=ball_x + dx;
    ball_y=ball_y + dy;
    draw_ball();
    if(ball_y + ball_radious>= doc_height && (ball_x < bar_x - ball_radious || ball_x > bar_x + bar_width + ball_radious))
    {
        lives--;
        var s;
        if(lives !== 1)
        {
        s = "Lives : " + lives.toString() + ". Press Ctrl + R to restart the game";
        }
        else
        {
        s = "Live : " + lives.toString() + ". Press Ctrl + R to restart the game";
        }
        lives_status.innerHTML = s;
        if(lives === 0)
        {
            alert("You lose");
            launch = false;
        }
        if(lives > 0)
        {
        ctx.clearRect(ball_x-ball_radious,ball_y-ball_radious,ball_radious*2,ball_radious*2);
        ctx.clearRect(bar_x,bar_y,bar_width,bar_height);
        choose_position();
        }
    }
    requestAnimationFrame(ball_move);
    }   
}
function prepare()
{
    ctx.clearRect(ball_x-ball_radious,ball_y-ball_radious,ball_radious*2,ball_radious*2);
    ball_x = ball_x + dx2;
    if((ball_x - ball_radious >= bar_x + bar_width || ball_x + ball_radious <= bar_x) && ball_x >= bar_x - ball_radious && ball_x <= bar_x + bar_width + ball_radious)
    dx2 = -dx2;
    draw_ball();
}
function keyDownHandler(e)
{
    if(e.keyCode === 39)
    {
        if(bar_x < doc_width-bar_width)
        {
        bar_move(bar_x + 20,bar_y);
        if(!launch)
        {
        ctx.clearRect(ball_x-ball_radious,ball_y-ball_radious,ball_radious*2,ball_radious*2);
        ball_x = ball_x + 20;
        draw_ball();
        }
        }
    }
    else if(e.keyCode === 37)
    {
        if(bar_x > 0)
        {
        bar_move(bar_x - 20,bar_y);
        if(!launch)
        {
        ctx.clearRect(ball_x-ball_radious,ball_y-ball_radious,ball_radious*2,ball_radious*2);
        ball_x = ball_x - 20;
        draw_ball();
        }
        }
    }
    if(e.keyCode === 13)
    {
        if(!launch)
        {
            clearInterval(initial_state);
            initial_state = null;
            var x = ball_x - (bar_x + bar_width/2);
            var y = bar_height + ball_radious;
            dx = (x/y) * dy; 
            launch = true;
            ball_move();
        }
    }
}
function restart()
{
    ctx.clearRect(ball_x-ball_radious,ball_y-ball_radious,ball_radious*2,ball_radious*2);
    ctx.clearRect(bar_x,bar_y,bar_width,bar_height);
    if(initial_state !== null)
    {
        clearInterval(initial_state);
    }
    lives_status.innerHTML = "Lives : 3. Press Ctrl + R to restart the game";
    lives = 3;
    ask();
    choose_position();
    create_object();
    draw_bar();
    draw_ball();
    draw_brick();
}
function key_shorcut(e)
{
    if(e.ctrlKey && e.keyCode === 82)
    {
        restart();
    }
}
var lives_status = document.createElement("h4");
lives_status.innerHTML = "Lives : 3. Press Ctrl + R to restart the game";
lives_status.setAttribute("align","center"); 
document.getElementById("1").appendChild(lives_status);
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",key_shorcut,false);
ask();
choose_position();
create_object();
draw_bar();
draw_ball();
draw_brick();
//ball_move();
//setInterval(ball_move,60);
//requestAnimationFrame(ball_move);