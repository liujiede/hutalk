var promiseList = [];
var resolveList = [];
var resolveNameList = [];
function mockPromise(name){
    var promise = new Promise(function(resolve, reject){
        resolveList.push(resolve);
        resolveNameList.push(name);
    });
    promise.name = name;
    promiseList.push(promise);
    return promise;
}

var count = 5;

function init(){
    for (var i = 0; i < count; i++) {
        mockPromise(i).then(function(name){
            console.log('init then resolve ' + name);
        }).then(function(){
            console.log('init then then resolve ' + name);
        });
    }
}
init();

function test(){
    for (var i = 0; i < count; i++) {
        var resolveName = resolveNameList[i];
        if(promiseList[i].name !== resolveName){
            console.log('error ' + resolveName);
        }
    }
    return 'test done';
}
test();

function go(){
    for (var i = 0; i < count; i++) {
        var promise = promiseList[i];
        var resolveName = resolveNameList[i];
        if(promise.name === resolveName){
            console.log('before resolve ' + resolveName);
            resolveList[i](resolveName);
            promise.then(function(){
                console.log('resolve then ' + this);
            }.bind(resolveName));
            console.log('after resolve ' + resolveName);
        }
    }
}
go()

