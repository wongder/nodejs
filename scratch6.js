// overriding original Promise.prototype.then/catch just to add some logs
(function(Promise){
  var originalThen = Promise.prototype.then;
   originalCatch = Promise.prototype.catch

  Promise.prototype.then = function(){
    console.log('> > > > > > called .then on %o with arguments: %o', this, arguments);
    return originalThen.apply(this, arguments);
  };
  Promise.prototype.catch = function(){
    console.log('> > > > > > called .catch on %o with arguments: %o', this, arguments);
    return originalCatch.apply(this, arguments);
  };

})(this.Promise);



// calling catch on an already resolved promise
Promise.resolve().catch(function XXX(){});

// logs:
// > > > > > > called .catch on Promise{} with arguments: Arguments{1} [0: function XXX()]
// > > > > > > called .then on Promise{} with arguments: Arguments{2} [0: undefined, 1: function XXX()]