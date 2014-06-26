var Square = function(val){
	var square = this;
	this.val = val;
	this.solved = false;
	this.el = $("<td>X</td>");
	this.el.click(function(){
		if (!square.solved) {
			ComparissonHandler.add(square);
		}
	});
	this.show = function(){
		this.el.html(this.val);
	}
	this.hide = function(){
		this.el.html(square.solved ? "O" : "X");
	}
	
}
var grid = {
	vals: _.shuffle([
		'a','a','b','c','b','c','d','d',
		'e','e','f','f','g','g','h','h'
	]),
	squares:[],
	cols:4,
	isWon:function(){
		var won = true;
		for (var i = 0; i < grid.squares.length; i++) {
			if (!grid.squares[i].solved) {
				won = false;
			}
		}
		if(won){
			alert("Solved!");
			clearInterval(solvedChecker);
		}
	}
};
var ComparissonHandler = {
	squares: [],
	add:function(s){
		if(this.squares.length > 1){
			return false;
		}
		this.squares.push(s);
		s.show();
		if(this.squares.length > 1){
			if(this.squares[0].val == this.squares[1].val){
				this.squares[0].solved = this.squares[1].solved = true;
			}
			setTimeout(function(){
				var squares = ComparissonHandler.squares;
				while(squares.length){
					squares.pop().hide();
				}
			},1000);
		}
	}
	
}
var solvedChecker;
$.fn.grid = function(){
	grid.squares = [];
	var $this = $(this);
	console.log($this);
	for(var i = 0; i < grid.vals.length; i++){
		if(i%grid.cols == 0){
			var $row = $("<tr></tr>");
			console.log($row);
		}
		var s = new Square(grid.vals[i]);
		grid.squares.push(s);
		$row.append(s.el);
		if(i%grid.cols == grid.cols - 1){
			$this.append($row);
			console.log($row);
		}
	}
	solvedChecker = setInterval(grid.isWon,100);
};
