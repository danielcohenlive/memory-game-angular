var GameController = function($scope) {
    window.s = $scope;

    var rows=4;
    var cols=4;
    //private functions 
    var getCardsBy = function(property){
        var isShowing = function(card){
            return card[property];
        };
        return _.filter(_.flatten($scope.cards),isShowing);
    };
    var checkWon=function(){
        $scope.won = getCardsBy("solved").length == rows * cols;
    }
    $scope.startGame = function(){
        $scope.won = false;
        $scope.vals = _.range(0,rows * cols / 2)
        $scope.vals = $scope.vals.concat($scope.vals);
        $scope.vals = _.shuffle($scope.vals);
        $scope.cards = [];
        while($scope.vals.length){
            var temp = [];
            for(var i = 0; i < cols; i++){
                temp.push({showing:false, val:$scope.vals.pop()});
            }
            $scope.cards.push(temp);
        }
    };
    $scope.canShow = function(){
        return getCardsBy("showing").length < 2;
    };
    $scope.analyze = function(){
        showing = getCardsBy("showing");
        console.log(showing);
        if(showing.length == 2){
            if(showing[0].val == showing[1].val){
                showing[0].solved = showing[1].solved = true;
            }
            setTimeout(function(){
                showing[0].showing = showing[1].showing = false;
                $scope.$apply();
            }, 1000);
            checkWon();
        }
    };
}