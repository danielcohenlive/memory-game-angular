var cards = [];
var memoryCardDirective = function() {
    return {
      restrict: 'E',
      scope:{
        card:"="
      },
      link: function(scope,element){
        cards.push(scope);
        scope.back = "x";
        scope.solved = "o";
        scope.flip = function(){
          if(!scope.$parent.canShow() || scope.card.solved){
            return false;
          }
          scope.card.showing = true;
          scope.$parent.analyze();
        };
      },
      template: '<div ng-click="flip();">{{card.solved ? solved : (card.showing ? card.val : back)}}</div>'
    };
};